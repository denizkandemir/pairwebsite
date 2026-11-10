import conferenceImage1 from "/pairConferencePic.JPEG";
import eventSpeakerImg1 from "/eventSpeakerImg1.png";
import eventImage2 from "/eventImg2.jpeg";
import eventSpeakerImg2 from "/eventSpeakerImg2.jpg";
import eventSpeakerImg3 from "/eventSpeakerImg3.jpg";
import eventSpeakerImg4 from "/eventSpeakerImg4.png";
import eventSpeakerImg5 from "/eventSpeakerImg5.jpg";
import eventSpeakerImg6 from "/eventSpeakerImg6.webp";
import previousEvent1 from "/pairPreviousEvent1.png";
import previousEventImg2 from "/aboutUsModulePicture2.jpg";
import previousEvent2 from "/pairPreviousEvent2.png";
import previousEvent3 from "/pairPreviousEvent3.png";
import previousEvent4 from "/pairPreviousEvent4.png";
import previousEvent_2_Speaker from "/pairPreviousEvent_2_Speaker.jpg";
import previousEvent_3_Speaker from "/pairPreviousEvent_3_Speaker.jpg";
import previousEvent_4_Speaker from "/pairPreviousEvent_4_Speaker.jpg";
import speakerSvg from "/speaker.png";

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const allEvents = [
    {
        id: 1,
        imgs: [
            { id: 1, url: eventImage2 },
            { id: 2, url: conferenceImage1 },
         ],
        title: "Rethinking AI in Psychotherapy",
        startDate: "2026-04-11T10:00:00+02:00",
        organizer: "PAIR Research Lab",
        cardText: "The 1st National PAIR Conference explores the intersection of psychology and artificial intelligence through lectures, discussion, and research. This free event covers ethics, human–AI relationships, and the role of AI in psychological practice.",
        cardTextShort: "The 1st National PAIR Conference explores the intersection of psychology and artificial intelligence through lectures, discussion, and research.",

        texts: [
            {
                id: 1,
                text: `The 1st National PAIR Conference, Rethinking AI in Psychotherapy, is the only event of its kind to bring together psychology and artificial intelligence. Through a course of 4 expert lectures, a panel discussion with researchers specializing in multiple domains of psychology, and a poster session presenting PhD and student research, we will be covering topics such as:`
            },
            {
                id: 2,
                text: ` - The ethics of using AI in psychotherapy.`
            },
            {
                id: 3,
                text: ` - The differences between AI and human relationships.`
            },
            {
                id: 4,
                text: ` -  Failure modes of AI in psychological practice.`
            },
            {
                id: 5,
                text: ` - How AI can be utilized to analyze clinically important patterns.`
            },
            {
                id: 6,
                text: `And many, many others, aiming to help you keep up with the ever-evolving world of artificial intelligence. We invite everybody to join us for an inspiring day of discussion, research, and innovation at the intersection of AI and psychology. The event is entirely free, so we hope to see you there.`
            }
        ],
        date: formatDate("2026-04-11T18:00:00"),
        type: "Event",
        startTime: "10.00 AM",
        location: "Faculty of Psychology, University of Warsaw",
        speakers: [
            {
                id: 1,
                name: "Artur Wiśniewski, PhD",
                img: eventSpeakerImg2,
                title: "Psychiatrist, CBT Therapist and Supervisor",
                university: "Institute of Psychiatry and Neurology, Warsaw",
                bio: "Dr. Artur Wiśniewski is a psychiatrist and certified cognitive behavioral therapist with extensive clinical and teaching experience. His work combines psychiatry, child and adolescent mental health, and CBT training, with a growing focus on how AI can be applied responsibly in psychotherapy and clinical practice.",
                interests: [
                    "Cognitive Behavioral Therapy",
                    "Child & Adolescent Psychiatry",
                    "AI in Psychotherapy"
                ]
            },
            {
                id: 2,
                name: "Beata Rajba",
                img: eventSpeakerImg3,
                title: "Psychologist, Philologist and Lecturer",
                university: "Collegium Witelona State University",
                bio: "Dr. Beata Rajba studies how adolescents and young adults function in digital environments, especially in relation to chatbots, deepfakes, and AI-mediated emotional support. Her work examines why people anthropomorphize AI and how pseudo-therapeutic relationships with chatbots differ from human contact.",
                interests: [
                    "Digital Psychology",
                    "Human–AI Relationships",
                    "Cyberbullying & Deepfakes"
                ]
            },
            {
                id: 3,
                name: "Dr Paweł Szczęsny",
                img: eventSpeakerImg4,
                title: "Psychologist, Biologist and AI Researcher",
                university: "University of Warsaw & Polish Academy of Sciences",
                bio: "Dr. Paweł Szczęsny works at the intersection of cognitive science, AI safety, and human–AI interaction. His research explores how AI-mediated systems influence judgment, trust, and decision-making, with particular attention to failure modes in psychological support chatbots and safer AI design.",
                interests: [
                    "AI Safety Evaluation",
                    "Human–AI Interaction",
                    "Mental Health Support Systems"
                ]
            },
            {
                id: 4,
                name: "Dr Wouter de Raad",
                img: eventSpeakerImg5,
                title: "Researcher in Cultural and Social Dynamics",
                university: "Lecturer and Researcher at the University of Warsaw",
                bio: "Dr. Wouter de Raad’s work focuses on multicultural integration, conflict, and culture change. His publications suggest a strong interest in theoretical and computational approaches to social dynamics, especially how cultural attitudes and group relations evolve over time.",
                interests: [
                    "Multicultural Integration",
                    "Conflict Dynamics",
                    "Culture Change"
                ]
            },
            {
                id: 5,
                name: "Dr Ewa Malinowska",
                img: eventSpeakerImg6,
                title: "Lecturer and Neuropsychology Researcher",
                university: "Faculty of Psychology, University of Warsaw",
                bio: "Dr. Ewa Malinowska is affiliated with the Faculty of Psychology at the University of Warsaw and works in clinical neuropsychology. Her research and teaching focus on ecological diagnosis and rehabilitation of executive functions in both children and adults, including healthy populations.",
                interests: [
                    "Clinical Neuropsychology",
                    "Executive Functions",
                    "Neuropsychological Rehabilitation"
                ]
            },
            {
                id: 6,
                name: "Dr. Hubert Plisiecki",
                img: eventSpeakerImg1,
                title: "AI Researcher and Computational Social Scientist",
                university: "IDEAS Research Institute & Polish Academy of Sciences",
                bio: "Dr. Hubert Plisiecki is an AI researcher and computational social scientist working at the intersection of psychology, machine learning, and natural language processing. His work develops interpretable, theory-informed computational methods that use language to study mental life, while staying attentive to bias, validity, and scientific rigor.",
                interests: [
                    "Interpretable AI",
                    "Natural Language Processing",
                    "Computational Social Science"
                ]
            }
        ],
    },
    {
        id:2,
        date: formatDate("2025-11-27T15:30:00"),
         imgs: [
            { id: 1, url: previousEvent1 },
            { id: 2, url: previousEventImg2 },
        ],
        title: "Mind vs Model: Psycholinguistic Gap Between Humans and AI",
        startDate: "2025-11-27T15:30:00+01:00",
        organizer: "PAIR Research Lab",
        cardText: "An open lecture by Ph.D. Atakan Ince exploring how humans understand language versus how AI models process it, where AI fails, and what overreliance on these systems might mean for students.",
        cardTextShort: "An open lecture on how humans understand language versus how AI models process it, and where AI falls short.",

        texts: [
            {
                id: 1,
                text: `PAIR invites you to our open lecture, Mind vs Model: Psycholinguistic Gap Between Humans and AI, led by Ph.D. Atakan Ince, a linguist and AI researcher. We'll look at how humans understand language versus how AI models process it, where AI fails, and what overreliance on these systems might mean for students. The core topics include:`
            },
            {
                id: 2,
                text: ` - A quick introduction to linguistics and AI language models.`
            },
            {
                id: 3,
                text: ` - How humans understand and reason about language vs. how AI "processes" it.`
            },
            {
                id: 4,
                text: ` - Human meaning-making compared with AI's probability-based pattern logic.`
            },
            {
                id: 5,
                text: ` - Where AI makes mistakes: examples of failures and limitations.`
            },
            {
                id: 6,
                text: ` - The risks of overdependence on AI, especially for students, including its long-term cognitive and educational effects.`
            },
            {
                id: 7,
                text: `Everyone interested in AI, linguistics or cognitive science is welcome to join us.`
            }
        ],
        type: "Event",
        startTime: "3.30 PM",
        location: "Faculty Of Psychology, University of Warsaw",
        speakers: [
            {
                id: 1,
                name: "Atakan Ince, PhD",
                img: speakerSvg,
                title: "Linguist and AI Researcher",
                university: "Research & Evaluation of AI Systems, Tech Industry",
                bio: "Dr. Atakan Ince is an expert in theoretical syntax and Turkish morpho-syntax who has taught at several universities. He currently works in the tech sector on the research and evaluation of top AI systems, especially large language models. His recent research focuses on the linguistic foundations of modern AI models.",
                interests: [
                    "Theoretical Syntax",
                    "Turkish Morpho-syntax",
                    "Linguistics of Large Language Models"
                ]
            }
        ]
    },
    {
        id: 3,
        date: formatDate("2025-12-12T15:30:00"),
         imgs: [
            { id: 1, url: previousEvent2 },
        ],
        title: "Understanding Large Language Models: What They Are and What They Aren't",
        startDate: "2025-12-12T15:30:00+01:00",
        organizer: "PAIR Research Lab",
        cardText: "An intuitive online lecture by Daria Karpova on neural networks, large language models and AI agents: how they learn, how they generate responses and why they behave the way they do.",
        cardTextShort: "An intuitive guide to neural networks, large language models and AI agents, and why they behave the way they do.",

        texts: [
            {
                id: 1,
                text: `Understanding Large Language Models: What They Are and What They Aren't is an open lecture led by Daria Karpova, a working data scientist and cognitive science researcher. It offers an intuitive guide to neural networks, large language models and AI agents. The lecture covers:`
            },
            {
                id: 2,
                text: ` - How neural networks and large language models learn.`
            },
            {
                id: 3,
                text: ` - How they generate responses.`
            },
            {
                id: 4,
                text: ` - What AI agents are and how they work.`
            },
            {
                id: 5,
                text: ` - Why these systems behave the way they do, and what they are not.`
            },
            {
                id: 6,
                text: `The event is fully virtual (online only), and everyone is welcome to join. See you there!`
            }
        ],
        type: "Event",
        startTime: "3.30 PM",
        location: "Online",
        speakers: [
            {
                id: 1,
                name: "Daria Karpova",
                img: previousEvent_2_Speaker,
                title: "Data Scientist and Cognitive Science Researcher",
                university: "Master's Student in Cognitive Science",
                bio: "Daria Karpova is a working data scientist with more than 4 years of experience. She is a Master's student in Cognitive Science, writing a thesis on biases in large language models.",
                interests: [
                    "Large Language Models",
                    "Biases in AI",
                    "Neural Networks & AI Agents"
                ]
            }
        ]
    },
    {
        id: 4,
        date: formatDate("2026-01-14T12:00:00"),
        imgs: [
            { id: 1, url: previousEvent3 },
        ],
        title: "Therapeutic Chatbots: Promise, Practice, and Challenges",
        startDate: "2026-01-14T12:00:00+01:00",
        organizer: "PAIR Research Lab",
        cardText: "An interactive meeting with Dr. Emilia Kaczmarek on psychotherapeutic chatbots and their growing role in mental health support, combining a short presentation with group discussion and small-group work.",
        cardTextShort: "An interactive meeting on psychotherapeutic chatbots and their growing role in mental health support.",

        texts: [
            {
                id: 1,
                text: `Join us for an interactive meeting focused on psychotherapeutic chatbots and their growing role in mental health support, led by Dr. Emilia Kaczmarek, Assistant Professor of Ethics at the University of Warsaw. The meeting includes:`
            },
            {
                id: 2,
                text: ` - A short introductory presentation on the history of therapeutic chatbots, key facts, and current challenges and controversies in the field.`
            },
            {
                id: 3,
                text: ` - A group discussion and a task in small groups.`
            },
            {
                id: 4,
                text: `The meeting is open to anyone interested in psychology, digital mental health, and the ethical and practical implications of using AI-based tools in psychotherapy. Let's reflect together on where technology meets human care, and what this means for the future of psychotherapy.`
            }
        ],
        type: "Event",
        startTime: "12.00 PM",
        location: "Faculty of Psychology, University of Warsaw",
        speakers: [
            {
                id: 1,
                name: "Dr. Emilia Kaczmarek",
                img: previousEvent_3_Speaker,
                title: "Assistant Professor of Ethics",
                university: "University of Warsaw",
                bio: "Dr. Emilia Kaczmarek is an Assistant Professor of Ethics at the University of Warsaw. She specializes in bioethics, AI ethics, and the complex moral landscape of the pharmaceutical industry, with work on issues such as conflicts of interest, medicalization, and research integrity. She also shapes the next generation of ethicists through her seminars at the University of Warsaw.",
                interests: [
                    "Bioethics",
                    "AI Ethics",
                    "Ethics of the Pharmaceutical Industry"
                ]
            }
        ]
    },
    {
        id: 5,
        imgs: [
            { id: 1, url: previousEvent4 },
        ],
        title: "Between a Click and Conscience, the Machine and the Mystery",
        startDate: "2026-01-16T13:00:00+01:00",
        organizer: "PAIR Research Lab",
        cardText: "A lecture and discussion with Prof. Karol Kozak and Aleksandra Ata examining trust and fear in relation to artificial intelligence: systems that appear to know too much about us, and the human tendency to believe, or fear, that they do.",
        cardTextShort: "A lecture and discussion on trust, fear, and responsibility in our relationship with artificial intelligence.",

        texts: [
            {
                id: 1,
                text: `This lecture and discussion examines trust and fear in relation to artificial intelligence: systems that appear to "know too much" about us, and the distinctly human tendency to believe, or to fear, that they do. The session is structured in three parts:`
            },
            {
                id: 2,
                text: ` - Block I: The click as a moral decision.`
            },
            {
                id: 3,
                text: ` - Block II: AI that knows too much, and the human who wants to believe it, including a case study presented by Aleksandra Ata.`
            },
            {
                id: 4,
                text: ` - Block III: The black box, or why we trust the machine.`
            },
            {
                id: 5,
                text: `The discussion will also address the following questions:`
            },
            {
                id: 6,
                text: ` - Trust in algorithms versus human conscience.`
            },
            {
                id: 7,
                text: ` - Where the usefulness of AI ends and human responsibility begins.`
            },
            {
                id: 8,
                text: ` - Data protection and privacy in the era of medical AI.`
            },
            {
                id: 9,
                text: ` - The real risks of AI, and the myths that surround it.`
            },
            {
                id: 10,
                text: ` - Why "more data" does not necessarily mean "more knowledge".`
            },
            {
                id: 11,
                text: `The session is open to everyone interested in the ethical, social, and technological dimensions of artificial intelligence.`
            }
        ],
        date: formatDate("2026-01-16T13:00:00"),
        type: "Event",
        startTime: "1.00 PM",
        location: "Faculty of Psychology, University of Warsaw",
        speakers: [
            {
                id: 1,
                name: "Prof. Karol Kozak",
                img: previousEvent_4_Speaker,
                title: "Professor of Engineering Sciences and Bioinformatics",
                university: "Fraunhofer Society & Medical Faculty, TU Dresden",
                bio: "Prof. Karol Kozak is a Professor of Engineering Sciences and Bioinformatics and Head of the Biomedical Computer Science Unit at the Fraunhofer Society, affiliated with the Medical Faculty at TU Dresden. His research focuses on cybersecurity, data protection in AI systems, and large-scale medical data management at the intersection of artificial intelligence, bioengineering, and health technologies. He is the author of numerous high-impact scientific publications, books, and book chapters on computational methods and AI in the life sciences.",
                interests: [
                    "Cybersecurity & Data Protection in AI",
                    "Medical Data Management",
                    "Computational Methods in the Life Sciences"
                ]
            },
            {
                id: 2,
                name: "Aleksandra Ata",
                img: speakerSvg,
                title: "Case Study Presenter",
                university: "",
                bio: "Aleksandra Ata presents a case study in the second block of the session, exploring AI that appears to know too much and the human tendency to believe it.",
                interests: [
                    "Trust in AI",
                    "Human–AI Interaction"
                ]
            }
        ]
    },

];