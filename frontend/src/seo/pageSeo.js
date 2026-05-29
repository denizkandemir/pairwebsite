import { SITE, buildArticleSchema, buildBreadcrumbSchema, buildEventSchema, pageSeo } from './siteSeo';

export const buildArticlePageSeo = (article) => {
    const path = `/newsletter/${article.id}`;

    return {
        title: `${article.title} | PAIR Research Lab`,
        description: article.shortDescription,
        path,
        image: article.image,
        type: 'article',
        keywords: [article.category, 'psychology AI research', 'research article', 'PAIR Research Lab'],
        breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Articles', path: '/newsletter' },
            { name: article.title, path },
        ],
        schemas: [{
                key: `breadcrumbs-article-${article.id}`,
                data: buildBreadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Articles', path: '/newsletter' },
                    { name: article.title, path },
                ])
            },
            { key: `article-${article.id}`, data: buildArticleSchema(article, path) },
        ],
    };
};

export const buildEventPageSeo = (event) => {
    const path = `/events/${event.id}`;

    return {
        title: `${event.title} | PAIR Research Lab`,
        description: event.cardTextShort || event.cardText || SITE.description,
        path,
        image: event.imgs && event.imgs.length ? event.imgs[0].url : SITE.imageUrl,
        type: 'website',
        keywords: [event.type, 'psychology event', 'AI event', 'University of Warsaw'],
        breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Events', path: '/events' },
            { name: event.title, path },
        ],
        schemas: [{
                key: `breadcrumbs-event-${event.id}`,
                data: buildBreadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Events', path: '/events' },
                    { name: event.title, path },
                ])
            },
            { key: `event-${event.id}`, data: buildEventSchema(event, path) },
        ],
    };
};

export { SITE, pageSeo };