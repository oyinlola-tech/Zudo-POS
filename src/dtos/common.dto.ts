export type ErrorResponse = { error: string }

export type ValidationErrorResponse = {
  error: string
  details: Record<string, string[] | undefined>
}