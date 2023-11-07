import { createSlice } from '@reduxjs/toolkit'

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: []
    // SOME MORE ... !
  },
  reducers: {
    // ADD ITEMS TO CART!
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(item => item.id === action.payload.id)
      if (itemPresent) {
        itemPresent.quantity++
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },
    // REMOVE ANY ITEMS OR NONE THE CART!
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        item => item.id !== action.payload.id
      )
      state.cart = removeItem
    },
    // INCREMENT THE PREVIOUS QUANTITY!
    incrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(item => item.id === action.payload.id)
      itemPresent.quantity++
    },
    // DECREMENT WITH THE PREVIOUS QUANTITY!
    decrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(item => item.id === action.payload.id)
      if (itemPresent.quantity == 1) {
        itemPresent.quantity = 0
        const removeItem = state.cart.filter(
          item => item.id !== action.payload.id
        )
        state.cart = removeItem
      } else {
        itemPresent.quantity--
      }
    },
    // CLEAR THE CART!
    cleanCart: state => {
      state.cart = []
    }
  }
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart
} = CartSlice.actions

export default CartSlice.reducer
