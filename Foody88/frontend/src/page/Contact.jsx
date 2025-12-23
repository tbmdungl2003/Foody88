import React from 'react';
import {
    Box, Container, Typography, Paper, Grid, Link, Avatar, TextField, Button,
    FormControl, InputLabel, Select, MenuItem, Alert, IconButton
} from '@mui/material';
import { Mail, MapPin, Phone, Briefcase, Instagram, Facebook } from 'lucide-react';
import { Stack } from '@mui/material';

const redBrown = '#ea4949ff';

const ContactItem = ({ icon: Icon, title, content, href }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}>
        <Avatar sx={{ bgcolor: redBrown, color: 'white' }}>
            <Icon size={20} color="white" />
        </Avatar>
        <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {title}
            </Typography>
            <Link 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                underline="hover"
                sx={{ 
                    color: '#555', 
                    textDecorationColor: '#555',
                    fontSize: '0.9rem' 
                }}
            >
                {content}
            </Link>
        </Box>
    </Box>
);

const Contact = () => {
    const [statusMessage, setStatusMessage] = React.useState('');
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        topic: '',
        message: ''
    });
    const [errors, setErrors] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Thêm logic kiểm tra lỗi ngay khi người dùng gõ
        if (name === 'email') {

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value)) {
                setErrors(prev => ({ ...prev, email: "有効なメールアドレスを入力してください。" }));
            } else {
                // Nếu email hợp lệ, xóa lỗi đi
                const { email, ...restErrors } = errors;
                setErrors(restErrors);
            }
        }
    };

    const validate = () => {
        const tempErrors = {};
        // Sử dụng regex mạnh hơn để kiểm tra định dạng email chuẩn
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            tempErrors.email = "有効なメールアドレスを入力してください。";
        }
        if (!formData.name) {
            tempErrors.name = "氏名を入力してください。";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setStatusMessage('メッセージを送信いただきありがとうございます！Foody88は24時間以内に返信いたします。');
            e.target.reset();
            setTimeout(() => setStatusMessage(''), 5000);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8eecbff', p: { xs: 2, sm: 4 } }}>
            <Container maxWidth="xl">
                {/* Header Section */}
                <Box sx={{
                    bgcolor: redBrown,
                    color: 'white',
                    py: 8,
                    borderRadius: 5,
                    boxShadow: 6,
                    mb: 6,
                    textAlign: 'center'
                }}>
                    <Mail size={64} style={{ margin: 'auto', marginBottom: '16px' }} />
                    <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>Foody88へのお問い合わせ</Typography>
                    <Typography variant="h6" sx={{ fontStyle: 'italic', opacity: 0.9 }}>いつでもお待ちしております！</Typography>
                </Box>

                <Grid container spacing={3} >
                    <Grid item xs={12} md={9}>
                        <Paper elevation={4} sx={{ p: 2, borderRadius: 4 , width: '100%', height: '100%'}}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: redBrown }}>
                                                                メッセージを送信                          
                            </Typography>

                            {statusMessage && <Alert severity="success" sx={{ mb: 9 }}>{statusMessage}</Alert>}

                            <form onSubmit={handleSubmit}>
                                <Stack spacing={3} sx={{ width: '100%' }}> 
                                    
                                    {/* Ô 1: Họ tên */}
                                    <TextField 
                                        label="氏名 (*)" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        fullWidth 
                                        required
                                        error={!!errors.name}
                                        helperText={errors.name}
                                    />

                                    {/* Ô 2: Email */}
                                    <TextField 
                                        label="メールアドレス (*)" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email" 
                                        fullWidth 
                                        required 
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />
                                    <Box sx={{ width: '100%' }}> 
                                        <FormControl fullWidth required>
                                            <InputLabel>件名を選択 (*)</InputLabel>
                                            <Select 
                                                label="件名を選択 (*)" 
                                                name="topic" 
                                                value={formData.topic} 
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="feedback">レシピへのフィードバック</MenuItem>
                                                <MenuItem value="partnership">提携・メディア</MenuItem>
                                                <MenuItem value="technical">技術サポート</MenuItem>
                                                <MenuItem value="general">一般的な質問</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    {/* Ô 4: Nội dung */}
                                    <TextField 
                                        label="メッセージ内容 (*)" 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        multiline 
                                        rows={5} 
                                        fullWidth 
                                        required 
                                    />

                                    {/* Ô 5: Nút bấm */}
                                    <Box>
                                        <Button 
                                            type="submit" 
                                            variant="contained" 
                                            size="large" 
                                            fullWidth 
                                            sx={{ 
                                                py: 1.5, 
                                                fontWeight: 'bold', 
                                                borderRadius: '50px', 
                                                bgcolor: redBrown, 
                                                '&:hover': { bgcolor: '#9e3131' } 
                                            }}
                                        >
                                            メッセージを送信
                                        </Button>
                                        <Typography variant="caption" display="block" textAlign="center" sx={{ mt: 1 }}>
                                            24〜48営業時間以内に返信いたします。
                                        </Typography>
                                    </Box>

                                </Stack>
                            </form>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Paper elevation={4} sx={{ p: 2, borderRadius: 4 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: redBrown, borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                                    詳細情報
                                </Typography>
                                <ContactItem icon={MapPin} title="事務所住所" content="ハノイ市ハイバーチュン区ダイコーベト通り1番" href="https://www.google.com/maps/place/Hanoi+University+of+Science+and+Technology" />
                                <ContactItem icon={Mail} title="サポートメール" content="support@foody88.com" href="mailto:support@foody88.com" />
                                <ContactItem icon={Briefcase} title="提携・PR" content="partner@foody88.com" href="mailto:partner@foody88.com" />
                                <ContactItem icon={Phone} title="ホットライン" content="(+84) 901 888 888" href="tel:+84901888888" />
                            </Paper>

                            <Paper elevation={4} sx={{ p: 3, borderRadius: 4 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: redBrown }}>
                                    Foody88をフォロー
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    最新の料理を見るために今すぐ接続してください
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <IconButton component="a" href="#" target="_blank" sx={{ bgcolor: '#1877F2', color: 'white', '&:hover': { bgcolor: '#166fe5' } }}>
                                        <Facebook size={20} />
                                    </IconButton>
                                    <IconButton component="a" href="#" target="_blank" sx={{ background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', color: 'white' }}>
                                        <Instagram size={20} />
                                    </IconButton>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};

export default Contact;