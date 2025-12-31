import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { getFoods } from '../api/api';
import api from '../api/axios';

const FoodManager = () => {
    const [foods, setFoods] = useState([]);

    // State cho Dialog (Modal) thêm/sửa
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentFood, setCurrentFood] = useState({
        name: '',
        price: '',
        address: '',
        image: '',
        description: '',
        city: ''
    });

    const fetchFoods = async () => {
        try {
            const res = await getFoods();
            const data = res.data;
            let allFoods = [];
             if (Array.isArray(data)) {
                allFoods = data;
            } else {
                allFoods = Object.entries(data).flatMap(([cityKey, cityData]) =>
                    (cityData.items || []).map(item => ({ ...item, city: cityKey }))
                );
            }

            setFoods(allFoods);
        } catch (err) {
            console.error("Lỗi tải dữ liệu:", err);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    const handleDelete = async (id) => {
        if(window.confirm('この料理を削除してもよろしいですか？')) {
            try {
                await api.delete(`/foods/${id}`);
                alert('削除しました！');
                fetchFoods();
            } catch (err) {
                console.error("Lỗi xóa món ăn:", err);
                const errMsg = err.response?.data?.message || err.message || '削除に失敗しました。もう一度お試しください。';
                alert(`エラー: ${errMsg}`);
            }
        }
    };

    const handleOpenAdd = () => {
        setIsEditing(false);
        setCurrentFood({ id: null, name: '', price: '', address: '', image: '', description: '', city: '' });
        setOpen(true);
    };

    const handleOpenEdit = (food) => {
        setIsEditing(true);
        setCurrentFood(food);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentFood(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            // Kiểm tra các trường bắt buộc trước khi gửi request
            if (!currentFood.name || !currentFood.price || !currentFood.city) {
                alert("すべての情報を入力してください：料理名、価格、都市コード！");
                return;
            }

            if (isEditing) {
                const id = currentFood._id || currentFood.id;
                await api.put(`/foods/${id}`, currentFood);
                alert("更新しました！");
            } else {
                await api.post('/foods', currentFood);
                alert("新しい料理を追加しました！");
            }
            setOpen(false);
            fetchFoods();
        } catch (err) {
            console.error("Lỗi lưu dữ liệu:", err);
            const errMsg = err.response?.data?.message || err.message || 'エラーが発生しました。もう一度お試しください。';
            alert(`エラー: ${errMsg}`);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                    料理リスト
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} color="success" onClick={handleOpenAdd}>
                    料理を追加
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead sx={{ bgcolor: '#F5F5F5' }}>
                        <TableRow>
                            <TableCell><strong>画像</strong></TableCell>
                            <TableCell><strong>料理名</strong></TableCell>
                            <TableCell><strong>価格</strong></TableCell>
                            <TableCell><strong>住所</strong></TableCell>
                            <TableCell align="right"><strong>操作</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {foods.map((food) => (
                            <TableRow key={food._id || food.id} hover>
                                <TableCell>
                                    <Avatar src={food.image} variant="rounded" sx={{ width: 60, height: 60 }} />
                                </TableCell>
                                <TableCell>{food.name}</TableCell>
                                <TableCell sx={{ color: 'error.main', fontWeight: 'bold' }}>{food.price}</TableCell>
                                <TableCell>{food.address}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleOpenEdit(food)}><EditIcon /></IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(food._id || food.id)}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>{isEditing ? '料理を編集' : '料理を追加'}</DialogTitle>    
                <DialogContent>
                    <TextField margin="dense" name="city" label="都市コード (例: hanoi, hcm)" type="text" fullWidth variant="outlined" value={currentFood.city || ''} onChange={handleChange} />
                    <TextField autoFocus margin="dense" name="name" label="料理名" type="text" fullWidth variant="outlined" value={currentFood.name} onChange={handleChange} />
                    <TextField margin="dense" name="price" label="価格 (例: 50.000đ)" type="text" fullWidth variant="outlined" value={currentFood.price} onChange={handleChange} />
                    <TextField margin="dense" name="address" label="住所" type="text" fullWidth variant="outlined" value={currentFood.address} onChange={handleChange} />
                    <TextField margin="dense" name="image" label="画像リンク (URL)" type="text" fullWidth variant="outlined" value={currentFood.image} onChange={handleChange} />
                    <TextField margin="dense" name="description" label="説明" type="text" fullWidth multiline rows={3} variant="outlined" value={currentFood.description} onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">キャンセル</Button>
                    <Button onClick={handleSave} variant="contained" color="primary">{isEditing ? '更新' : '追加'}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default FoodManager;