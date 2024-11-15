const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY;
export const RAPIDAPI_HOST = process.env.REACT_APP_RAPIDAPI_HOST;

export const SEARCH_MEAL_BY_NAME = `${BASE_URL}search.php?s=`;

export const LOOKUP_FULL_MEAL_DETAILS_BY_ID = `${BASE_URL}lookup.php?i=`;

export const INGREDIENT_IMAGES = 'https://www.themealdb.com/images/ingredients/';

// export const { REACT_APP_RAPIDAPI_KEY, REACT_APP_RAPIDAPI_HOST } = process.env;

console.log('SEARCH_MEAL_BY_NAME', SEARCH_MEAL_BY_NAME);
console.log('LOOKUP_FULL_MEAL_DETAILS_BY_ID', LOOKUP_FULL_MEAL_DETAILS_BY_ID);
console.log('INGREDIENT_IMAGES', INGREDIENT_IMAGES);
