// Npm Packages
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');

// Models
const Question = require('../models/Question');

// Local functions
const logger = require('../logger');

dotenv.config();

// Create a Question
// @ts-ignore


module.exports = router;