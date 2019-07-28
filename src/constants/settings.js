export const SITE_NAME = 'Hovnokod.cz';
export const SITE_URL = 'https://hovnokod.cz';
export const DISQUS_SHORTNAME = 'hovnokod';
export const RECAPTCHA_PUBLIC_KEY = '6Lfk7a8UAAAAAAEuHreeB46HUx4sKiDAKdiq_jCl';

export const pageTitle = (title) => {
    if (!title) {
        return SITE_NAME;
    }

    return `${title} - ${SITE_NAME}`;
};
