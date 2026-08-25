import { Database } from "../../configs/database/prisma.js";
import { CreateUserDTO } from "./DTO/createUserDTO.js";

export class AuthRepository {

    private database = Database.getInstance();

    public async findByEmailRepository(email:string) {

        return await this.database.client.user.findUnique({
            where: {
                email
            }
        })
    }

    public async registerRepository(data: CreateUserDTO) {

        return await this.database.client.$transaction(async (tx)=> {

            const user = tx.user.create({ data })

            await tx.list.create({
                data: {
                    ownerId: (await user).id
                }
            })

            return user
        })
    }

    public async me(id: number) {
        return await this.database.client.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })
    }
}