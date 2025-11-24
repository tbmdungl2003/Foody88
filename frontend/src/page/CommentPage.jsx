import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    CircularProgress,
    Alert,
    Button,
    TextField,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios'; // Sử dụng axios instance đã cấu hình

const CommentPage = () => {
    const { id: foodId } = useParams();
    const { auth } = useContext(AuthContext);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm để tải các bình luận
    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/comments/${foodId}`);
            setComments(response.data);
        } catch (err) {
            setError('Không thể tải bình luận.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [foodId]);

    // Hàm xử lý gửi bình luận mới
    const handlePostComment = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await api.post(`/comments/${foodId}`, { text: newComment });
            // Thêm bình luận mới vào đầu danh sách để hiển thị ngay lập tức
            setComments(prevComments => [response.data, ...prevComments]);
            setNewComment(''); // Xóa nội dung trong ô nhập
        } catch (err) {
            setError('Gửi bình luận thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button component={RouterLink} to={`/details/${foodId}`} startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
                Quay lại chi tiết món ăn
            </Button>

            <Typography variant="h4" gutterBottom>Bình luận</Typography>

            {/* Khu vực viết bình luận mới (chỉ hiển thị khi đã đăng nhập) */}
            {auth.isAuthenticated && (
                <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
                    <Typography variant="h6" gutterBottom>Viết bình luận của bạn</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        placeholder="Chia sẻ cảm nhận của bạn..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={handlePostComment}
                        sx={{ mt: 2 }}
                    >
                        Gửi
                    </Button>
                </Paper>
            )}

            {/* Danh sách bình luận */}
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {!loading && comments.length === 0 && (
                <Typography color="text.secondary">Chưa có bình luận nào.</Typography>
            )}
            <List>
                {comments.map((comment, index) => (
                    <React.Fragment key={comment._id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src={comment.user?.avatar ? `http://localhost:5000${comment.user.avatar}` : ''}>
                                    {comment.user?.username[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={comment.user?.username || 'Người dùng ẩn'}
                                secondary={`${comment.text} — ${new Date(comment.createdAt).toLocaleDateString('vi-VN')}`}
                            />
                        </ListItem>
                        {index < comments.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </Container>
    );
};

export default CommentPage;