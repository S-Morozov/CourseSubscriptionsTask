// src/components/UserList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../../types';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5001/api/users');
                setUsers(response.data.result);
            } catch (error) {
                setError('Ошибка при загрузке пользователей. Попробуйте позже.');
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <p>Загрузка пользователей...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="user-list">
            <h3>Список пользователей</h3>
            <ul>
                {users.map(user => (
                    <li key={user.sys_id}>
                        {user.username} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
