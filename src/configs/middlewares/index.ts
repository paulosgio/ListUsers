import { Express } from "express"
import express from "express"
import cors from "cors"

export function setupMiddlewares(app: Express) {
    app.use(express.json())
    app.use(cors())
}