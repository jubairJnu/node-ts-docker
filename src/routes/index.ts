import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    route: UserRoutes,
    path: "/users",
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
