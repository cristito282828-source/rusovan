export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // HeaderRvan + FooterRvan vienen del layout raíz.
  // El carrito usa el ancho completo — sin max-w extra aquí.
  return <>{children}</>;
}
