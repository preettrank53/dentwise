export function handlePrismaError(error) {
  // Unique constraint violation
  if (error?.code === 'P2002') {
    const field = error?.meta?.target?.[0]
    const fieldNames = {
      email: 'email address',
      phone: 'phone number',
    }
    const fieldLabel = fieldNames[field] || 'value'
    return `This ${fieldLabel} is already registered`
  }

  // Record not found
  if (error?.code === 'P2025') {
    return 'Record not found'
  }

  // Foreign key constraint
  if (error?.code === 'P2003') {
    return 'Related record not found'
  }

  // Connection error
  if (error?.code === 'P1001') {
    return 'Database connection failed. Please try again.'
  }

  // Timeout
  if (error?.code === 'P1008') {
    return 'Request timed out. Please try again.'
  }

  return error?.message || 'Something went wrong'
}