import { createBrowserRouter } from "react-router";
import Root from "../layouts/RootLayout/Root";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import HomePage from "../pages/HomePage";
import AddCar from "../components/AddCar/AddCar";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import MyListing from "../components/MyListing/MyListing";
import BrowseCars from "../components/BrowseCars/BrowseCars";
import CarDetails from "../components/CarDetails/CarDetails";
import MyBookings from "../components/MyBookings/MyBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/add-car",
        element: (
          <PrivateRoute>
            <AddCar></AddCar>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-listing",
        element: (
          <PrivateRoute>
            <MyListing></MyListing>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: "/car-details/:id",
        element: (
          <PrivateRoute>
            <CarDetails></CarDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          const token = localStorage.getItem("token");
          console.log(token);
          return fetch(`http://localhost:3000/car-details/${params.id}`, {
            headers: {
              authorization: `Bearer ${token}`,
              "content-type": "application/json",
            },
          });
        },
      },
      {
        path: "/all-cars",
        element: <BrowseCars></BrowseCars>,
        loader: () => fetch("http://localhost:3000/all-cars"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/auth/login",
        element: <LoginPage></LoginPage>,
      },
    ],
  },
]);
