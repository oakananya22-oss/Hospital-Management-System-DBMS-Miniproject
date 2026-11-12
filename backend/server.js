
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const patientRoutes = require('./routes/patientRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.get('/test', (req, res) => {
    res.send('Server is working correctly!');
});
app.use('/api/patients', patientRoutes);

// Welcome route
app.get('/', (req, res) => {
    res.json({
        message: 'Hospital Management System API is running!'
    });
});

// Database connection test
app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 AS connected');

        res.json({
            server: 'OK',
            database: 'Connected',
            result: rows[0]
        });

    } catch (error) {
        console.error('Database connection error:', error.message);

        res.status(500).json({
            server: 'OK',
            database: 'Disconnected',
            error: error.message
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
