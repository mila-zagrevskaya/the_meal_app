import { createAction } from 'redux-actions';
import * as type from 'actionTypes/actionTypes';

import { saveToLocalStorage } from 'services/localStorage';
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

const getImagesOfIngredients = (ingredientName) => {
  const INGREDIENT_IMAGES = process.env.REACT_APP_INGREDIENT_IMAGES;
  const urlPhotoIngredient = `${INGREDIENT_IMAGES}${ingredientName}-Small.png`;
  return urlPhotoIngredient;
};

export const getIngredientsWithImages = (meal) => {
  const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith('strIngredient'))
    .map((key) => meal[key])
    .filter(Boolean);
  const measures = Object.keys(meal)
    .filter((key) => key.startsWith('strMeasure'))
    .map((key) => meal[key] || '');

  return ingredients.map((ingredientName, index) => ({
    ingredientName,
    ingredientMeasure: measures[index] || '',
    imageUrl: getImagesOfIngredients(ingredientName),
  }));
};

// ______lookupFullMealDetailsById________

const getItemById = createAction(type.GET_ITEM_BY__ID);
const getItemByIdSuccess = createAction(type.GET_ITEM_BY__ID_SUCCESS);
const getItemByIdFail = createAction(type.GET_ITEM_BY__ID_FAIL);

export const lookupFullMealDetailsById = (url, payload) => async (dispatch) => {
  dispatch(getItemById(payload));
  try {
    const meal = await fetch(url, options)
      .then((res) => res.json())
      .then((res) => res.meals[0]);
    const ingredients = await getIngredientsWithImages(meal);

    dispatch(getItemByIdSuccess({ meal, ingredients }));
  } catch (err) {
    dispatch(getItemByIdFail(err));
  }
};

export const getListOfIngredientsWithImages = async (ingredients) => ingredients.map(
  (ingredient) => ({
    idIngredient: ingredient.idIngredient,
    ingredient: ingredient.strIngredient,
    description: ingredient.strDescription,
    type: ingredient.strType,
    imageUrl: getImagesOfIngredients(ingredient.strIngredient),
  }),
);

// ______getListOfIngredients_____________
const getListOfIngredients = createAction(type.GET_LIST_OF__INGREDIENTS);
const getListOfIngredientsSuccess = createAction(type.GET_LIST_OF__INGREDIENTS_SUCCESS);
const getListOfIngredientsFail = createAction(type.GET_LIST_OF__INGREDIENTS_FAIL);

export const doRequestToGetListOfIngredients = (url, payload) => async (dispatch) => {
  dispatch(getListOfIngredients(payload));
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    const listOfIngredients = json.meals;
    const ingredients = await getListOfIngredientsWithImages(listOfIngredients);
    saveToLocalStorage('ingredients', ingredients);
    dispatch(getListOfIngredientsSuccess(ingredients));
  } catch (err) {
    dispatch(getListOfIngredientsFail(err));
  }
};
