import { createSlice} from '@reduxjs/toolkit';

export const cartProductsSlice = createSlice({
    name: 'cartProducts',
    initialState: {
        list: []
    },
    reducers: {
        addProduct: (state, action) => {
            for(let item of state.list){
                if(item.id == action.payload.id){
                    item.count += action.payload.count;
                    console.log(state.list)
                    return;
                }
            }
            state.list.push(action.payload);
        },
        deleteProduct: (state, action) => {
            let indexToDelete;
            for(let i in state.list){
                if(state.list[i].id == action.payload)
                    indexToDelete = i;
            }
            state.list.splice(indexToDelete, 1);
        },
        emptyCart: (state, action) => {
            state.list = [];
        }
    }
})

export const {addProduct, deleteProduct, emptyCart} = cartProductsSlice.actions

export default cartProductsSlice.reducer