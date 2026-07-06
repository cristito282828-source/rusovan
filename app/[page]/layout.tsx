export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // HeaderRvan + FooterRvan vienen del layout raíz.
  return <>{children}</>;
}
