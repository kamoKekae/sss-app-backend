/**
 * This is a route file
 * Consists of all routes(url's) responsible for querying comment table
 */


const connection = require('../sqlConnection.js');
const express = require('express');

const studentRouter = express.Router();



module.exports = {studentRouter};
