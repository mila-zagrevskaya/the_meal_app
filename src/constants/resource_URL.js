const BASE_URL = 'https://themealdb.p.rapidapi.com/';

export const SEARCH_MEAL_BY_NAME = `${BASE_URL}search.php?s=`;

export const LOOKUP_FULL_MEAL_DETAILS_BY_ID = `${BASE_URL}lookup.php?i=`;

export const INGREDIENT_IMAGES = 'https://www.themealdb.com/images/ingredients/';

const QUERY_HEADER = {
  'x-rapidapi-key': 'c486cb759cmshf1f8192d46b1331p132efajsnbd77780b9401',
  'x-rapidapi-host': 'themealdb.p.rapidapi.com',
};

export const QUERY_PARAMS = {
  method: 'GET',
  headers: QUERY_HEADER,
};
