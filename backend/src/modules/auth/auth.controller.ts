import { NextFunction, Request, Response } from 'express';
import { AuthService } from "./auth.service";

export class AuthController {

    private authService = new AuthService()
    
    public async login(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await this.authService.loginService(req.body)
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    } 

    public async register(req: Request, res: Response, next: NextFunction) {

        try {
            const data = await this.authService.registerService(req.body)
            return res.status(200).json(data)   
        } catch (error) {
            next(error)            
        }
    }
}