import { userRepository } from '../../../repositories/user.repository.js'
import { SendOtpCommand } from './send-otp.command.js'
import type { ICommand } from '../../../interfaces/service.interface.js'

export type ForgotPasswordInput = { email: string }

export class ForgotPasswordCommand
  implements ICommand<ForgotPasswordInput, { message: string }>
{
  async execute(input: ForgotPasswordInput) {
    const user = await userRepository.findByEmail(input.email)
    if (!user) {
      return { message: 'If the email exists, an OTP has been sent' }
    }

    await new SendOtpCommand().execute({
      userId: user.id,
      email: user.email,
      type: 'password_reset',
    })

    return { message: 'If the email exists, an OTP has been sent' }
  }
}
