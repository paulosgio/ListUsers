import { useEffect, useState } from "react";
import { useListUsersState } from "../../store/useListUsersStore";
import { api } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";

interface IUser {
    id: number;
    name: string;
    email: string;
    active: boolean;
}

export default function Home() {

    const { getUsers, users } = useListUsersState();

    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [listUsers, setListUsers] = useState<IUser[]>([]);

    const { listId } = useParams();
    const navigate = useNavigate();

    const id = Number(listId);

    useEffect(() => {

        if (!listId) return;

        getUsers();
        getList(id);

    }, [listId]);

    //const me = users.filter(param => param.id === )
    

    async function getList(listId: number) {

        try {

            const response = await api.get(`/lists/${listId}`);

            setListUsers(response.data);

        } catch (error) {

            console.error("Erro ao buscar usuários da lista:", error);

        }
    }

    function handleSelectUser(userId: number) {

        setSelectedUsers(prev => {

            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            }

            return [...prev, userId];
        });
    }

    async function handleAddUsers() {

        try {

            for (const userId of selectedUsers) {

                await api.post(`/lists/${id}/users`, {
                    userId
                });

            }

            setSelectedUsers([]);

            await getList(id);

        } catch (error) {

            console.error("Erro ao adicionar usuários:", error);

        }
    }

    async function handleToggleStatus(userId: number) {

        try {

            const response = await api.patch(
                `/lists/${id}/users/${userId}`
            );

            const updatedUser = response.data;

            setListUsers(prev =>
                prev.map(user =>
                    user.id === userId
                        ? {
                            ...user,
                            active: updatedUser.active
                        }
                        : user
                )
            );

        } catch (error) {

            console.error("Erro ao alterar status:", error);

        }
    }

    async function handleRemoveUser(userId: number) {

        try {

            await api.delete(`/lists/${id}/users/${userId}`);

            setListUsers(prev =>
                prev.filter(user => user.id !== userId)
            );

        } catch (error) {

            console.error("Erro ao remover usuário:", error);

        }
    }

    function handleLogout() {

        localStorage.removeItem("token");
        localStorage.removeItem("listId");

        navigate("/");
    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">

            <div className="max-w-6xl mx-auto">

                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Minha lista
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Selecione usuários e gerencie sua lista.
                        </p>

                    </div>

                    <div className="flex items-center gap-3">

                        <div className="hidden sm:flex items-center gap-3 bg-white rounded-xl shadow-sm px-4 py-3">

                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-semibold">
                                    U
                                </span>
                            </div>

                            <div>

                                <p className="text-sm font-semibold text-gray-800">
                                    
                                </p>

                                <p className="text-xs text-gray-500">
                                    Lista #{listId}
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-3 bg-white rounded-xl shadow-sm text-red-600 font-medium hover:bg-red-50 transition"
                        >
                            Sair
                        </button>

                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-xl font-semibold text-gray-800">
                                    Usuários
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Selecione os usuários que deseja adicionar
                                </p>

                            </div>

                            <span className="text-sm text-gray-500">
                                {users.length} usuários
                            </span>

                        </div>


                        <div className="space-y-3">

                            {users.map(user => (

                                <div
                                    key={user.id}
                                    className={`flex items-center gap-4 border rounded-xl p-4 transition ${
                                        selectedUsers.includes(user.id)
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:bg-gray-50"
                                    }`}
                                >

                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={() =>
                                            handleSelectUser(user.id)
                                        }
                                        className="w-5 h-5 accent-blue-600 cursor-pointer"
                                    />

                                    <div className="flex-1">

                                        <p className="font-medium text-gray-800">
                                            {user.name}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {user.email}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>


                        <button
                            onClick={handleAddUsers}
                            disabled={selectedUsers.length === 0}
                            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {selectedUsers.length > 0
                                ? `Adicionar ${selectedUsers.length} usuário(s)`
                                : "Adicionar selecionados"
                            }
                        </button>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-xl font-semibold text-gray-800">
                                    Usuários da lista
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Gerencie os usuários adicionados
                                </p>

                            </div>

                            <span className="text-sm text-gray-500">
                                {listUsers.length} usuários
                            </span>

                        </div>


                        {listUsers.length === 0 ? (

                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">

                                <div className="text-4xl mb-3">
                                    👥
                                </div>

                                <p className="text-gray-400">
                                    Nenhum usuário adicionado.
                                </p>

                                <p className="text-sm text-gray-400 mt-1">
                                    Selecione usuários ao lado para adicioná-los.
                                </p>

                            </div>

                        ) : (

                            <div className="space-y-3">

                                {listUsers.map(user => (

                                    <div
                                        key={user.id}
                                        className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
                                    >

                                        <div className="flex items-center gap-4">

                                            <div className="flex-1 min-w-0">

                                                <p className="font-medium text-gray-800 truncate">
                                                    {user.name}
                                                </p>

                                                <p className="text-sm text-gray-500 truncate">
                                                    {user.email}
                                                </p>

                                            </div>

                                            <button
                                                onClick={() =>
                                                    handleToggleStatus(user.id)
                                                }
                                                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                                                    user.active
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : "bg-red-100 text-red-700 hover:bg-red-200"
                                                }`}
                                            >
                                                {user.active
                                                    ? "Ativo"
                                                    : "Inativo"
                                                }
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleRemoveUser(user.id)
                                                }
                                                className="px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
                                            >
                                                Remover
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}