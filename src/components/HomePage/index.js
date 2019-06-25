import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import CategoryNavigation from '../CategoryNavigation';

const HomePage = () => (
    <>
        <h1>Mistři v programování na <b>#hovnokod</b></h1>
        <p>
            Narazili jste na zprasený kód? <Link to={ROUTES.ADD}>Nahrajte ho sem</Link>.
        </p>
        <CategoryNavigation />
    </>
);

export default HomePage;