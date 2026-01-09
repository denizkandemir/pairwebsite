import Banner from "../../Components/Banner/Banner"
import eventsBannerImg from "/eventsBackground.png"
import "./EventsPage.scss"
import EventsCards from "../../Components/EventsCards/EventsCards"
import UpcomingEvent from "../../Components/UpComingEvent/UpcomingEvent"

const EventsPage = () => {

 const eventsBannerTexts = [
    {
        id:1,
        text:"Explore our upcoming webinars and events designed to bring professionals together around meaningful ideas, emerging trends, and real-world insights.",
    },

    {
        id:2,
        text:"Through expert-led sessions and interactive discussions, we aim to create an engaging space where learning, collaboration, and inspiration meet.",
    }
 ]

 return (
    <div className="events-page-container">
       <Banner title={"Our Events and Webinars"} titleClass={"events-banner-title"} backgroundImage={eventsBannerImg} texts={eventsBannerTexts} imgClass={"events-page-img"}/>
       <UpcomingEvent/>
       <EventsCards/>
    </div>
 )
}

export default EventsPage