import { useEffect } from 'react';
import useSiteUrlQuery from './queries/useSiteUrlQuery';

export default function useScrollLocking() {
  const data = useSiteUrlQuery();
  const siteUrl = data.site.siteMetadata.siteUrl;

  useEffect(() => {
    (async () => await fetch(`${siteUrl}/api/visit`))();
  }, [siteUrl]);
}
