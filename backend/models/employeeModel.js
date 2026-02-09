const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        department: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        joinDate: {
            type: Date,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        avatar: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
