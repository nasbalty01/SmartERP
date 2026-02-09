const asyncHandler = require('express-async-handler');
const Lead = require('../models/leadModel');
const Customer = require('../models/customerModel');

// @desc    Get all leads
// @route   GET /api/crm/leads
// @access  Private
const getLeads = asyncHandler(async (req, res) => {
    const leads = await Lead.find({}).populate('assignedTo', 'name email');
    res.json(leads);
});

// @desc    Create a lead
// @route   POST /api/crm/leads
// @access  Private
const createLead = asyncHandler(async (req, res) => {
    const { name, email, phone, source, notes, assignedTo } = req.body;

    const lead = await Lead.create({
        name,
        email,
        phone,
        source,
        notes,
        assignedTo: assignedTo || req.user._id,
    });

    res.status(201).json(lead);
});

// @desc    Update lead status
// @route   PUT /api/crm/leads/:id
// @access  Private
const updateLead = asyncHandler(async (req, res) => {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
        lead.status = req.body.status || lead.status;
        lead.assignedTo = req.body.assignedTo || lead.assignedTo;

        const updatedLead = await lead.save();
        res.json(updatedLead);
    } else {
        res.status(404);
        throw new Error('Lead not found');
    }
});

// @desc    Convert Lead to Customer
// @route   POST /api/crm/leads/:id/convert
// @access  Private
const convertLead = asyncHandler(async (req, res) => {
    const lead = await Lead.findById(req.params.id);

    if (lead) {
        if (lead.status === 'won') {
            res.status(400);
            throw new Error('Lead already converted');
        }

        const customerExists = await Customer.findOne({ email: lead.email });

        if (customerExists) {
            res.status(400);
            throw new Error('Customer with this email already exists');
        }

        const customer = await Customer.create({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            createdBy: req.user._id
        });

        lead.status = 'won';
        await lead.save();

        res.status(201).json({ message: 'Lead converted to customer', customer });
    } else {
        res.status(404);
        throw new Error('Lead not found');
    }
});

// @desc    Get all customers
// @route   GET /api/crm/customers
// @access  Private
const getCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find({});
    res.json(customers);
});

// @desc    Create a customer directly
// @route   POST /api/crm/customers
// @access  Private
const createCustomer = asyncHandler(async (req, res) => {
    const { name, email, phone, address, city, country, company, vatNumber } = req.body;

    const customerExists = await Customer.findOne({ email });

    if (customerExists) {
        res.status(400);
        throw new Error('Customer already exists');
    }

    const customer = await Customer.create({
        name,
        email,
        phone,
        address,
        city,
        country,
        company,
        vatNumber,
        createdBy: req.user._id,
    });

    res.status(201).json(customer);
});

module.exports = {
    getLeads,
    createLead,
    updateLead,
    convertLead,
    getCustomers,
    createCustomer,
};
