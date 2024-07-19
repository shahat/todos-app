const { isEmail, escape } = require('validator'); // Use validator for email validation and escaping

const filterMiddleware = (req, res, next) => {
    const { body } = req; // Access request body
    // Check if request body contains expected properties
    if (!body || !('email' in body) || !('password' in body)) {
        return res.status(400).json({ error: 'Invalid request body. Requires email and password properties.' });
    }

    // Sanitize email and password using validator.escape()
    req.body.email = escape(body.email);
    req.body.password = escape(escape(body.password)); // Double escape for enhanced protection

    // Validate email format using validator.isEmail()
    if (!isEmail(req.body.email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Restrict special characters in password (optional):
    const allowedChars = /^[a-zA-Z0-9!@#$%^&*()_+-=]+$/;
    if (!allowedChars.test(req.body.password)) {
        return res.status(400).json({ error: 'Password can only contain letters, numbers, and some special characters.' });
    }

    next(); // Allow request to proceed if valid
};

module.exports = filterMiddleware;