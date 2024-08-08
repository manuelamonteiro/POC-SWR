'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface User {
    id: number;
    name: string;
}

const UserDetails: React.FC = () => {
    const { id } = useParams(); // Pega o parâmetro "id" da URL
    const [data, setData] = useState<User | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3333/users/${id}`).then(response => {
                response.json().then(user => {
                    setData(user);
                });
            });
        }
    }, [id]);

    return (
        <ul>
            <li>ID: {data?.id}</li>
            <li>Name: {data?.name}</li>
        </ul>
    );
}

export default UserDetails;
