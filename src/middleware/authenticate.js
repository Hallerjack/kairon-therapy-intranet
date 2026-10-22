const jwt = require('jsonwebtoken');
const db = require('../config/db');

module.exports = async (req, res, next) => {
  // Cookie httpOnly tiene prioridad; cabecera Bearer como respaldo (APIs/herramientas)
  let token = req.cookies?.token;
  if (!token) {
    const header = req.headers.authorization;
    if (header && header.startsWith('Bearer ')) {
      token = header.slice(7);
    }
  }
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }

  // Un usuario desactivado pierde el acceso de inmediato, aunque su token siga vigente
  try {
    const [rows] = await db.query('SELECT activo FROM usuario WHERE id_usuario = ?', [payload.id_usuario]);
    if (!rows.length || !rows[0].activo) {
      return res.status(401).json({ error: 'Usuario inactivo' });
    }
  } catch (err) {
    return next(err);
  }

  req.user = payload;
  next();
};
