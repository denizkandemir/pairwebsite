import Banner from "../../Components/Banner/Banner";
import eventsBannerImg from "/eventsBackground.png";
import "./EventsPage.scss";
import EventsCards from "../../Components/EventsCards/EventsCards";
import UpcomingEvent from "../../Components/UpComingEvent/UpcomingEvent";

const EventsPage = () => {

   const eventsDescription = "Explore upcoming webinars and events designed to connect researchers, students, and professionals around meaningful ideas and emerging evidence.";
   const eventsSecondaryDescription = "Through expert-led sessions and interactive discussions, we create a space where learning, collaboration, and inspiration meet.";

   return (
      <div className="events-page-container">
         <Banner
            badgeText="Upcoming Sessions"
            title="Our Events and Webinars"
            titleHighlight="Webinars"
            titleClass="events-banner-title"
            imageSrc={eventsBannerImg}
            imageAlt="PAIR events and webinars"
            description={eventsDescription}
            secondaryDescription={eventsSecondaryDescription}
            chips={["Talks", "Sessions", "Community"]}
            floatingLabels={["Talks", "Sessions", "Community"]}
            imgClass={"events-page-img"}
         />
         <UpcomingEvent />
         <EventsCards />
      </div>
   );
};

export default EventsPage;