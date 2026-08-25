import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";


export class Database {

    private static instance: Database
    private prisma: PrismaClient

    constructor(){
        const adapter= new PrismaPg({
            connectionString: process.env.DATABASE_URL!
        })

        this.prisma = new PrismaClient({adapter})
    }

    public static getInstance(): Database {

        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    public get client(): PrismaClient {
        return this.prisma
    }
}