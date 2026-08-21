import { Database } from "../../configs/database/prisma";

export class ListRepository {

    private database = Database.getInstance()

    public async addUserRepository(listId: number, userId: number) {

        return await this.database.client.listUser.create({
            data: {
                listId,
                userId
            }
        })
    }

    public async findUserInListRepository(listId: number, userId: number) {

        return await this.database.client.listUser.findUnique({
            where: {
                listId_userId: {
                    userId,
                    listId
                }
            }
        })
    }

    public async removeUserRepository(listId: number, userId: number) {

        return await this.database.client.listUser.delete({
            where: {
                listId_userId: {
                    listId,
                    userId
                }
            }
        })
    }

    public async changeStatusRepository(listId: number, userId: number, status: boolean) {

        return await this.database.client.listUser.update({
            where: {
                listId_userId: {
                    listId,
                    userId
                },
            },
            data: {
                active: status
            }
        })
    }

    public async getListUserRepository(listId: number) {
        return await this.database.client.listUser.findMany({
            where: {
                listId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })
    }

    public async findListByOwnerId(ownerId: number) {
        return await this.database.client.list.findUnique({
            where: {
                ownerId
            }
        })
    }
}