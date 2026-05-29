export const SITE = {
    name: 'PAIR Research Lab',
    shortName: 'PAIR',
    url: 'https://sknpair.com',
    logoUrl: 'https://sknpair.com/logo.png',
    imageUrl: 'https://sknpair.com/logo.png',
    faviconUrl: 'https://sknpair.com/favicon.ico',
    appleTouchIconUrl: 'https://sknpair.com/apple-touch-icon.png',
    description: 'PAIR Research Lab at the Faculty of Psychology, University of Warsaw shares psychology and AI research, academic events, and research communication.',
    keywords: [
        'PAIR Research Lab',
        'psychology and artificial intelligence',
        'University of Warsaw',
        'Faculty of Psychology',
        'psychology research',
        'AI research',
        'human-AI interaction',
        'cognitive science',
        'academic events',
        'research communication',
    ],
    email: 'sknpair@uw.edu.pl',
    areaServed: 'Poland',
    sameAs: [
        'https://www.instagram.com/pair.skn/',
        'https://www.linkedin.com/in/sknpair/',
        'https://www.facebook.com/share/17gu58MeTJ/',
    ],
    parentOrganization: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Warsaw',
        url: 'https://en.uw.edu.pl/',
    },
    department: {
        '@type': 'Organization',
        name: 'Faculty of Psychology, University of Warsaw',
        url: 'https://psych.uw.edu.pl/',
    },
    foundingLocation: {
        '@type': 'Place',
        name: 'Faculty of Psychology, University of Warsaw',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Warsaw',
            addressCountry: 'PL',
        },
    },
};

export const normalizePath = (path = '/') => {
    if (!path) return '/';

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return cleanPath === '/' ? '/' : cleanPath.replace(/\/+$/, '');
};

export const absoluteUrl = (pathOrUrl = '/') => {
    if (!pathOrUrl) return SITE.url;
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    return new URL(normalizePath(pathOrUrl), SITE.url).toString();
};

export const toKeywordString = (keywords = []) => keywords.filter(Boolean).join(', ');

export const buildBreadcrumbSchema = (crumbs = []) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
    })),
});

export const buildOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logoUrl,
    image: SITE.imageUrl,
    description: SITE.description,
    foundingLocation: SITE.foundingLocation,
    parentOrganization: SITE.parentOrganization,
    department: SITE.department,
    sameAs: SITE.sameAs,
    email: SITE.email,
    areaServed: SITE.areaServed,
    keywords: toKeywordString(SITE.keywords),
});

export const buildWebsiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
});

export const buildArticleSchema = (article, path) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    author: (article.authors || []).map((author) => ({
        '@type': 'Person',
        name: author.name,
    })),
    publisher: {
        '@type': 'ResearchOrganization',
        name: SITE.name,
        url: SITE.url,
        logo: {
            '@type': 'ImageObject',
            url: SITE.logoUrl,
        },
    },
    image: [absoluteUrl(article.image)],
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    mainEntityOfPage: absoluteUrl(path),
});

export const buildEventSchema = (event, path) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.startDate,
    location: {
        '@type': 'Place',
        name: event.location,
    },
    organizer: {
        '@type': 'ResearchOrganization',
        name: SITE.name,
        url: SITE.url,
    },
    description: event.cardText || event.cardTextShort || (event.texts && event.texts.length ? event.texts[0].text : SITE.description),
    image: event.imgs && event.imgs.length ? [absoluteUrl(event.imgs[0].url)] : [SITE.imageUrl],
    url: absoluteUrl(path),
});

export const pageSeo = {
    home: {
        title: 'PAIR Research Lab | Psychology & AI Research | UW',
        description: 'PAIR Research Lab at the Faculty of Psychology, University of Warsaw shares psychology and AI research, academic events, and research communication.',
        path: '/',
        image: SITE.imageUrl,
        keywords: [
            'psychology AI research',
            'University of Warsaw research lab',
            'Faculty of Psychology',
            'human-AI interaction',
            'academic events',
        ],
        breadcrumbs: [{ name: 'Home', path: '/' }],
    },
    about: {
        title: 'About PAIR Research Lab | Faculty of Psychology, UW',
        description: 'Meet PAIR Research Lab at the University of Warsaw: a psychology and AI research community advancing cognitive science, collaboration, and academic communication.',
        path: '/aboutUs',
        image: SITE.imageUrl,
        keywords: ['About PAIR', 'Faculty of Psychology', 'University of Warsaw', 'cognitive science'],
        breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'About', path: '/aboutUs' },
        ],
    },
    events: {
        title: 'PAIR Events | Psychology & AI Research Talks | UW',
        description: 'Explore PAIR academic events at the University of Warsaw, including psychology and AI lectures, research discussions, and community workshops.',
        path: '/events',
        image: SITE.imageUrl,
        keywords: ['academic events', 'psychology lectures', 'AI talks', 'University of Warsaw'],
        breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Events', path: '/events' },
        ],
    },
    newsletter: {
        title: 'PAIR Articles | Psychology & AI Research Insights',
        description: 'Read PAIR articles on psychology, artificial intelligence, research tools, and academic updates from the Faculty of Psychology, University of Warsaw.',
        path: '/newsletter',
        image: SITE.imageUrl,
        keywords: ['psychology articles', 'AI research insights', 'research communication', 'academic updates'],
        breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Articles', path: '/newsletter' },
        ],
    },
    contact: {
        title: 'Contact PAIR Research Lab | University of Warsaw',
        description: 'Contact PAIR Research Lab for collaboration, academic events, research communication, and psychology and AI project opportunities at the University of Warsaw.',
        path: '/contact',
        image: SITE.imageUrl,
        keywords: ['contact PAIR', 'collaboration', 'research communication', 'University of Warsaw'],
        breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
        ],
    },
};