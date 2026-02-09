const express = require('express');
const router = express.Router();
const {
    getEmployees,
    createEmployee,
    checkIn,
    checkOut,
    getAttendance,
} = require('../controllers/hrController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/employees').get(protect, getEmployees).post(protect, authorize('admin', 'manager'), createEmployee);

router.route('/attendance').get(protect, getAttendance).post(protect, checkIn);
router.route('/attendance/checkout').put(protect, checkOut);

module.exports = router;
