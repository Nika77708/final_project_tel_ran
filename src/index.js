import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { App } from "./App";
import Loader from "./components/Loader/Loader";
import "./index.css";
import AllProductsPage from "./pages/AllProductsPage/AllProductsPage";
import CartPage from "./pages/CartPage/CartPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import { CategoryListPage } from "./pages/CategoryListPage/CategoryListPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import { persistor, store } from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <AllProductsPage isDiscounted={false} />,
      },
      {
        path: "/sales",
        element: <AllProductsPage isDiscounted={true} />,
      },
      {
        path: "/basket",
        element: <CartPage />,
      },
      {
        path: "/*",
        element: <ErrorPage />,
      },
      {
        path: "/categories/:id",
        element: <CategoryListPage />,
      },
      {
        path: "/products/:id",
        element: <SingleProductPage />,
      },
    ],
  },
], 
{ basename: "/final_project_tel_ran" });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}>
          <Suspense fallback={<Loader />}>
            <App />
          </Suspense>
        </RouterProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
