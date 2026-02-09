import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
    Box,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    MenuItem
} from '@mui/material';
import { Add } from '@mui/icons-material';

const SalesPage = () => {
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        customer: '',
        totalAmount: '',
        status: 'draft'
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/sales/orders');
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            // Simplified: In real app, we would select products and calculate total
            await api.post('/sales/orders', {
                ...formData,
                products: [] // Placeholder for products
            });
            fetchOrders();
            handleClose();
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order. (Ensure Customer ID is valid if testing manually)');
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">Sales Orders</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={handleClickOpen}>
                    New Order
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order._id.substring(0, 8)}...</TableCell>
                                <TableCell>{order.customer?.name || 'N/A'}</TableCell>
                                <TableCell>${order.totalAmount}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.status}
                                        color={order.status === 'completed' ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Sales Order</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="customer"
                        label="Customer ID"
                        fullWidth
                        value={formData.customer}
                        onChange={handleChange}
                        helperText="Enter valid Customer ID from CRM"
                    />
                    <TextField
                        margin="dense"
                        name="totalAmount"
                        label="Total Amount"
                        type="number"
                        fullWidth
                        value={formData.totalAmount}
                        onChange={handleChange}
                    />
                    <TextField
                        select
                        margin="dense"
                        name="status"
                        label="Status"
                        fullWidth
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="sent">Sent</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Create</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default SalesPage;
