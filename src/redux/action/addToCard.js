import axios from 'axios'

 export const setPizza = (item) => ({
    type: 'FETCH_DATA_SUCCESS',
    payload: item
  })

export const fetchPizzas = (setCategory,sortBy) => (dispatch) => {
    axios.get(`http://localhost:3000/pizzas${setCategory == null ? `?_sort=-${sortBy.type}&_order=-${sortBy.order}` : `?category=${setCategory}&_sort=-${sortBy.type}&_order=-${sortBy.order}` }`).then(({data}) => {
        dispatch(setPizza(data))
    })
}

export const setSortBy = ({ type, order }) => ({
  type: 'SET_SORT_BY',
  payload: { type, order },
});

export const setCategory = (catIndex) => ({
  type: 'SET_CATEGORY',
  payload: catIndex,
});

export const clearCart = () => ({
  type: 'CLEAR_CART'
})

export const removeCartItem = (item) => ({
    type:"REMOVE_CART_ITEM",
    payload: item,
})

export const plusCartItem = (item) => ({
  type: 'PLUS_CART_ITEM',
  payload: item,
});

export const minusCartItem = (item) => ({
  type: 'MINUS_CART_ITEM',
  payload: item
  
}
);

