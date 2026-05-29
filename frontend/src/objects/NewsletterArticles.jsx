import articleImg1 from "/articleImg1.jpeg";
import article1 from "/article1.pdf";
import suggestionImg1 from "/suggestionImg1.jpeg";
import suggestion1 from "/suggestion1.docx?url";
import articleImg2 from "/articleImg2.jpeg";
import article2 from "/article2.pdf";
import suggestionImg2 from "/suggestionImg2.jpeg";
import suggestion2 from "/suggestion2.docx?url";

export const newsletterArticles = [
    {
        id: 1,
        category: "AI",
        readTime: "20 min read",
        title: "PAIR Research #1: AI & Psychology - The Baseline",
        datePublished: "2025-12-22",
        dateModified: "2025-12-22",
        shortDescription:
            "This first PAIR literature review explores how AI works, how it affects the human psyche, and how psychology can help us better understand increasingly influential intelligent systems.",
        texts: [
            {
                id: 1,
                text: "The field of AI research is a constantly evolving landscape. New models are released all the time, breaking milestones and changing what we think is possible to achieve with them."
            },
            {
                id: 2,
                text: "Through all of the chaos and sensationalism surrounding the subject, it is important to take a step back and ask: How does AI actually work? What are its impacts on the human psyche? And can psychology actually help us understand the workings of the machine? The first PAIR Literature Review aims to answer these exact questions. By establishing the baseline between psychology and AI research, it is our goal to help our readers better understand this increasingly complex and influential domain."
            },
    
        ],
        date: "12-22-2025",
        image: articleImg1,
        pdf: article1,
        isFeatured: false,
        authors: [
            { name: "PAIR Research Team", title: "" },
        ]
    },

    {
        id: 2,
        category: "AI in Psychotherapy",
        readTime: "25 min read",
        title: "PAIR Research #2: AI in Psychotherapy",
        datePublished: "2025-12-22",
        dateModified: "2025-12-22",
        shortDescription:
            "This second PAIR literature review explores one of today’s most urgent psychotherapy questions: can AI replace therapists? It examines the current relationship between artificial intelligence and psychotherapy by highlighting AI’s strengths, limits, and practical implications.",
        texts: [
            {
                id: 1,
                text: "In line with our recent conference, one of the most pressing questions for current practitioners and students of psychotherapy is: Can AI replace therapists?"
            },
            {
                id: 2,
                text: "The second release of the PAIR literature review aims to address exactly this issue, focusing on the current relationship between artificial intelligence and psychotherapy."
            },
            {
                id: 3,
                text: "By examining AI’s strengths, weaknesses, and our own reflections on the topic, we aim to offer a clear discussion of where psychotherapy currently stands in relation to rapidly developing intelligent systems."
            }
        ],
        date: "12-22-2025",
        image: articleImg2,
        pdf: article2,
        isFeatured: true,
        authors: [
            { name: "PAIR Research Team", title: "" },
        ]
    },

    {
        id: 3,
        category: "Research Tools",
        readTime: "10 min read",
        title: "PAIR Recommends: Research Rabbit",
        datePublished: "2025-12-22",
        dateModified: "2025-12-22",
        shortDescription:
            "Research Rabbit is a tool that helps researchers discover, connect, and track academic papers through dynamic citation networks, making the research process faster, more visual, and easier to manage.",
        texts: [
            {
                id: 1,
                text: "Research Rabbit is a discovery tool designed to help students and researchers explore past studies more effectively. Instead of relying only on traditional search engines or journal browsing, it offers a more connected and visual way to find relevant literature."
            },
            {
                id: 2,
                text: "Its main strength lies in building networks of related papers, citations, and topics through nodes. This allows users to see how studies connect to one another, follow new publications in their area of interest, and even track specific authors over time."
            },
            {
                id: 3,
                text: "Research Rabbit also includes practical features such as note-taking, exporting references in formats like BibTeX or RIS, and sharing collections for collaboration. Overall, it is a useful tool for speeding up literature review, identifying knowledge gaps, and generating new research ideas."
            }
        ],
        date: "12-22-2025",
        image: suggestionImg1,
        pdf: suggestion1,
        isFeatured: false,
        authors: [
            { name: "PAIR Research Team", title: "" },
        ]
    },

    {
        id: 4,
        category: "Research Tools",
        readTime: "10 min read",
        title: "PAIR Recommends: NotebookLM",
        datePublished: "2025-12-22",
        dateModified: "2025-12-22",
        shortDescription:
            "NotebookLM is a research and note-taking tool that helps users organize sources, interact with material through AI, and turn research into practical outputs such as summaries, audio overviews, and study aids.",
        texts: [
            {
                id: 1,
                text: "NotebookLM is presented as a natural follow-up to tools like Research Rabbit: once you have gathered articles, insights, and sources, you still need a way to organize and work with them in a clear and useful format."
            },
            {
                id: 2,
                text: "Developed within Google’s broader AI ecosystem, NotebookLM allows users to collect different kinds of materials, including PDFs, websites, and other sources, and keep them in one place for structured research work."
            },
            {
                id: 3,
                text: "Its interface is built around three main functions: managing sources, chatting with an AI assistant about the collected material, and using the Studio tools to generate outputs such as audio overviews, mind maps, flashcards, and reports."
            },
            {
                id: 4,
                text: "Overall, NotebookLM is a practical and user-friendly tool for researchers and students who want more control over their notes and sources. While privacy and accuracy still require attention, it offers a strong first step toward more personalized and productive AI-supported research workflows."
            }
        ],
        date: "12-22-2025",
        image: suggestionImg2,
        pdf: suggestion2,
        isFeatured: false,
        authors: [
            { name: "NotebookLM", title: "" },
        ]
    }


];