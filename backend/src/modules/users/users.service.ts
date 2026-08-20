import { UserRepository } from "./users.repository";

export class UserService {

    private userRepository = new UserRepository()

    public async getUsers() {
       return this.userRepository.getUsers()
    }
}