import { shiftRepository } from '../../../repositories/shift.repository.js';
export class GetShiftHistoryQuery {
    async execute(input) {
        return shiftRepository.findByUser(input.userId);
    }
}
//# sourceMappingURL=get-shift-history.query.js.map