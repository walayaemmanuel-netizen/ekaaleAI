'use strict';

// Health check controller
exports.healthCheck = (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString()  // Current UTC timestamp
    });
};
