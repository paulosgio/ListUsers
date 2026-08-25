import { UserService } from "./users.service.js";
import { NextFunction, Request, Response } from "express";

export class UserController {

    private userService = new UserService()

    public async getUsers(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await this.userService.getUsers()
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}