import { permanentRedirect } from 'next/navigation';

/**
 * /tienda/categoria/[collection] · obsoleto.
 * Redirigimos al nuevo path /search/[collection].
 * HeaderRvan + FooterRvan vienen del layout raíz.
 */
export default async function TiendaCategoriaCollectionPage(props: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await props.params;
  permanentRedirect(`/search/${collection}`);
}
