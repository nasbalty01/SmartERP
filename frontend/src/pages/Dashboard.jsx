import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { People, ShoppingCart, Inventory, AttachMoney } from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ p: 1, borderRadius: 1, bgcolor: `${color}20`, color: color, mr: 2 }}>
                {icon}
            </Box>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {title}
            </Typography>
        </Box>
        <Typography component="p" variant="h4">
            {value}
        </Typography>
    </Paper>
);

const Dashboard = () => {
    // In a real app, fetch these stats from API
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <StatCard title="Total Customers" value="128" icon={<People />} color="#1976d2" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Total Orders" value="45" icon={<ShoppingCart />} color="#2e7d32" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Low Stock Items" value="12" icon={<Inventory />} color="#ed6c02" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Revenue (M)" value="$24.5k" icon={<AttachMoney />} color="#9c27b0" />
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Orders
                        </Typography>
                        <Typography color="text.secondary">
                            (Table placeholder - to be implemented with Sales module integration)
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
