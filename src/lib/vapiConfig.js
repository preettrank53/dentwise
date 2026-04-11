export const VAPI_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY,
  assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
}

export const RILEY_INFO = {
  name: 'Riley',
  role: 'AI Dental Assistant',
  avatar: null, // To be implemented via visual generative asset components
  description: 'Your personal AI dental assistant, available 24/7',
}

export function getStatusMessage(status) {
  switch (status) {
    case 'idle':
      return 'Ready to chat'
    case 'connecting':
      return 'Connecting to Riley...'
    case 'active':
      return 'Call in progress'
    case 'ending':
      return 'Ending call...'
    default:
      return 'Ready to chat'
  }
}

export function getRoleLabel(role) {
  switch (role) {
    case 'user':
      return 'You'
    case 'assistant':
      return 'Riley'
    default:
      return role
  }
}
