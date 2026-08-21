import { ListService } from "./list.service";
import { NextFunction, Request, Response } from "express";

export class ListController {

    private listService = new ListService()

    public async addUser(req: Request, res: Response, next: NextFunction) {

        try {
            const { listId } = req.params
            const { userId } = req.body
    
            const data = await this.listService.addUserService(Number(listId), userId)
    
            return res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    public async removeUser(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId, listId } = req.params
    
            await this.listService.removeUserService(Number(listId), Number(userId))
    
            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }

    public async changeStatus(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId, listId } = req.params
            const data = await this.listService.changeStatusService(Number(listId), Number(userId))
    
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    public async getListUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { listId } = req.params
            const response = await this.listService.getListUserService(Number(listId))
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}