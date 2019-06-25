import React from 'react';

import { CATEGORIES } from "../../constants/categories";
import CategoryNavigation from '../CategoryNavigation';

const CategoryPage = ({ match }) => {
    const category = match.path.slice(1);

    return (
        <>
            <h1>{ CATEGORIES[category] }</h1>
            <CategoryNavigation selected={category} />
        </>
    )
};

export default CategoryPage;