import React from 'react';

export const IngredientCard = ({ item }) => (
  <div className="list-item">
    <img className="item-img" src={item.imageUrl} alt={item.ingredientName} />
    <div className="item-description has-scroll">
      <p className="item-title">{item.ingredient} </p>
      <p>{item.description}</p>
    </div>
  </div>
);
