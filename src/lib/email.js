const DEFAULT_FROM_EMAIL = 'Dentwise <onboarding@resend.dev>'

const EMAIL_ONLY_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const EMAIL_WITH_NAME_REGEX = /^[^<>]+<\s*[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\s*>$/i
const ANY_EMAIL_REGEX = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i

function stripWrappingQuotes(value) {
  if (!value) return ''
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim()
  }
  return trimmed
}

export function getValidResendFromEmail(rawFromEmail) {
  const cleaned = stripWrappingQuotes(rawFromEmail)

  if (!cleaned) {
    return DEFAULT_FROM_EMAIL
  }

  if (EMAIL_ONLY_REGEX.test(cleaned) || EMAIL_WITH_NAME_REGEX.test(cleaned)) {
    return cleaned
  }

  const emailMatch = cleaned.match(ANY_EMAIL_REGEX)
  if (!emailMatch) {
    return DEFAULT_FROM_EMAIL
  }

  const email = emailMatch[1]
  const name = cleaned
    .replace(email, '')
    .replace(/[<>"']/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (!name) {
    return email
  }

  return `${name} <${email}>`
}
