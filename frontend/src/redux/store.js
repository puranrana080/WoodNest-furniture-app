import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import authReducer from "./authSlice"
import ordersReducer from "./orderSlice"


export const store = configureStore({
    reducer:{
        cart:cartReducer,
        auth:authReducer,
        orders: ordersReducer,
    }
})