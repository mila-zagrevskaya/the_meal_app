import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';

import * as actions from 'actions/actions';

import { LOOKUP_FULL_MEAL_DETAILS_BY_ID } from 'constants/resource_URL';
import { IngredientsList } from './Ingredients';

import './style.scss';

const DetailMealInfo = (props) => {
  const location = useLocation();
  useEffect(() => {
    const { lookupFullMealDetailsById } = props;
    const MealUrl = location.pathname.split('/')[2];
    lookupFullMealDetailsById(`${LOOKUP_FULL_MEAL_DETAILS_BY_ID}${MealUrl}`);
  }, [location]);

  const { meal, ingredients } = props;
  return (
    <div className='page-wrapper'>
      <div className='content-container'>
        <div className='meal-info' key={meal.idMeal}>
          <h2>{meal.strMeal}</h2>
          <div className='presentational-container'>
            <div className='meal-photo'>
              <img className='dish-photography' src={meal.strMealThumb} alt={meal.strMeal} />
            </div>
            <div className='ingredients'>
              <IngredientsList ingredients={ingredients} meal={meal} />
            </div>
          </div>
          <h3>Instructions</h3>
          <p className='instructions'>{meal.strInstructions}</p>
          <div className='container-for-video'>
            <YouTube videoId={meal.strYoutube ? meal.strYoutube.split('=')[1] : ''} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  meal: state.appState.meal,
  ingredients: state.appState.ingredients,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

export const MealInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailMealInfo);
