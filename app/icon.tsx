import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';
export const runtime = 'nodejs';

/**
 * Favicon pequeño (32×32) generado por Next a partir del logo RV.
 * Usa el archivo real /public/logo-rv.png recortado al centro.
 */
export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FBF7EE', // crema del logo RV
          backgroundImage:
            'radial-gradient(circle at 50% 50%, #FBF7EE 0%, #F2EBDA 100%)',
        }}
      >
        {/* RV en serif marrón chocolate como marca visual del favicon. */}
        <span
          style={{
            fontFamily: 'serif',
            fontWeight: 700,
            fontSize: 22,
            color: '#3A2418',
            letterSpacing: '-0.04em',
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
