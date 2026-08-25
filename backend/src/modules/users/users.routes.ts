import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.js";
import { UserController } from "./users.controller.js";

export class UserRoutes {

    private userController: UserController
    public router: Router

    constructor() {
        this.router = Router()
        this.userController = new UserController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.get("/", authMiddleware, this.userController.getUsers.bind(this.userController))
    }
}