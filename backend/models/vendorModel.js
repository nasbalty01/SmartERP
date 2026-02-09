const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema(
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
        address: {
            type: String,
        },
        company: {
            type: String,
        },
        website: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
