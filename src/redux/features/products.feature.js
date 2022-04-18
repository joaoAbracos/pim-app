import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}
const recipesSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        saveProduct: function (state, action) {
            // console.log(action.payload.product)
            state.products.push(action.payload.product)
        },
        deleteRecipe:function(state,action){
            return {
                recipes: state.recipes.filter((val) => val.id !== action.payload.id),
                
            }
        }
    },
});
export const { saveProduct,deleteRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;