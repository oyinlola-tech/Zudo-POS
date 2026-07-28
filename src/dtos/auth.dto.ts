export type RegisterRequest = {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  businessName?: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type ForgotPasswordRequest = { email: string }

export type ResetPasswordRequest = {
  email: string
  otp: string
  newPassword: string
}

export type ChangePasswordRequest = {
  currentPassword: string
  newPassword: string
}

export type SendOtpRequest = {
  email: string
  type: 'password_reset' | 'pin_reset' | 'pin_change' | 'email_verification'
}

export type VerifyOtpRequest = {
  email: string
  code: string
  type: 'password_reset' | 'pin_reset' | 'pin_change' | 'email_verification'
}

export type ChangePinRequest = {
  currentPin: string
  newPin: string
}

export type ForgotPinRequest = {
  email: string
  otp: string
  newPin: string
}

export type SetupPinRequest = { pin: string }

export type AdminChangeStaffPinRequest = {
  staffId: string
  newPin: string
}

export type AuthResponse = {
  token: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
    businessId: string | null
  }
}

export type MessageResponse = { message: string }

export type SessionResponse = {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
    businessId: string | null
  } | null
}