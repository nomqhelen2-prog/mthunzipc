import { useEffect } from 'react';

const SITE_NAME = 'Mthunzi Project Consultants';

/**
 * Sets the document title (and optionally the meta description) for the
 * current page. Each route needs its own title now that sections have
 * become separate pages, both for SEO and for browser tab / bookmark clarity.
 */
const usePageMeta = (title, description) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    let previousDescription;
    let metaDescriptionTag;

    if (description) {
      metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (metaDescriptionTag) {
        previousDescription = metaDescriptionTag.getAttribute('content');
        metaDescriptionTag.setAttribute('content', description);
      }
    }

    return () => {
      document.title = previousTitle;
      if (metaDescriptionTag && previousDescription !== undefined) {
        metaDescriptionTag.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
};

export default usePageMeta;
