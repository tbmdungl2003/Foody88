import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
    Container,
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
    Paper,
    Rating, Box
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios'; 

const CommentPage = () => {
    const { id: foodId } = useParams();
    const { auth } = useContext(AuthContext);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/comments/${foodId}`);
                const apiComments = response.data.map(comment => {
                    const idStr = comment._id || JSON.stringify(comment);
                    let hash = 0;
                    for (let i = 0; i < idStr.length; i++) {
                        hash = ((hash << 5) - hash) + idStr.charCodeAt(i);
                        hash |= 0;
                    }
                    const fixedRating = (Math.abs(hash) % 3) + 3;
                    return { ...comment, rating: fixedRating };
                });
                const storedComments = JSON.parse(localStorage.getItem(`comments_${foodId}`) || '[]');
                setComments([...storedComments, ...apiComments]);
            } catch (err) {
                setError('コメントを読み込めませんでした。');
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [foodId]);

    const { averageRating, totalReviews } = useMemo(() => {
        if (comments.length === 0) {
            return { averageRating: 0, totalReviews: 0 };
        }
        const totalRating = comments.reduce((acc, comment) => acc + (comment.rating || 0), 0);
        return {
            averageRating: totalRating / comments.length,
            totalReviews: comments.length
        };
    }, [comments]);

    const handlePostComment = async () => {
        if (!newComment.trim() || newRating === 0) {
            alert('コメントを入力し、評価を選択してください。');
            return;
        }

        try {
            const newCommentData = {
                _id: Date.now().toString(), // ID giả unique hơn
                text: newComment,
                rating: newRating,
                user: auth.user,
                createdAt: new Date().toISOString(),
            };
            setComments(prevComments => [newCommentData, ...prevComments]);
            const currentStored = JSON.parse(localStorage.getItem(`comments_${foodId}`) || '[]');
            localStorage.setItem(`comments_${foodId}`, JSON.stringify([newCommentData, ...currentStored]));
            
            setNewComment('');
            setNewRating(0);
        } catch (err) {
            setError('コメントの送信に失敗しました。もう一度お試しください。');
        }
    };

    return (
        <Box sx={{ backgroundColor: '#f8eecbff', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="md">
            <Button component={RouterLink} to={`/details/${foodId}`} startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
                料理の詳細に戻る
            </Button>
            <Typography variant="h4" gutterBottom>評価とコメント</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mr: 2, fontWeight: 'bold' }}>{averageRating.toFixed(1)}</Typography>
                <Box>
                    <Rating value={averageRating} precision={0.1} readOnly />
                    <Typography variant="body2" color="text.secondary">{totalReviews} 件の評価</Typography>
                </Box>
            </Box>

            {auth.isAuthenticated && (
                <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
                    <Typography variant="h6" gutterBottom>コメントを書く</Typography>
                    <Typography component="legend">あなたの評価</Typography>
                    <Rating name="new-rating" value={newRating} onChange={(e, newValue) => setNewRating(newValue)} sx={{ mb: 1 }} />
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        placeholder="感想を共有しましょう..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={handlePostComment}
                        sx={{ mt: 2 }}
                    >
                        送信
                    </Button>
                </Paper>
            )}
            
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {!loading && comments.length === 0 && (
                <Typography color="text.secondary">まだ評価はありません。</Typography>
            )}
            <List>
                {comments.map((comment, index) => (
                    <React.Fragment key={comment._id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src={comment.user?.avatar ? `http://localhost:5000${comment.user.avatar}` : ''}>
                                    {comment.user?.username?.charAt(0).toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                            {comment.user?.username || '匿名ユーザー'}
                                        </Typography>
                                        <Rating value={comment.rating || 0} size="small" readOnly sx={{ my: 0.5 }} />
                                    </Box>
                                }
                                secondaryTypographyProps={{ component: 'div' }}
                                secondary={<>{comment.text}<br/> <Typography variant="caption" color="text.secondary">{new Date(comment.createdAt).toLocaleString('ja-JP')}</Typography></>}
                            />
                        </ListItem>
                        {index < comments.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
            </Container>
        </Box>
    );
};

export default CommentPage;