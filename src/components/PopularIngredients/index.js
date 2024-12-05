import React from 'react';

import { PopularIngredientsList } from 'components/PopularIngredients/IngredientsList';

import './style.scss';

export const PopularIngredients = () => (
  <div className="page-wrapper">
    <div className="content-container">
      <PopularIngredientsList />
    </div>
  </div>
);
