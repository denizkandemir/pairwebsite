import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const useFadeInOnScroll = (selector = '.fade-in, .fade-in-left, .fade-in-right', shouldRun = true) => {
  const { routeId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!shouldRun) return;

    const elements = document.querySelectorAll(selector);

    if (elements.length > 0) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.26 }
      );

      elements.forEach((element) => observer.observe(element));

      return () => observer.disconnect();
    }
  }, [selector, routeId, location, shouldRun]);
};

export default useFadeInOnScroll;
