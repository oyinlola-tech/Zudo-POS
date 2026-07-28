import { userRepository } from '../../../repositories/user.repository.js';
import { verifyToken, sanitizeUser } from '../../../utils/index.js';
export class GetSessionQuery {
    async execute(input) {
        try {
            const payload = verifyToken(input.token);
            const user = await userRepository.findById(payload.userId);
            if (!user)
                return null;
            return sanitizeUser(user);
        }
        catch {
            return null;
        }
    }
}
//# sourceMappingURL=session.query.js.map