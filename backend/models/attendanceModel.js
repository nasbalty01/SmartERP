const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        checkIn: {
            type: Date,
            required: true,
        },
        checkOut: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['present', 'absent', 'late', 'leave'],
            default: 'present',
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
