import axios from "axios";
import { useForm } from "react-hook-form";
import { api } from "../../api/api";

interface IRegisterForm {
    name: string;
    email: string;
    password: string;
}

interface IRegisterResponse {
    id: number,
    email: string,
    name: string,
    createdAt: string | Date
}

export default function Register() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IRegisterForm>();

    async function handleRegister(data: IRegisterForm) {
        const response: IRegisterResponse = await api.post("http://localhost:3000/auth/register", data)
        console.log(response);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Criar conta
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Crie sua conta para começar
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="space-y-5"
                >

                    {/* Nome */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Nome
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Seu nome"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("name", {
                                required: "Nome é obrigatório"
                            })}
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("email", {
                                required: "Email é obrigatório"
                            })}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Senha */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Senha
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...register("password", {
                                required: "Senha é obrigatória",
                                minLength: {
                                    value: 6,
                                    message: "A senha deve ter pelo menos 6 caracteres"
                                }
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Criar conta
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Já possui uma conta?{" "}

                    <a
                        href="/"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Entrar
                    </a>
                </p>

            </div>

        </div>
    );
}