const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
        company: {
            type: String,
        },
        vatNumber: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        logo: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
