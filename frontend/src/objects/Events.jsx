const eventImages = [
    "/eventBrain.png",
    "/eventBrain3.png",
    "/eventBrain4.png",
    "/eventBrain5.png",
    "/eventBrain6.png",
    "/eventsImage1.png",
    "/eventsImage2.png",
    "/eventsImage3.png",
    "/eventsImage4.png",
    "/eventsImage5.png",
    "/eventsImage6.png",
    "/eventsImg8.png",
    "/eventsImg9.png",
    "/eventsImg10.png"
];

const getRandomImage = () => {
    return eventImages[Math.floor(Math.random() * eventImages.length)];
};

const getRandomDate = () => {
    const start = new Date(2024, 0, 1);
    const end = new Date(2026, 11, 31);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomType = () => {
    return Math.random() > 0.5 ? "Webinar" : "Event";
};

const getRandomLocation = () => {
    return Math.random() > 0.5 ? "Online" : "Room 301";
};

const getRandomSpeaker = () => {
    const speakers = ["Dr. John Smith", "Emma Johnson", "Prof. Michael Chen", "Sarah Williams", "David Brown"];
    return speakers[Math.floor(Math.random() * speakers.length)];
};

const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Tüm eventleri tek bir array'de topluyoruz
export const allEvents = [
    // Past Events
    {
        id: 1,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Past events One",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: "January 10, 2024",
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 2,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Past events Two",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: "March 15, 2024",
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 3,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Past events Three",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 4,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Past events Four",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 5,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Past events Five",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 6,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Past events Six",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 7,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Past events Seven",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 8,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Past events Eight",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 9,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Past events Nine",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    // Upcoming Events
    {
        id: 10,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Upcoming Event One",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet." }],
        date: "January 10, 2026",
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 11,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Upcoming Event Two",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: "January 15, 2026",
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 12,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Upcoming Event Three",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 13,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Upcoming Event Four",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 14,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Upcoming Event Five",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 15,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Upcoming Event Six",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 16,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Upcoming Event Seven",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 17,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Upcoming Event Eight",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
    {
        id: 18,
        imgs: [{ id: 1, url: getRandomImage() }],
        title: "Upcoming Event Nine",
        texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
        date: formatDate(getRandomDate()),
        type: getRandomType(),
        location: getRandomLocation(),
        speaker: getRandomSpeaker()
    },
];
