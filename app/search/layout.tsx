import ChildrenWrapper from './children-wrapper';
import { Suspense } from 'react';

/**
 * Layout /search · pass-through.
 *
 * HeaderRvan + FooterRvan los aporta el layout raíz (app/layout.tsx),
 * por lo que aquí solo envolvemos children en un Suspense.
 */
export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Suspense>
  );
}
