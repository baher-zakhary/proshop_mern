import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from "react-bootstrap"
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UsersListScreen from './screens/UsersListScreen'
import EditUserScreen from "./screens/EditUserScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrdersListScreen from "./screens/OrdersListScreen";

const App = () => {
    return (
        <Router>
            <>
                <Header />
                <main className="py-3">
                    <Container>
                        <Routes>
                            <Route path='/product/:id' element={<ProductScreen />} />
                            <Route path='/cart'>
                                <Route index element={<CartScreen />} />
                                <Route path=':id' element={<CartScreen />} />
                            </Route>
                            <Route path='/login' element={<LoginScreen />} />
                            <Route path='/register' element={<RegisterScreen />} />
                            <Route path='/profile' element={<ProfileScreen />} />
                            <Route path='/shipping' element={<ShippingScreen />} />
                            <Route path='/payment' element={<PaymentScreen />} />
                            <Route path='/place-order' element={<PlaceOrderScreen />} />
                            <Route path='/order/:id' element={<OrderScreen />} />
                            <Route path='/admin/userlist' element={<UsersListScreen /> }/>
                            <Route path='/admin/productlist' element={<ProductListScreen /> } exact />
                            <Route path='/admin/productlist/page/:pageNumber' element={<ProductListScreen /> } exact />
                            <Route path="/admin/user/:id/edit" element={<EditUserScreen />} />
                            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
                            <Route path='/admin/orderlist' element={<OrdersListScreen /> }/>
                            <Route path='/search/:searchStr' element={<HomeScreen />} exact />
                            <Route path='/search/:searchStr/page/:pageNumber' element={<HomeScreen />} exact />
                            <Route path='/page/:pageNumber' element={<HomeScreen />} exact />
                            <Route path='/' element={<HomeScreen />} exact />
                        </Routes>
                    </Container>
                </main>
                <Footer />
            </>
        </Router>
    );
}

export default App;
