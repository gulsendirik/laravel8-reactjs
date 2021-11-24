import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import FrontIndex from "./Views/Index";
import FrontLogin from "./Views/Login";
import FrontRegister from "./Views/Register";

import ProductIndex from "./Views/Product/index";
import ProductCreate from "./Views/Product/create";
import ProductEdit from "./Views/Product/edit";

import CategoryIndex from "./Views/Category/index";
import CategoryCreate from "./Views/Category/create";
import CategoryEdit from "./Views/Category/edit";

import CustomerIndex from "./Views/Customer/index";
import CustomerCreate from "./Views/Customer/create";
import CustomerEdit from "./Views/Customer/edit";

import StockIndex from "./Views/Stock/index";
import StockCreate from "./Views/Stock/create";
import StockEdit from "./Views/Stock/edit";

const Main = () => (
    <Switch>
        <PrivateRoute exact path="/" component={FrontIndex} />
        <Route path="/login" component={FrontLogin} />
        <Route path="/register" component={FrontRegister} />
        
        <PrivateRoute exact path="/urunler" component={ProductIndex} />
        <PrivateRoute path="/urunekle" component={ProductCreate} />
        <PrivateRoute path="/urunler/duzenle/:id" component={ProductEdit} />

        <PrivateRoute exact path="/kategoriler" component={CategoryIndex} />
        <PrivateRoute path="/kategori/ekle" component={CategoryCreate} />
        <PrivateRoute path="/kategori/duzenle/:id" component={CategoryEdit} />

        <PrivateRoute exact path="/musteriler" component={CustomerIndex} />
        <PrivateRoute path="/musteri/ekle" component={CustomerCreate} />
        <PrivateRoute path="/musteri/duzenle/:id" component={CustomerEdit} />

        <PrivateRoute exact path="/stok" component={StockIndex} />
        <PrivateRoute path="/stok/ekle" component={StockCreate} />
        <PrivateRoute path="/stok/duzenle/:id" component={StockEdit} />

    </Switch>
);

export default Main;

