import React, { Component } from 'react';
import { SliderComponent } from 'components/common/Slider';

export class IngredientsList extends Component {
  render() {
    const { ingredients } = this.props;
    return (
      <SliderComponent>
        {ingredients.map((item, index) => (
          <div className='meal-item' key={index}>
            <img src={item.imageUrl} alt={item.ingredientName} />
            <span>{item.ingredientName} </span>
          </div>
        ))}
      </SliderComponent>
    );
  }
}