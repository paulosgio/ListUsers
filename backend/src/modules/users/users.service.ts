import { UserRepository } from "./users.repository.js";

export class UserService {

    private userRepository = new UserRepository()

    public async getUsers() {
       return this.userRepository.getUsers()
    }
}