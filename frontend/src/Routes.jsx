import React from 'react'
import {
    Routes as AppRoutes, Route
  } from "react-router-dom";
import HomeScreen from './modules/home';
import SignUpScreen from './modules/signup';
import LoginScreen from './modules/login';
import MyDonationsScreen from './modules/myDonations';
import DonationForm from './modules/donationForm';
import UserDashboardScreen from './modules/userDashboard';
import UsersScreen from './modules/users';
import UserForm from './modules/userForm';
import AdminDashboardScreen from './modules/adminDashboard';
import AllDonationsScreen from './modules/allDonations';
import AssignToMeDonationsScreen from './modules/assignedToMeDonations';
import AgentDashboardScreen from './modules/agentDashboard';
import AgentAvailableDonationsScreen from './modules/agentAvailableDonations';
import AllProductsScreen from './modules/products';
import ProductForm from './modules/productForm';
import CollectedDonationsScreen from './modules/collectedDonations';

const routes = [
    {
      path: "/",
      element: (
        <HomeScreen />
      )
    },
    {
      path: "/sign-up",
      element: (
        <SignUpScreen />
      )
    },
    {
      path: "/login",
      element: (
        <LoginScreen />
      )
    },
    {
      path: "/my-donations",
      element: (
        <MyDonationsScreen />
      )
    },
    {
      path: "/all-donations",
      element: (
        <AllDonationsScreen />
      )
    },
    {
      path: "/donation-form",
      element: (
        <DonationForm />
      )
    },
    {
      path: "/user-dashboard",
      element: (
        <UserDashboardScreen />
      )
    },
    {
      path: "/admin-dashboard",
      element: (
        <AdminDashboardScreen />
      )
    },
    {
      path: "/users",
      element: (
        <UsersScreen />
      )
    },
    {
      path: "/user-form",
      element: (
        <UserForm />
      )
    },
    {
      path: "/assign-to-me-donations",
      element: (
        <AssignToMeDonationsScreen />
      )
    },
    {
      path: "/agent-dashboard",
      element: (
        <AgentDashboardScreen />
      )
    },
    {
      path: "/not-assigned",
      element: (
        <AgentAvailableDonationsScreen />
      )
    },
    {
      path: "/all-products",
      element: (
        <AllProductsScreen />
      )
    },
    {
      path: "/product-form",
      element: (
        <ProductForm />
      )
    },
    {
      path: "/shop-dashboard",
      element: (
        <AllProductsScreen />
      )
    },
    {
      path: "/collected-donations",
      element: (
        <CollectedDonationsScreen />
      )
    },
]

const Routes = () => {
  return (
    <AppRoutes>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </AppRoutes>
  )
}

export default Routes