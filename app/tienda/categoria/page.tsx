import { permanentRedirect } from 'next/navigation';

/**
 * /tienda/categoria · obsoleto.
 * Mantenemos la URL viva pero llevamos al usuario al nuevo catálogo en /search.
 * HeaderRvan + FooterRvan vienen del layout raíz.
 */
export default function TiendaCategoriaPage() {
  permanentRedirect('/search');
}
