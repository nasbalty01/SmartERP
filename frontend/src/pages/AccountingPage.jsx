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
import { Add, AttachMoney } from '@mui/icons-material';

const AccountingPage = () => {
    const [invoices, setInvoices] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        dueDate: '',
        type: 'sale',
        status: 'unpaid'
    });

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const { data } = await api.get('/accounting/invoices');
            setInvoices(data);
        } catch (error) {
            console.error('Error fetching invoices:', error);
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
            await api.post('/accounting/invoices', formData);
            fetchInvoices();
            handleClose();
        } catch (error) {
            console.error('Error creating invoice:', error);
            alert('Failed to create invoice');
        }
    };

    const handlePay = async (id) => {
        try {
            await api.post(`/accounting/invoices/${id}/pay`, { amount: 100 }); // Partial/Full pay logic simplified
            fetchInvoices();
        } catch (error) {
            alert('Payment failed');
        }
    }

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">Invoices</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={handleClickOpen}>
                    New Invoice
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Invoice #</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice._id}>
                                <TableCell>{invoice._id.substring(0, 8)}</TableCell>
                                <TableCell>{invoice.type.toUpperCase()}</TableCell>
                                <TableCell>${invoice.amount}</TableCell>
                                <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={invoice.status}
                                        color={invoice.status === 'paid' ? 'success' : 'error'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {invoice.status !== 'paid' && (
                                        <Button size="small" startIcon={<AttachMoney />} onClick={() => handlePay(invoice._id)}>
                                            Mark Paid
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Invoice</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        margin="dense"
                        name="type"
                        label="Type"
                        fullWidth
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <MenuItem value="sale">Sale</MenuItem>
                        <MenuItem value="purchase">Purchase</MenuItem>
                    </TextField>
                    <TextField
                        margin="dense"
                        name="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        value={formData.amount}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="dueDate"
                        label="Due Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.dueDate}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Create</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AccountingPage;
