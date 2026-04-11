import eventImage1 from "/eventImg1.jpeg";

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Tüm eventleri tek bir array'de topluyoruz
export const allEvents = [
    {
        id: 1,
        imgs: [{ id: 1, url: eventImage1 }],
        title: "Rethinking AI and Psychotherapy",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate("2026-04-11T18:00:00"),
        type: "event",
        location: "Faculty of Psychology, University of Warsaw",
        speaker: "Artur Wiśniewski, PhD, Beata Rajba, Dr Paweł Szczęsny, Dr Wouter de Raad, Dr Ewa Malinowska, & Dr Rafał Styla",
    },
];