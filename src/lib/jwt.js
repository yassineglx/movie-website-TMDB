import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' /**60*60*24*30    30days*/ });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

