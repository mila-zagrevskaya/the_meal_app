import React from 'react';

import { IngredientCard } from '../IngredientCard';

export const IngredientsList = ({ ingredients }) => {
  return (
    <div className='ingredients-list'>
      {ingredients.map((item, index) => (
        <IngredientCard item={item} key={index} />
      ))}
    </div>
  );
};
