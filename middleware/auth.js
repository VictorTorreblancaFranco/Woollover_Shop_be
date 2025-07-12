// middleware/auth.js
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const h = req.headers.authorization;
    if (!h) return res.status(401).json({ message: 'Token faltante' });
    const token = h.split(' ')[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ message: 'Token inválido' });
    }
}

function authorize(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    };
}

module.exports = { authenticate, authorize };
