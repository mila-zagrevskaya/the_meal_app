import * as types from 'actionTypes/actionTypes';

const intialState = {
  query: '',
  meals: [],
  meal: [],
  paginationOptions: {
    countPages: 1,
    currentPage: 1,
  },
  ingredients: [],
};

// ____________________________

const getItemsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    // _______doRequestToGetItemsByFirstLetter__________

    case types.GET_ITEMS_BY_FIRST_LETTER: {
      return { ...state };
    }

    case types.GET_ITEMS_BY_FIRST_LETTER_SUCCESS: {
      const { meals } = payload;
      return { ...state, meals };
    }

    case types.GET_ITEMS_BY_FIRST_LETTER_FAIL: {
      console.log('GET_ITEMS_BY_FIRST_LETTER_FAIL', payload);
      return { ...state };
    }

    // _________lookupFullMealDetailsById_____________

    case types.GET_ITEM_BY__ID: {
      return { ...state };
    }

    case types.GET_ITEM_BY__ID_SUCCESS: {
      const { meal, ingredients } = payload;
      return {
        ...state,
        meal,
        ingredients,
      };
    }

    case types.GET_ITEM_BY__ID_FAIL: {
      console.log('GET_ITEM_BY__ID_FAIL', payload);
      return { ...state };
    }

    // ______getListOfIngredients_____________

    case types.GET_LIST_OF__INGREDIENTS: {
      return { ...state };
    }

    case types.GET_LIST_OF__INGREDIENTS_SUCCESS: {
      return { ...state, ingredients: payload };
    }

    case types.GET_LIST_OF__INGREDIENTS_FAIL: {
      console.log('GET_LIST_OF__INGREDIENTS_FAIL', payload);
      return { ...state };
    }

    // _______onSearchInputChange_____________

    case types.ON_SEARCH_INPUT_CHANGE: {
      return {
        ...state,
        query: payload,
      };
    }

    // _______changedSelectedPage_____________

    case types.CHANGE_SELECTED_PAGE: {
      return {
        ...state,
        paginationOptions: { currentPage: payload },
      };
    }

    // _____________________
    default:
      return state;
  }
};

export default getItemsReducer;
