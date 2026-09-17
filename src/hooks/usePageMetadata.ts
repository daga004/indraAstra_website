import { useEffect } from 'react';

export function usePageMetadata(title: string, description: string): void {
  useEffect(() => {
    document.title = title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    const ogDescriptionTag = document.querySelector('meta[property="og:description"]');

    descriptionTag?.setAttribute('content', description);
    ogTitleTag?.setAttribute('content', title);
    ogDescriptionTag?.setAttribute('content', description);
  }, [description, title]);
}
