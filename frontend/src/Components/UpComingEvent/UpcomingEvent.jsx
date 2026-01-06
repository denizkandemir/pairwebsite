import "./UpcomingEvent.scss";
import { upcomingEvents } from "../../objects/UpcomingEvents";
import { useState, useEffect } from "react";

const UpcomingEvent = () => {
  const [weekEvents, setWeekEvents] = useState([]);
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    const getEventsWithinWeek = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(today.getDate() + 7);

      const filteredEvents = upcomingEvents.filter((event) => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today && eventDate <= oneWeekLater;
      });

      setWeekEvents(filteredEvents);
    };

    getEventsWithinWeek();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newCountdowns = {};

      weekEvents.forEach((event) => {
        const eventDate = new Date(event.date);
        const timeDiff = eventDate - now;

        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

          newCountdowns[event.id] = {
            days,
            hours,
            minutes,
            seconds,
            isExpired: false
          };
        } else {
          newCountdowns[event.id] = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isExpired: true
          };
        }
      });

      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [weekEvents]);

  return (
    <>
      <div className="upcoming-events-container">
        {weekEvents.map((event) => {
          const countdown = countdowns[event.id];
          
          return (
            <div key={event.id} className="upcoming-event-card">
              <div className="upcoming-event-image">
                {event.imgs && event.imgs[0] && (
                  <img src={event.imgs[0].url} alt={event.title} />
                )}
              </div>
              
              <div className="upcoming-event-content">
                <h3>{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <p className="event-location">{event.location}</p>
                
                {countdown && !countdown.isExpired ? (
                  <div className="countdown">
                    <div className="countdown-item">
                      <span className="countdown-value">{countdown.days}</span>
                      <span className="countdown-label">Days</span>
                    </div>
                    <div className="countdown-item">
                      <span className="countdown-value">{countdown.hours}</span>
                      <span className="countdown-label">Hours</span>
                    </div>
                    <div className="countdown-item">
                      <span className="countdown-value">{countdown.minutes}</span>
                      <span className="countdown-label">Minutes</span>
                    </div>
                    <div className="countdown-item">
                      <span className="countdown-value">{countdown.seconds}</span>
                      <span className="countdown-label">Seconds</span>
                    </div>
                  </div>
                ) : (
                  <p className="event-started">Event has started!</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UpcomingEvent;