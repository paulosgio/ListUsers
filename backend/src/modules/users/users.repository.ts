import { Database } from "../../configs/database/prisma";
import { userDTO } from "./DTO/userDTO";

export class UserRepository {

    private database = Database.getInstance()

    public async getUsers (): Promise<userDTO[]> {
        return await this.database.client.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
            }
        })
    }
}