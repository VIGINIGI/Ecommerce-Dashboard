/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Customer from "views/examples/Customer.js";
import Login from "views/examples/Login.js";
import SellRequest from "views/examples/SellRequest";
import RepairRequest from "views/examples/RepairRequest.js";
import Products from "views/examples/Products";
import ProductCat from "views/examples/ProductCat";
import Order from "views/examples/Orders";
import Delivery from "views/examples/DeliveryBoy";
import Role from "views/examples/Roles";
import SetBanner from "views/examples/SetBanner";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  
  {
    path: "/SellRequest",
    name: "SellRequest",
    icon: "ni ni-bullet-list-67 text-red",
    component: SellRequest,
    layout: "/admin",
  },
  {
    path: "/RepairRequest",
    name: "Repair Requests",
    icon: "ni ni-bullet-list-67 text-red",
    component: RepairRequest,
    layout: "/admin",
  },
  {
    path: "/Customer",
    name: "Customer",
    icon: "ni ni-circle-08 text-pink",
    component: Customer,
    layout: "/admin",
  },
  {
    path: "/Products",
    name: "Products",
    icon: "ni ni-shop text-blue",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/ProductCategories",
    name: "Product Categories",
    icon: "ni ni-shop text-blue",
    component: ProductCat,
    layout: "/admin",
  },
  {
    path: "/Orders",
    name: "Orders",
    icon: "ni ni-cart",
    component: Order,
    layout: "/admin",
  },
  {
    path: "/DeliveryBoy",
    name: "Delivery Boy",
    icon: "ni ni-delivery-fast",
    component: Delivery,
    layout: "/admin",
  },
  
  {
    path: "/roles",
    name: "Roles",
    icon: "ni ni-key-25 text-info",
    component: Role,
    layout: "/admin",
  },
  {
    path: "/SetBanner",
    name: "Set Banner",
    icon: "ni ni-key-25 text-info",
    component: SetBanner,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  
];
export default routes;
