const mongoose = require('mongoose');

const leadSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            enum: ['website', 'referral', 'social_media', 'cold_call', 'other'],
            default: 'website',
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'qualified', 'lost', 'won'],
            default: 'new',
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        notes: {
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

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
