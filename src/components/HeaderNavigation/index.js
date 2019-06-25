import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const HeaderNavigation = () => (
    <ul>
        <li>
            <Link to={ROUTES.HOME}>Nejnovější</Link>
        </li>
        <li>
            <Link to={ROUTES.TOP}>Největší sračky</Link>
        </li>
        <li>
            <Link to={ROUTES.ADD}>Vložit hovnokód!</Link>
        </li>
    </ul>
);

export default HeaderNavigation;