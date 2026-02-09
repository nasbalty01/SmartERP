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

const HRPage = () => {
    const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        user: '', // Should be User ID
        department: '',
        position: '',
        salary: ''
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const { data } = await api.get('/hr/employees');
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
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
            await api.post('/hr/employees', formData);
            fetchEmployees();
            handleClose();
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Failed to add employee (User ID likely invalid or duplicate)');
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">Employees</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={handleClickOpen}>
                    Add Employee
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Joined</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow key={emp._id}>
                                <TableCell>
                                    <Box
                                        component="img"
                                        sx={{ height: 32, width: 32, borderRadius: '50%', objectFit: 'cover' }}
                                        src={emp.avatar || 'https://via.placeholder.com/32'}
                                        alt={emp.user?.name}
                                    />
                                </TableCell>
                                <TableCell>{emp.user?.name || 'N/A'}</TableCell>
                                <TableCell>{emp.department}</TableCell>
                                <TableCell>{emp.position}</TableCell>
                                <TableCell>${emp.salary}</TableCell>
                                <TableCell>{new Date(emp.joinDate).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Employee</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="user"
                        label="User ID"
                        fullWidth
                        value={formData.user}
                        onChange={handleChange}
                        helperText="Link to existing User ID"
                    />
                    <TextField
                        margin="dense"
                        name="department"
                        label="Department"
                        fullWidth
                        value={formData.department}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="position"
                        label="Position"
                        fullWidth
                        value={formData.position}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="salary"
                        label="Salary"
                        type="number"
                        fullWidth
                        value={formData.salary}
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

export default HRPage;
