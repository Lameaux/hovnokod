import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { CATEGORIES } from '../../constants/categories';

const CategoryNavigation = ({selected}) => (
    <ul>
        <li>
            <Link to={ROUTES.HOME}>Všechno</Link>
        </li>
        {
            Object.keys(CATEGORIES).map(
                key => {
                    const linkClass = classNames(
                        { 'active': key === selected }
                    );

                    return (
                        <li key={key}>
                            <Link className={linkClass} to={key}>{CATEGORIES[key]}</Link>
                        </li>
                    )
                }
            )
        }
    </ul>
);

export default CategoryNavigation;