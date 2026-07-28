import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../constants/app.constants.js';
const signOptions = { expiresIn: JWT_EXPIRES_IN };
export function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, signOptions);
}
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}
//# sourceMappingURL=jwt.util.js.map