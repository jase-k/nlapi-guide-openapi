const express = require('express');
const router = express.Router();
const {
  handleSlackWebhook,
  handleSlackCallback,
} = require('../controllers/slackController');

// Route to handle incoming Slack webhooks
router.post('/slack/webhook', handleSlackWebhook);

router.get('/slack/callback', handleSlackCallback);

module.exports = router;
