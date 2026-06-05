/**
 * Global error handling middleware.
 * Must be registered LAST in app.js (after all routes).
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
    // Determine status code
    const statusCode = err.statusCode || err.status || 500;

    // Log error server-side (always log 5xx, log 4xx only in dev)
    if (statusCode >= 500) {
        console.error(`[ERROR] ${req.method} ${req.url}:`, err);
    } else if (process.env.NODE_ENV !== 'production') {
        console.error(`[WARN] ${req.method} ${req.url}:`, err.message);
    }

    // Multer file filter errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ message: 'File too large. Maximum size is 5MB.' });
    }

    if (err.message && err.message.includes('Only PDF files')) {
        return res.status(415).json({ message: err.message });
    }

    // Mongoose validation errors
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ message: messages.join('. ') });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0] || 'field';
        return res.status(400).json({ message: `An account with this ${field} already exists.` });
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID format.' });
    }

    // Default error response — never expose stack in production
    return res.status(statusCode).json({
        message: statusCode >= 500 && process.env.NODE_ENV === 'production'
            ? 'An unexpected error occurred. Please try again later.'
            : err.message || 'Internal server error',
    });
}

module.exports = { errorHandler };
