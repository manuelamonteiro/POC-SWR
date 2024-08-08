'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { mutate as mutateGlobal } from 'swr';
import { useFetch } from '@/hooks/useFetch';
import api from '@/services/api';

interface User {
    id: number;
    name: string;
}

const UserList: React.FC = () => {
    const { data, mutate } = useFetch<User[]>('users');
    //A lista de usuários vem do data do useFetch

    if (!data) {
        return <p>Carregando...</p> //Enquanto a lista não é carregada, aparece que está carregando
    }

    const handleNameChange = useCallback((id: number) => {
        api.put(`users/${id}`, { name: 'Troquei o nome' });

        //Interface otimista
        //Sem realizar um update a alteração é realizada, mas não é refletida na tela sem atualizações
        const updatedUsers = data?.map(user => {
            if (user.id === id) {
                return { ...user, name: 'Troquei o nome' }
            }

            return user;
        })

        mutate(updatedUsers, false); // Atualiza o cache localmente sem revalidar (sem fazer uma nova requisição)
        mutateGlobal(`users/${id}`, { id, name: 'Troquei o nome' }); // Atualiza o cache global para que todas as páginas/refêrencias do usuário específico sejam atualizadas
    }, [data, mutate]);

    return (
        <ul>
            {data.map(user => (
                <li key={user.id} className='flex items-center gap-3 mb-3'>
                    <Link href={`/users/${user.id}`} className="text-blue-500 hover:underline">
                        {user.name}
                    </Link>
                    <button type="button" onClick={() => handleNameChange(user.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
                        Alterar nome
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default UserList;
