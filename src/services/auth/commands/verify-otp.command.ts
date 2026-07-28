import { otpRepository } from '../../../repositories/otp.repository.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type VerifyOtpInput = {
  userId: string
  code: string
  type: string
}

export class VerifyOtpCommand
  implements ICommand<VerifyOtpInput, { valid: boolean }>
{
  async execute(input: VerifyOtpInput) {
    const otp = await otpRepository.findValid(
      input.userId,
      input.code,
      input.type,
    )

    if (!otp) return { valid: false }

    await otpRepository.markUsed(otp.id)
    return { valid: true }
  }
}
