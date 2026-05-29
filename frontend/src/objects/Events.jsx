import eventImage1 from "/eventImg1.jpeg";
import eventSpeakerImg1 from "/eventSpeakerImg1.png";
import eventImage2 from "/eventImg2.jpeg";
import eventSpeakerImg2 from "/eventSpeakerImg2.jpg";
import eventSpeakerImg3 from "/eventSpeakerImg3.jpg";
import eventSpeakerImg4 from "/eventSpeakerImg4.png";
import eventSpeakerImg5 from "/eventSpeakerImg5.jpg";
import eventSpeakerImg6 from "/eventSpeakerImg6.webp";

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
            { id: 2, url: eventImage1 },
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
        ]
    },
];