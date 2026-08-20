import { UserRepository } from "./users.repository";

export class UserService {

    private userRepository = new UserRepository()

    public async getUsers() {
        this.userRepository.getUsers()
    }
}