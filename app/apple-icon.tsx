import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const runtime = 'nodejs';

/**
 * Apple Touch Icon (180×180) — aparece en iOS al "Añadir a inicio".
 * Replica el logo RV sobre fondo crema.
 */
export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FBF7EE',
          backgroundImage:
            'radial-gradient(circle at 50% 40%, #FBF7EE 0%, #F2EBDA 100%)',
        }}
      >
        <span
          style={{
            fontFamily: 'serif',
            fontWeight: 700,
            fontSize: 110,
            color: '#3A2418',
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          RV
        </span>
      </div>
    ),
    { ...size }
  );
}
