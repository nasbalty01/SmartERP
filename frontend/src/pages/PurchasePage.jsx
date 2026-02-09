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

const PurchasePage = () => {
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        vendor: '',
        totalAmount: '',
        status: 'draft'
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/purchase/orders');
            setOrders(data);
        } catch (error) {
            console.error('Error fetching purchase orders:', error);
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
            await api.post('/purchase/orders', {
                ...formData,
                products: []
            });
            fetchOrders();
            handleClose();
        } catch (error) {
            console.error('Error creating PO:', error);
            alert('Failed to create PO (Ensure Vendor ID is valid)');
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">Purchase Orders</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={handleClickOpen}>
                    New PO
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>PO Number</TableCell>
                            <TableCell>Vendor</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order._id.substring(0, 8)}...</TableCell>
                                <TableCell>{order.vendor?.name || 'N/A'}</TableCell>
                                <TableCell>${order.totalAmount}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.status}
                                        color={order.status === 'received' ? 'success' : 'warning'}
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
                <DialogTitle>New Purchase Order</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="vendor"
                        label="Vendor ID"
                        fullWidth
                        value={formData.vendor}
                        onChange={handleChange}
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
                        <MenuItem value="received">Received</MenuItem>
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

export default PurchasePage;
