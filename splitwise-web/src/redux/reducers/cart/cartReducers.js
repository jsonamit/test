import { cartActionTypes } from '../../../constants/Action.type';

const initialState = {
  items: [],
  numberCart:0,
  total: 0,
}

export const cartReducers = (state = initialState,{type,payload}) => {
    switch(type) {
		
        case cartActionTypes.ADD_TO_CART : 
          if(state.numberCart===0) {
            let cart = {
              id: payload.id,
              quantity:1,
              title: payload.title,
              subtitle: payload.subtitle,
              accessories : payload.accessories,
              price : payload.price,
              img : payload.img,
            } 
            state.items.push(cart); 
        } else {
          let check = false;

          state.items.map((item,key)=>{
              if(item.id===payload.id) {
                state.items[key].quantity++;
                check = true;
              }
              return true;
          });

          if(!check){
              let cart = {
                id: payload.id,
                quantity:1,
                title: payload.title,
                subtitle: payload.subtitle,
                accessories : payload.accessories,
                price : payload.price,
                img : payload.img,
              } 
              state.items.push(cart); 
          }
        }

       var total = state.items.map((p)=>p.price*p.quantity).reduce((previous, current)=>previous+current);

        return{
          ...state,
          numberCart:state.items.length,
          total
        }

        case cartActionTypes.DELETE_PRODUCT : 
          const found = state.items.findIndex((item)=>item.id===payload.id);
          if(found !== -1) {
              state.items.slice(found);
          }

          return {
              ...state
          }

        case cartActionTypes.GET_ALL_PRODUCT : 
          return {
            ...state.items
          }

        case cartActionTypes.GET_TOTAL : 
          return {
            ...state.items.length
          }

        case cartActionTypes.ADD_QUANTITY : 
          const itemFound = state.items.findIndex((item)=>item.id===payload.id);
          if(itemFound !== -1) {
            state.items[itemFound].quantity = payload.quantity;
          }

          return {
              ...state
          }

        default : 
            return state
    }
}




// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItem: (state, action) => {
//       const existingItem = state.items.find(item => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     removeItem: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload.id);
//     },
//     incrementQuantity: (state, action) => {
//       const item = state.items.find(item => item.id === action.payload.id);
//       if (item) {
//         item.quantity += 1;
//       }
//     },
//     decrementQuantity: (state, action) => {
//       const item = state.items.find(item => item.id === action.payload.id);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;
