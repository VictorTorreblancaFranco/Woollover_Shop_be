const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sql } = require('../config/db');

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const result = await sql.query`SELECT * FROM Users WHERE email = ${email}`;
    const user = result.recordset[0];
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
};

module.exports = { loginController };
