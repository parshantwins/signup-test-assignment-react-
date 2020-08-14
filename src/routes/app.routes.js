import Signup from "../containers/users/signup";
import Errors from "../containers/error/errors";

var appRoutes = [
  {
    path: '/',
    name: "Signup",
    component: Signup,
    exact: true
  },
  {
    path: '/Signup',
    name: "Signup",
    component: Signup
  },
  {
    path: `${process.env.REACT_APP_PUBLIC_URL}/error`,
    name: "Error",
    component: Errors
  }
];

export default appRoutes;
