import { Router } from "express";
import { ListController } from "./list.controller";
import { authMiddleware } from "../../middlewares/auth";

export class ListRoutes {

    private listController: ListController
    public router: Router

    constructor() {
        this.router = Router()
        this.listController = new ListController()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post("/:listId/users", authMiddleware, this.listController.addUser.bind(this.listController))
        this.router.delete("/:listId/users/:userId", authMiddleware, this.listController.removeUser.bind(this.listController))
        this.router.patch("/:listId/users/:userId", authMiddleware, this.listController.changeStatus.bind(this.listController))
    }
}