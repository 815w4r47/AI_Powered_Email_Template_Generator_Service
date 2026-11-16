const express = require('express');
const { createEmailTemplate } = require('../controllers/emailTemplateController');

const router = express.Router();
router.post('/', createEmailTemplate);

module.exports = router;
