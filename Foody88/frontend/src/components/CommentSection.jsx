import React from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    Paper
} from '@mui/material';
const CommentSection = ({ comments = [] }) => { 
    if (comments.length === 0) {
        return (
            <Typography color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                この料理にはまだコメントがありません。(Chưa có bình luận nào cho món ăn này.)
            </Typography>
        );
    }

    return (
        <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
            <Typography variant="h6" gutterBottom>
                コメント (Bình luận của khách hàng)
            </Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {comments.map((comment, index) => (
                    <React.Fragment key={comment.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'secondary.main' }}>{comment.avatar || comment.user[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {comment.user}
                                    </Typography>
                                }
                                secondary={`${comment.text} — ${new Date(comment.date).toLocaleDateString('vi-VN')}`}
                            />
                        </ListItem>
                        {index < comments.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default CommentSection;