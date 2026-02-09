const express = require('express');
const router = express.Router();
const {
    createInvoice,
    getInvoices,
    getInvoiceById,
    payInvoice,
} = require('../controllers/accountingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/invoices').get(protect, getInvoices).post(protect, createInvoice);
router.route('/invoices/:id').get(protect, getInvoiceById);
router.route('/invoices/:id/pay').put(protect, payInvoice);

module.exports = router;
