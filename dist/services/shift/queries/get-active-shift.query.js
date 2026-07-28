import { shiftRepository } from '../../../repositories/shift.repository.js';
export class GetActiveShiftQuery {
    async execute(input) {
        return shiftRepository.findActiveByUser(input.userId);
    }
}
//# sourceMappingURL=get-active-shift.query.js.map