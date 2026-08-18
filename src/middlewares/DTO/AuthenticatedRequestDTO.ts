import { Request } from "express";

export interface AuthenticatedRequestDTO extends Request {
    user?: {
        id: number;
    };
}
