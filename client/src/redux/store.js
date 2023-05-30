import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/Couterslice'

export const store = configureStore({
	reducer: {
		counter: counterReducer,
	},
})
