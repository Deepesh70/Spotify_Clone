const jwt = require('jsonwebtoken');

function getToken(email, user) {
    const token = jwt.sign(
        { sub: user._id, email: email },
        "secret", // Use process.env.JWT_SECRET in production
        { expiresIn: "7d" }
    );
    return token;
}

module.exports = { getToken };