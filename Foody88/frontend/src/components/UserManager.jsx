import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, IconButton, Avatar 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api/axios';

const UserManager = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            // Gọi API: GET /api/auth/users
            const res = await api.get('/auth/users');
            setUsers(res.data);
        } catch (err) {
            console.error("Lỗi tải danh sách người dùng:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if(window.confirm('このユーザーを削除してもよろしいですか？')) {
            try {
                await api.delete(`/auth/users/${id}`);
                alert('ユーザーを削除しました！');
                fetchUsers(); 
            } catch (err) {
                console.error("Lỗi xóa người dùng:", err);
                alert('削除に失敗しました。');
            }
        }
    };

    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 3 }}>
                ユーザーリスト
            </Typography>
            
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell><strong>アバター</strong></TableCell>
                            <TableCell><strong>ユーザー名</strong></TableCell>
                            <TableCell><strong>メール</strong></TableCell>
                            <TableCell><strong>役割</strong></TableCell>
                            <TableCell align="right"><strong>操作</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id} hover>
                                <TableCell>
                                    <Avatar 
                                        src={user.avatar ? `http://localhost:5000${user.avatar}` : undefined} 
                                        alt={user.username}
                                    >
                                        {user.username?.charAt(0).toUpperCase()}
                                    </Avatar>
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {user.role === 'admin' ? (
                                        <Typography color="error" fontWeight="bold">Admin</Typography>
                                    ) : (
                                        <Typography color="textSecondary">User</Typography>
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton color="error" onClick={() => handleDelete(user._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserManager;