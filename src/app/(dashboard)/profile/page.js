import ProfileClient from './ProfileClient'

export const metadata = {
  title: 'Profile',
  description: 'Manage your Dentwise profile and account settings.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ProfilePage() {
  return <ProfileClient />
}
