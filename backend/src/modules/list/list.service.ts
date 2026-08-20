import { ConflictError, NotFoundError } from "../../errors/AppError";
import { ListRepository } from "./list.repository";

export class ListService {
    
    private listRepository = new ListRepository()

    private async assertUserInList(listId: number, userId: number) {

        const userExists = await this.listRepository.findUserInListRepository(listId, userId)

        if (!userExists) {
            throw new NotFoundError("User not in list")
        }
    }

    private async assertUserNotInList(listId: number, userId: number) {

        const userExists = await this.listRepository.findUserInListRepository(listId, userId)

        if (userExists) {
            throw new ConflictError("User already in list")
        }
    }

    public async addUserService(listId: number, userId: number){

        await this.assertUserNotInList(listId, userId)

        return await this.listRepository.addUserRepository(listId, userId)
    }

    public async removeUserService(listId: number, userId: number) {

        await this.assertUserInList(listId, userId)

        return await this.listRepository.removeUserRepository(listId, userId)
    }

    public async changeStatusService(listId: number, userId: number, status: boolean) {

        await this.assertUserInList(listId, userId)

        return await this.listRepository.changeStatusRepository(listId, userId, status)
    }

    public async getListUserService(listId: number) {
        return await this.listRepository.getListUserRepository(listId)
    }
}