import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Events = function () {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('https://food-menu-dashboard.vercel.app/events')
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickHandler = function (id, available) {
    available ? (available = 1) : (available = 0);
    axios
      .put(
        `https://food-menu-dashboard.vercel.app/events/${id}?available=${available}`
      )
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        // window.location.reload();
      });
  };

  return (
    <>
      <div className='cards-list'>
        {events.map((event) => (
          <div className='card-container' key={event.id}>
            <div className='image-container'>
              <img src={event.image_url}></img>
            </div>
            <div className='card-details'>
              <span className='name'>{event.title}</span>
              <span className='description'>{event.description}</span>
              <span className='available'>
                <b>Available:</b>
                {event.available ? ' yes' : ' no'}
              </span>
            </div>
            <div className='card-buttons' style={{ gap: '0.5rem' }}>
              <Link
                to={'/events/' + event.id}
                state={{ events }}
                className='edit-button'
              >
                Edit
              </Link>
              <button
                className='delete-button'
                // eslint-disable-next-line no-unused-vars
                onClick={(e) => {
                  onClickHandler(event.id, !event.available);
                }}
              >
                Change
              </button>
              {/* <button
                className='hide-button'
                // eslint-disable-next-line no-unused-vars
                onClick={(e) => {
                  onClickHandler(event.id, !event.available);
                }}
              >
                Hide
              </button> */}
            </div>
          </div>
        ))}
        {}
      </div>
    </>
  );
};

export default Events;
