import Banner from "../../Components/Banner/Banner";
import eventsBannerImg from "/eventsBackground.png";
import "./EventsPage.scss";
import EventsCards from "../../Components/EventsCards/EventsCards";
import UpcomingEvent from "../../Components/UpComingEvent/UpcomingEvent";
import useSeoMeta from "../../hooks/useSeoMeta";
import { pageSeo } from "../../seo/siteSeo";


const EventsPage = () => {

   const eventsDescription = "Our events will help you grow and become more confident in your future prospects. Entirely for free, you can attend lectures and day-long conferences held by leading researchers and AI developers. Ultimately, we aim to create a community of experts that will synthesize the fields of artificial intelligence and psychology. Join us, and become part of the very forefront of academic research.";

   useSeoMeta({
      ...pageSeo.events,
      description: eventsDescription,
      image: eventsBannerImg,
      keywords: [...pageSeo.events.keywords, 'psychology and artificial intelligence'],
   });

   return (
      <div className="events-page-container">
         <Banner
            badgeText="Upcoming Sessions"
            title="Learn About AI Directly from Experts"
            titleHighlight="Learn About AI"
            titleClass="events-banner-title"
            imageSrc={eventsBannerImg}
            imageAlt="PAIR events and webinars"
            description={eventsDescription}
            chips={["Talks", "Sessions", "Community"]}
            floatingLabels={["Talks", "Sessions", "Community"]}
            detailVariant="events"
            imgClass={"events-page-img"}
         />
         <UpcomingEvent />
         <EventsCards />
      </div>
   );
};

export default EventsPage;