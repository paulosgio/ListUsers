import "dotenv/config";
import express, { Express } from "express"
import { setupMiddlewares } from "./configs/middlewares/index.js";
import { AuthRoutes } from "./modules/auth/auth.routes.js";
import { ListRoutes } from "./modules/list/list.routes.js";
import { errorHandler } from "./middlewares/errorHandle.js";
import { UserRoutes } from "./modules/users/users.routes.js";

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