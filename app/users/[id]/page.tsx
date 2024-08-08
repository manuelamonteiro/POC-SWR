'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';

interface User {
    id: number;
    name: string;
}

const UserDetails: React.FC = () => {
    const { id } = useParams(); // Pega o parâmetro "id" da URL
    const { data } = useFetch<User>(`users/${id}`);

    if (!data) {
        return <p>Carregando...</p>
    }

    // useEffect(() => {
    //     if (id) {
    //         fetch(`http://localhost:3333/users/${id}`).then(response => {
    //             response.json().then(user => {
    //                 setData(user);
    //             });
    //         });
    //     }
    // }, [id]);

    return (
        <ul className="text-blue-500">
            <li>ID: {data?.id}</li>
            <li>Name: {data?.name}</li>
        </ul>
    );
}

export default UserDetails;
