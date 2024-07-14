import axios from 'axios'

 export const setPizza = (item) => ({
    type: 'FETCH_DATA_SUCCESS',
    payload: item
  })

export const fetchPizzas = (setCategory,sortBy) => (dispatch) => {
    axios.get(`http://localhost:3000/pizzas${setCategory == null ? `?_sort=-${sortBy.type}&_order=-${sortBy.order}` : `?category=${setCategory}&_sort=-${sortBy.type}&_order=-${sortBy.order}` }`).then(({data}) => {
        dispatch(setPizza(data))
        console.log(setCategory,sortBy);
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

export const removeCartItem = (id) => ({
    type:"REMOVE_CART_ITEM",
    payload: id,
})

export const plusCartItem = (id) => ({
  type: 'PLUS_CART_ITEM',
  payload: id,
});

export const minusCartItem = (id) => ({
  type: 'MINUS_CART_ITEM',
  payload: id,
});