import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import api from '../api/axios';

const StoreManager = () => {
    const [stores, setStores] = useState([]);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentStore, setCurrentStore] = useState({
        id: null,
        name: '',
        address: '',
        image: '',
        description: '',
        city: ''
    });

    const fetchStores = async () => {
        try {
            const res = await api.get('/store');
            setStores(res.data);
        } catch (err) {
            console.error("Lỗi tải danh sách cửa hàng:", err);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('この店舗を削除してもよろしいですか？')) {
            try {
                await api.delete(`/store/${id}`);
                alert('店舗を削除しました！');
                fetchStores();
            } catch (err) {
                console.error("Lỗi xóa cửa hàng:", err);
                alert('削除に失敗しました。');
            }
        }
    };

    const handleOpenAdd = () => {
        setIsEditing(false);
        setCurrentStore({ id: null, name: '', address: '', image: '', description: '', city: '' });
        setOpen(true);
    };

    const handleOpenEdit = (store) => {
        setIsEditing(true);
        setCurrentStore(store);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentStore(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            if (isEditing) {
                await api.put(`/store/${currentStore.id}`, currentStore);
                alert("更新しました！");
            } else {
                await api.post('/store', currentStore);
                alert("新しい店舗を追加しました！");
            }
            setOpen(false);
            fetchStores();
        } catch (err) {
            console.error("Lỗi lưu dữ liệu cửa hàng:", err);
            const errMsg = err.response?.data?.msg || 'エラーが発生しました。';
            alert(`エラー: ${errMsg}`);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                    店舗リスト
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} color="success" onClick={handleOpenAdd}>
                    店舗を追加
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell><strong>画像</strong></TableCell>
                            <TableCell><strong>店舗名</strong></TableCell>
                            <TableCell><strong>住所</strong></TableCell>
                            <TableCell align="right"><strong>操作</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stores.map((store) => (
                            <TableRow key={store.id} hover>
                                <TableCell>
                                    <Avatar src={store.image} variant="rounded" sx={{ width: 60, height: 60 }} />
                                </TableCell>
                                <TableCell>{store.name}</TableCell>
                                <TableCell>{store.address}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleOpenEdit(store)}><EditIcon /></IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(store.id)}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>{isEditing ? '店舗を編集' : '新しい店舗を追加'}</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" name="city" label="都市コード (例: Ha Noi, Ho Chi Minh)" type="text" fullWidth variant="outlined" value={currentStore.city || ''} onChange={handleChange} />
                    <TextField autoFocus margin="dense" name="name" label="店舗名" type="text" fullWidth variant="outlined" value={currentStore.name} onChange={handleChange} />
                    <TextField margin="dense" name="address" label="住所" type="text" fullWidth variant="outlined" value={currentStore.address} onChange={handleChange} />
                    <TextField margin="dense" name="image" label="画像リンク (URL)" type="text" fullWidth variant="outlined" value={currentStore.image} onChange={handleChange} />
                    <TextField margin="dense" name="description" label="説明" type="text" fullWidth multiline rows={3} variant="outlined" value={currentStore.description} onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">キャンセル</Button>
                    <Button onClick={handleSave} variant="contained" color="primary">{isEditing ? '更新' : '追加'}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StoreManager;