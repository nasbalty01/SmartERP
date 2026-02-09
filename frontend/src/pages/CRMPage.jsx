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
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { Add, ArrowForward } from '@mui/icons-material';

const CRMPage = () => {
    const [leads, setLeads] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        source: 'website',
        notes: ''
    });

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const { data } = await api.get('/crm/leads');
            setLeads(data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        }
    };

    const handleConvert = async (id) => {
        try {
            await api.post(`/crm/leads/${id}/convert`);
            fetchLeads();
            alert('Lead converted to Customer!');
        } catch (error) {
            alert(error.response?.data?.message || 'Error converting lead');
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
            await api.post('/crm/leads', formData);
            fetchLeads();
            handleClose();
        } catch (error) {
            alert('Error creating lead');
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">CRM - Leads</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={handleClickOpen}>
                    New Lead
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Source</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leads.map((lead) => (
                            <TableRow key={lead._id}>
                                <TableCell>
                                    <Box
                                        component="img"
                                        sx={{ height: 32, width: 32, borderRadius: '50%', objectFit: 'cover' }}
                                        src={lead.avatar || 'https://via.placeholder.com/32'}
                                        alt={lead.name}
                                    />
                                </TableCell>
                                <TableCell>{lead.name}</TableCell>
                                <TableCell>{lead.email}</TableCell>
                                <TableCell>{lead.phone}</TableCell>
                                <TableCell>{lead.source}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={lead.status}
                                        color={lead.status === 'won' ? 'success' : lead.status === 'new' ? 'info' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {lead.status !== 'won' && (
                                        <Button
                                            size="small"
                                            endIcon={<ArrowForward />}
                                            onClick={() => handleConvert(lead._id)}
                                        >
                                            Convert
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Phone"
                        fullWidth
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Source</InputLabel>
                        <Select
                            name="source"
                            value={formData.source}
                            label="Source"
                            onChange={handleChange}
                        >
                            <MenuItem value="website">Website</MenuItem>
                            <MenuItem value="referral">Referral</MenuItem>
                            <MenuItem value="social_media">Social Media</MenuItem>
                            <MenuItem value="cold_call">Cold Call</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        name="notes"
                        label="Notes"
                        multiline
                        rows={3}
                        fullWidth
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CRMPage;
