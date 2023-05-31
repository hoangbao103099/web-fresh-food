import OrderPage from '../pages/OrderPage/OrderPage'
import ProductPage from '../pages/ProductPage/ProductPage'
import HomePage from '../pages/HomePage/HomePage'
import NotFoundPge from '../pages/NotFoundPage/NotFoundPge'

export const routes = [
	{
		path: '/',
		page: HomePage,
		isShowHeader: true,
	},
	{
		path: '/order',
		page: OrderPage,
		isShowHeader: true,
	},
	{
		path: '/products',
		page: ProductPage,
		isShowHeader: true,
	},
	{
		path: '/*',
		page: NotFoundPge,
	},
]
