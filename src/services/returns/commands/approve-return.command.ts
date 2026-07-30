import { returnsRepository } from '../../../repositories/index.js'
import { createAuditLog } from '../../../models/AdminAuditLog.model.js'
import type { ICommand } from '../../../interfaces/index.js'

export type ApproveReturnInput = { id: string; userId?: string; ip?: string; userAgent?: string }

export class ApproveReturnCommand implements ICommand<ApproveReturnInput, { message: string }> {
  async execute(input: ApproveReturnInput) {
    const ret = await returnsRepository.findById(input.id)
    if (!ret) throw new Error('Return not found')
    if (ret.status !== 'PENDING') throw new Error('Return is not pending')
    await returnsRepository.updateStatus(input.id, 'APPROVED')
    if (input.userId) {
      await createAuditLog({ userId: input.userId, action: 'RETURN', entity: 'Return', entityId: input.id, details: 'Return approved', ip: input.ip, userAgent: input.userAgent })
    }
    return { message: 'Return approved' }
  }
}
