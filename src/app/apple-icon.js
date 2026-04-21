import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#619BB6',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '24px',
          padding: '20px',
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: '120px',
            fontWeight: '700',
            lineHeight: 1,
            fontFamily: 'sans-serif',
          }}
        >
          D
        </span>
      </div>
    ),
    { ...size }
  )
}
