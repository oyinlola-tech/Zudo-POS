import { userRepository } from '../../../repositories/user.repository.js';
import { sanitizeUser } from '../../../utils/index.js';
export class GetProfileQuery {
    async execute(input) {
        const user = await userRepository.findById(input.userId);
        if (!user)
            return null;
        return sanitizeUser(user);
    }
}
//# sourceMappingURL=profile.query.js.map