import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, Container, Typography, Paper, Tabs, Tab
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FoodManager from '../components/FoodManager';
import UserManager from '../components/UserManager';
import StoreManager from '../components/StoreManager';

const AdminDashboard = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    useEffect(() => {
        if (auth.user) {
            if (auth.user.role !== 'admin' && auth.user.role !== 'Admin') {
                console.warn("User is not admin, redirecting...");
                navigate('/');
            }
        }
    }, [auth.user, navigate]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                管理者ダッシュボード
            </Typography>

            <Paper sx={{ mb: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="料理管理" />
                    <Tab label="ユーザー管理" />
                    <Tab label="店舗管理" />
                </Tabs>
            </Paper>

            <Box sx={{ py: 2 }}>
                {tabValue === 0 && <FoodManager />}
                {tabValue === 1 && <UserManager />}
                {tabValue === 2 && <StoreManager />}
            </Box>
        </Container>
    );
};

export default AdminDashboard;
