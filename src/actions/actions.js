import { createAction } from 'redux-actions';
import * as type from 'actionTypes/actionTypes';

import { RAPIDAPI_KEY, RAPIDAPI_HOST } from 'constants/resource_URL';

// _______doRequestToGetItemsByFirstLetter_____________________

const getItemsByFirstLetter = createAction(type.GET_ITEMS_BY_FIRST_LETTER);
const getItemsByFirstLetterSuccess = createAction(type.GET_ITEMS_BY_FIRST_LETTER_SUCCESS);
const getItemsByFirstLetterFail = createAction(type.GET_ITEMS_BY_FIRST_LETTER_FAIL);

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': RAPIDAPI_KEY,
    'x-rapidapi-host': RAPIDAPI_HOST,
  },
};

export const doRequestToGetItemsByFirstLetter = (url, payload) => async (dispatch) => {
  console.log('url, payload', url, payload);
  dispatch(getItemsByFirstLetter(payload));
  try {
    const response = await fetch(url, options);

    const json = await response.json();

    dispatch(getItemsByFirstLetterSuccess(json));
  } catch (err) {
    dispatch(getItemsByFirstLetterFail(err));
  }
};

// _______onSearchInputChange_____________

export const onSearchInputChange = createAction(type.ON_SEARCH_INPUT_CHANGE);

// _______changedSelectedPage_____________

export const changeSelectedPage = createAction(type.CHANGE_SELECTED_PAGE);

// _____getIngredientImage____________

export const getIngredientsWithImages = async (meal) => {
  const INGREDIENT_IMAGES = process.env.REACT_APP_INGREDIENT_IMAGES;

  const listOfIngredients = Object.keys(meal).filter((item) => item.slice(0, 13) === 'strIngredient');
  const ingredients = listOfIngredients.map((key) => meal[key]).filter((item) => item);
  const urlPhotoIngredients = await Promise.all(
    ingredients.map(async (ingredientName) => {
      const imageUrl = await fetch(`${INGREDIENT_IMAGES}${ingredientName}-Small.png`).then(
        (res) => res.url,
      );
      return { ingredientName, imageUrl };
    }),
  );

  return urlPhotoIngredients;
};

// ______lookupFullMealDetailsById________

const getItemById = createAction(type.GET_ITEM_BY__ID);
const getItemByIdSuccess = createAction(type.GET_ITEM_BY__ID_SUCCESS);
const getItemByIdFail = createAction(type.GET_ITEM_BY__ID_FAIL);

export const lookupFullMealDetailsById = (url, payload) => async (dispatch) => {
  dispatch(getItemById(payload));
  try {
    const meal = await fetch(url)
      .then((res) => res.json())
      .then((res) => res.meals[0]);
    const ingredients = await getIngredientsWithImages(meal);
    dispatch(getItemByIdSuccess({ meal, ingredients }));
  } catch (err) {
    dispatch(getItemByIdFail(err));
  }
};
