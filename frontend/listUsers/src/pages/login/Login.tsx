import { useForm } from "react-hook-form";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

interface ILoginForm {
    email: string;
    password: string;
}

export default function Login() {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ILoginForm>();

    async function handleLogin(data: ILoginForm) {
        try {
            const response = await api.post("/auth/login", data)
            localStorage.setItem("token", response.data.token)
            navigate("/home")
        } catch (error) {
            console.log("Deu erro");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Login
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Entre na sua conta
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="space-y-5"
                >

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

                    {/* Botão */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Entrar
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Ainda não possui uma conta?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Criar conta
                    </a>
                </p>

            </div>

        </div>
    );
}