const { generateEmailTemplate } = require('../services/emailTemplateService');

const MAX_FIELD_LENGTH = 2000;

function validateRequest(body) {
  const errors = [];
  for (const field of ['purpose', 'recipient_name', 'tone']) {
    const value = body?.[field];
    if (typeof value !== 'string' || !value.trim()) {
      errors.push(`${field} is required and must be a non-empty string.`);
    } else if (value.trim().length > MAX_FIELD_LENGTH) {
      errors.push(`${field} must be ${MAX_FIELD_LENGTH} characters or fewer.`);
    }
  }
  return errors;
}

async function createEmailTemplate(req, res, next) {
  const errors = validateRequest(req.body);
  if (errors.length) {
    return res.status(400).json({ error: 'Invalid request body.', details: errors });
  }

  try {
    const result = await generateEmailTemplate({
      purpose: req.body.purpose.trim(),
      recipient_name: req.body.recipient_name.trim(),
      tone: req.body.tone.trim(),
    });
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = { createEmailTemplate };
