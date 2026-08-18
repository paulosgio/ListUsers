export interface loginResponseDTO {
    token: string,
    user: {
        id: number,
        name: string,
        email: string
    }
}