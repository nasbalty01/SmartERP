const asyncHandler = require('express-async-handler');
const Employee = require('../models/employeeModel');
const Attendance = require('../models/attendanceModel');
const User = require('../models/userModel');

// @desc    Get all employees
// @route   GET /api/hr/employees
// @access  Private/Admin/Manager
const getEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find({}).populate('user', 'name email role');
    res.json(employees);
});

// @desc    Create employee profile (needs existing User)
// @route   POST /api/hr/employees
// @access  Private/Admin
const createEmployee = asyncHandler(async (req, res) => {
    const { userId, department, position, salary, joinDate, address, phone } = req.body;

    const employeeExists = await Employee.findOne({ user: userId });

    if (employeeExists) {
        res.status(400);
        throw new Error('Employee profile already exists for this user');
    }

    const employee = await Employee.create({
        user: userId,
        department,
        position,
        salary,
        joinDate,
        address,
        phone,
    });

    res.status(201).json(employee);
});

// @desc    Mark attendance (Check-in)
// @route   POST /api/hr/attendance
// @access  Private
const checkIn = asyncHandler(async (req, res) => {
    const employee = await Employee.findOne({ user: req.user._id });

    if (!employee) {
        res.status(404);
        throw new Error('Employee profile not found');
    }

    // Check if already checked in today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingAttendance = await Attendance.findOne({
        employee: employee._id,
        date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existingAttendance) {
        res.status(400);
        throw new Error('Already checked in today');
    }

    const attendance = await Attendance.create({
        employee: employee._id,
        date: new Date(),
        checkIn: new Date(),
        status: 'present',
    });

    res.status(201).json(attendance);
});

// @desc    Mark attendance (Check-out)
// @route   PUT /api/hr/attendance/checkout
// @access  Private
const checkOut = asyncHandler(async (req, res) => {
    const employee = await Employee.findOne({ user: req.user._id });

    if (!employee) {
        res.status(404);
        throw new Error('Employee profile not found');
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Find today's attendance record
    const attendance = await Attendance.findOne({
        employee: employee._id,
        date: { $gte: startOfDay },
        checkOut: null // Only if not checked out
    });

    if (attendance) {
        attendance.checkOut = new Date();
        const updatedAttendance = await attendance.save();
        res.json(updatedAttendance);
    } else {
        res.status(400);
        throw new Error('No active check-in found for today or already checked out');
    }
});

// @desc    Get attendance history
// @route   GET /api/hr/attendance
// @access  Private
const getAttendance = asyncHandler(async (req, res) => {
    let query = {};
    // If not admin, only show own attendance
    if (req.user.role !== 'admin' && req.user.role !== 'manager') {
        const employee = await Employee.findOne({ user: req.user._id });
        if (!employee) {
            return res.json([]);
        }
        query = { employee: employee._id };
    }

    const attendance = await Attendance.find(query).populate('employee').sort({ date: -1 });
    res.json(attendance);
});

module.exports = {
    getEmployees,
    createEmployee,
    checkIn,
    checkOut,
    getAttendance,
};
