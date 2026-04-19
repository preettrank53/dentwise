import z from 'zod'

/**
 * @typedef {import('zod').infer<typeof profileSchema>} ProfileData
 */
export const profileSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens and apostrophes'),
  phone: z.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
})

/**
 * @typedef {import('zod').infer<typeof doctorSchema>} DoctorData
 */
export const doctorSchema = z.object({
  name: z.string()
    .min(2, 'Doctor name must be at least 2 characters')
    .max(100, 'Name too long'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email too long'),
  specialty: z.enum([
    'General Dentistry',
    'Orthodontics',
    'Pediatric Dentistry',
    'Dental Implants',
    'Teeth Whitening',
    'Emergency Care',
    'Oral Surgery',
  ], {
    errorMap: () => ({ message: 'Please select a specialty' }),
  }),
  gender: z.enum(['MALE', 'FEMALE'], {
    errorMap: () => ({ message: 'Please select a gender' }),
  }),
  imageURL: z.string()
    .url('Please enter a valid image URL')
    .min(1, 'Image URL is required'),
  bio: z.string()
    .max(500, 'Bio cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),
})

/**
 * @typedef {import('zod').infer<typeof appointmentSchema>} AppointmentData
 */
export const appointmentSchema = z.object({
  doctorId: z.string()
    .min(1, 'Please select a doctor'),
  dateTime: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: 'Invalid date format',
  }).refine(
    (date) => date > new Date(),
    'Appointment must be in the future'
  ),
  reason: z.string()
    .max(500, 'Reason cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),
  note: z.string()
    .max(1000, 'Notes cannot exceed 1000 characters')
    .optional()
    .or(z.literal('')),
})

/**
 * @typedef {import('zod').infer<typeof contactSchema>} ContactData
 */
export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name is required')
    .max(50, 'Name too long'),
  email: z.string()
    .email('Please enter a valid email address'),
  subject: z.string()
    .min(3, 'Subject is required')
    .max(100, 'Subject too long'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message too long'),
})

/**
 * @typedef {import('zod').infer<typeof searchSchema>} SearchFilters
 */
export const searchSchema = z.object({
  search: z.string()
    .max(100, 'Search too long')
    .optional()
    .or(z.literal('')),
  status: z.enum([
    'all',
    'CONFIRMED',
    'COMPLETED',
    'CANCELLED',
  ]).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
})

export function validate(schema, data) {
  const result = schema.safeParse(data)

  if (!result.success) {
    const errors = {}

    result.error.issues.forEach((err) => {
      const path = err.path.join('.')
      if (!errors[path]) {
        errors[path] = err.message
      }
    })

    return { success: false, errors }
  }

  return { success: true, data: result.data }
}
