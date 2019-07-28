const functions = require('firebase-functions');
const express = require('express');

const app = express();

require('dotenv').config();

const cors = require('cors')({origin: true});

app.use(cors);

const GoogleRecaptcha = require('google-recaptcha');

const googleRecaptcha = new GoogleRecaptcha(
    {
        secret: process.env.RECAPTCHA_PRIVATE_KEY,
    }
);

const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

const shitcodes = admin.firestore().collection('shitcodes');

const CATEGORIES = [
    'quotes',
    'java',
    'cpp',
    'javascript',
    'php',
    'python',
    'ruby',
    'html',
    'sql',
    'csharp',
    'vb',
    'perl',
    'bash',
    'delphi',
    'other',
];

const SITE_BASE = 'https://hovnokod.cz';

const generateSitemap = (req, res) => {
    let urlset = CATEGORIES.map(
        category => `
    <url>
        <loc>${SITE_BASE}/${category}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.9</priority>
    </url>`
    );

    let result = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset>
    <url>
        <loc>${SITE_BASE}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
    </url>
${urlset.join("\n")}
</urlset>
`.trim();

    res.set('Content-Type', 'application/xml;charset=utf-8');
    res.send(result);
};

const handleValidationError = (res, message) => {
    res.status(400);
    res.json({ status: 'error', message });
};

const validateStringRange = (str, min, max) => {
    return !!str && str.length >= min && str.length <= max;
};

const validateCategory = (category) => {
    return CATEGORIES.includes(category);
};

const handlePostCode = (req, res) => {
    if (!validateCategory(req.body.category)) {
        return handleValidationError(res, 'Invalid category');
    }

    if (!validateStringRange(req.body.code, 1, 5000)) {
        return handleValidationError(res, 'Invalid code');
    }

    if (!!req.body.description && !validateStringRange(req.body.description, 1, 1000)) {
        return handleValidationError(res, 'Invalid description');
    }

    if (!req.body.recaptcha) {
        return handleValidationError(res, 'Invalid recaptcha');
    }

    // googleRecaptcha.verify({response: req.body.recaptcha}, (error) => {
    //     if (error) {
    //         return handleValidationError(res, error);
    //     }

    getLastCodeId().then(lastId => {
        const id = lastId + 1;

        const payload = {
            "category": req.body.category,
            "id": id,
            "created": admin.firestore.Timestamp.fromDate(new Date()),
            "description": req.body.description,
            "code": req.body.code,
            "active": false
        };

        shitcodes.doc(id.toString()).set(payload, {merge: true});

        return id;
    }).then(
        id => res.json({ id })
    ).catch(
        error => handleValidationError(res, error)
    );
};

const getLastCodeId = () => {
    return shitcodes.orderBy('id', 'desc').limit(1).get()
        .then(querySnapshot => {
        let doc = querySnapshot.docs[0].data();
        return doc.id
    })
};

app.get('/sitemap.xml', generateSitemap);
app.post('/api/code', handlePostCode);

app.get('/api/test', (req, res) => {
    res.json({env: process.env})
});

exports.api = functions.https.onRequest(app);
