import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../LayOut/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../LayOut/AuthLayout";
import Login from "../Pages/Authantication/Login";
import Register from "../Pages/Authantication/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "../Route/PrivateRoute";
import AddParcelForm from "../Pages/SendPercel";
import DashboardLayout from "../LayOut/DashboardLayout";
import Myparcel from "../Pages/DashboardPages/Myparcel";
import Payment from "../Pages/DashboardPages/Payment";
import PaymentHistory from "../Pages/DashboardPages/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/coverage",
        element: <Coverage />,
      },
      {
        path: "/send",
        element: (
          <PrivateRoute>
            <AddParcelForm />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/dashBoard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'myparcel', // ✅ remove slash!
        element: <Myparcel />,
      },{
        path:'payment/:parcelId',
        element:<Payment/>
      },{
        path:'paymentHistory',
        element:<PaymentHistory/>

      }
    ],
  },
]);
