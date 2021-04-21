import Message from "../page/Message";
import Users from "../page/Users";
import User from "../page/User";
import Home from "../page/Home";
import Error404 from "../page/Error404";

export default [
  {
    path: "/msg/:id",
    exact: true,
    page: Message,
  },
  {
    path: "/users",
    exact: true,
    page: Users,
  },
  {
    path: "/:id",
    exact: true,
    page: User,
  },
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "*",
    page: Error404,
  },
];
