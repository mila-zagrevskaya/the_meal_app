import React from 'react';

export const IngredientCard = ({ item }) => {
  return (
    <div className="meal-item">
      <span>{item.ingredientName} </span>
      <img src={item.imageUrl} alt={item.ingredientName} />
    </div>
  );
};
