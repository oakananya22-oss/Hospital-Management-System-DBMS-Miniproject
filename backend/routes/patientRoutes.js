
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all patients
router.get('/', async (req, res) => {
    try {
        const [patients] = await db.query(
            'SELECT * FROM patient'
        );

        res.json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching patients' });
    }
});

module.exports = router;
