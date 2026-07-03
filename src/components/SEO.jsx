import { useEffect } from 'react';

const SEO = ({ title, description, keywords }) => {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = `${title} | Divine Dwellings`;
    }

    // Helper function to set or update meta tag content
    const updateMetaTag = (name, value, isProperty = false) => {
      if (!value) return;
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // 2. Update Description
    updateMetaTag('description', description);
    updateMetaTag('og:description', description, true);
    updateMetaTag('twitter:description', description, true);

    // 3. Update Keywords
    updateMetaTag('keywords', keywords);

    // 4. Update Titles for OG/Twitter
    if (title) {
      updateMetaTag('og:title', `${title} | Divine Dwellings`, true);
      updateMetaTag('twitter:title', `${title} | Divine Dwellings`, true);
    }
  }, [title, description, keywords]);

  return null; // This component doesn't render any visible UI
};

export default SEO;
