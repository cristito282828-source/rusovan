import clsx from 'clsx';
import Image from 'next/image';

type LogoRvanProps = {
  variant?: 'dark' | 'light' | 'cream';
  className?: string;
  withWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xl2';
};

const SIZES = {
  sm: 40,
  md: 56,
  lg: 72,
  xl: 96,
  xl2: 120,
};

/**
 * Logo Rvan · monograma RV clásico, solo PNG (sin wordmark al lado).
 * Usa el archivo real que dejó el cliente en /public/logo-rv.png.
 *
 * El logo se muestra solo — sin el wordmark "rvan" pegado al lado.
 * Para resaltarlo más en header, `size` default es `lg` (72px).
 */
export default function LogoRvan({
  variant = 'cream',
  className,
  withWordmark = false, // default: false → sin wordmark
  size = 'lg', // default más grande
}: LogoRvanProps) {
  const dim = SIZES[size];
  const isLight = variant === 'light';

  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <Image
        src="/logo-rv.png"
        alt="Rvan"
        width={dim}
        height={dim}
        priority
        className={clsx(
          'h-auto w-auto shrink-0',
          isLight && 'brightness-0 invert'
        )}
        style={{ height: `${dim}px`, width: `${dim}px` }}
      />

      {withWordmark && (
        <span
          className={clsx(
            'font-belleza font-normal leading-none tracking-tight',
            size === 'sm' && 'text-base',
            size === 'md' && 'text-lg',
            size === 'lg' && 'text-2xl',
            size === 'xl' && 'text-3xl',
            size === 'xl2' && 'text-4xl'
          )}
          style={{ color: isLight ? '#FFFFFF' : '#3A2418' }}
        >
          rvan
        </span>
      )}
    </div>
  );
}
