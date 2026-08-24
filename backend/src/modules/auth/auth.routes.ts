import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth";

export class AuthRoutes {

    private authController: AuthController
    public router: Router

    constructor() {
        this.router = Router()
        this.authController = new AuthController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {

        this.router.post("/login", this.authController.login.bind(this.authController))
        this.router.post("/register", this.authController.register.bind(this.authController))
        this.router.get("/me", authMiddleware, this.authController.me.bind(this.authController))
    }
}