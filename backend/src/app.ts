import "dotenv/config";
import express, { Express, NextFunction } from "express"
import { Request, Response } from "express";
import { setupMiddlewares } from "./configs/middlewares";
import { AuthRoutes } from "./modules/auth/auth.routes";
import { ListRoutes } from "./modules/list/list.routes";
import { errorHandler } from "./middlewares/errorHandle";
import { UserRoutes } from "./modules/users/users.routes";

export class App {
    private app: Express;

    constructor() {
        this.app = express()
        setupMiddlewares(this.app)
        this.routes()
        this.app.use(errorHandler)
    }

    private routes(): void {
        
        const authRoutes = new AuthRoutes()
        const listRoutes = new ListRoutes()
        const userRoutes = new UserRoutes()

        this.app.use("/auth", authRoutes.router)
        this.app.use("/lists", listRoutes.router)
        this.app.use("/users", userRoutes.router)
        this.app.get("/", (req, res)=> {
            res.send("Server working")
        })
    }

    public start(port: number): void {
        this.app.listen(port, ()=> {
            console.log(`Servidor rodando na porta ${port}`);
        })
    }
}