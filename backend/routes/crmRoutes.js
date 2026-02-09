const express = require('express');
const router = express.Router();
const {
    getLeads,
    createLead,
    updateLead,
    convertLead,
    getCustomers,
    createCustomer,
} = require('../controllers/crmController');
const { protect } = require('../middleware/authMiddleware');

router.route('/leads').get(protect, getLeads).post(protect, createLead);
router.route('/leads/:id').put(protect, updateLead);
router.route('/leads/:id/convert').post(protect, convertLead);

router.route('/customers').get(protect, getCustomers).post(protect, createCustomer);

module.exports = router;
