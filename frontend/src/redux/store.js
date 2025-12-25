import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import authReducer from "./authSlice"
import ordersReducer from "./orderSlice"
import searchReducer from "./searchSlice"


export const store = configureStore({
    reducer:{
        cart:cartReducer,
        auth:authReducer,
        orders: ordersReducer,
        search: searchReducer,
    }
})