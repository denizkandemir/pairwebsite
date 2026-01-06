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

export const pastEvents = [
        {
            id: 1,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "Past events One ",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 2,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "Past events Two",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 3,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 4,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 5,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 6,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 7,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 8,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },

        {
            id: 9,
            imgs: [{ id: 1, url: getRandomImage() }],
            title: "events One",
            texts: [{ id: 1, text: "lorem ipsum dolor sit amet, consectetur adipiscing elit." }],
            date: formatDate(getRandomDate()),
            type: getRandomType(),
            location: getRandomLocation(),
            speaker: getRandomSpeaker()
        },
    ];