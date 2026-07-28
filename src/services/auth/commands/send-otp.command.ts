import crypto from 'crypto'
import { OTP_EXPIRY_MINUTES } from '../../../constants/index.js'
import { otpRepository } from '../../../repositories/otp.repository.js'
import { mailService } from '../../index.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type SendOtpInput = {
  userId: string
  email: string
  type: string
}

export class SendOtpCommand implements ICommand<SendOtpInput, { message: string }> {
  async execute(input: SendOtpInput) {
    await otpRepository.invalidateUserOtps(input.userId, input.type)

    const code = crypto.randomInt(100000, 999999).toString()
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)

    await otpRepository.create({
      userId: input.userId,
      code,
      type: input.type,
      expiresAt,
    })

    await mailService.commands.sendOtpMail.execute({
      to: input.email,
      code,
      type: input.type,
    })

    return { message: 'OTP sent successfully' }
  }
}
