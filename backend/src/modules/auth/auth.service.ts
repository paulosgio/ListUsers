import { AuthRepository } from "./auth.repository";
import { CreateUserDTO } from "./DTO/createUserDTO";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { loginUserDTO } from "./DTO/loginUserDTO";
import { registerResponseDTO } from "./DTO/registerResponseDTO";
import { loginResponseDTO } from "./DTO/loginResponseDTO";
import { ConflictError, NotFoundError, UnauthorizedError } from "../../errors/AppError";
import { ListRepository } from "../list/list.repository";
import { meDTO } from "./DTO/meDTO";

export class AuthService {

    private authRepository = new AuthRepository()
    private listRepository = new ListRepository()

    private async userAlreadyExist(data: CreateUserDTO) {

        const userAlreadyExist = await this.authRepository.findByEmailRepository(data.email)
        
        if (userAlreadyExist) {
            throw new ConflictError("E-mail already saved");
        }
    }

    public async registerService(data: CreateUserDTO): Promise<registerResponseDTO> {

        await this.userAlreadyExist(data)

        const hashedPassword = await bcrypt.hash(data.password, 10)
        const user = await this.authRepository.registerRepository({
            ...data,
            password: String(hashedPassword)
        })

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
        }
    }

    public async loginService(data: loginUserDTO): Promise<loginResponseDTO> {

        const user = await this.authRepository.findByEmailRepository(data.email)

        if (!user) {
            throw new NotFoundError("User invalid!")
        }

        const passwordIsCorrect = await bcrypt.compare(
            data.password,
            user.password
        )

        if (!passwordIsCorrect) {
            throw new UnauthorizedError("Password is incorrect!")
        }

        const list = await this.listRepository.findListByOwnerId(user.id)

        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "15m"
            }
        )

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            listId: list?.id!
        }
    }

    public async me(id: number): Promise<meDTO> {

        const user = await this.authRepository.me(id)

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user
    }
}