import { useState } from 'react';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Events = function () {
  const navigate = useNavigate();
  let { id } = useParams();
  let { state } = useLocation();
  const currentEvent = state.events[0];
  const [event, setEvent] = useState({
    title: currentEvent.title,
    description: currentEvent.description,
    available: currentEvent.available,
    successMessage: '',
  });
  const image = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('description', event.description);
    formData.append('available', event.available);
    if (image.current.files && image.current.files[0]) {
      formData.append('image', image.current.files[0]);
    }

    axios
      .put(`https://food-menu-dashboard.vercel.app/events/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        setEvent({
          title: '',
          description: '',
          err: [],
          successMessage: 'Event Updated Successfully !!',
        });
        image.current.value = null;
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        setEvent({
          ...event,
          successMessage: null,
          err: 'Something went wrong, Please try again later !!',
        });
      });
  };

  if (event.successMessage) {
    setTimeout(() => {
      navigate('/events');
    }, 2000);
  }
  return (
    <>
      {event.successMessage && (
        <div className='alert'>Event Updated Successfully!!✅✅</div>
      )}
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='form'>
          <input
            type='text'
            id='text'
            className='input'
            placeholder='event title'
            value={event.title}
            onChange={(e) => {
              setEvent({ ...event, title: e.target.value });
            }}
          ></input>
          <textarea
            className='input'
            placeholder='Description'
            value={event.description}
            onChange={(e) => {
              setEvent({ ...event, description: e.target.value });
            }}
            rows={3}
          ></textarea>{' '}
          <input
            type='file'
            htmlFor='choose image'
            className='file-input'
            ref={image}
          ></input>
          <label>
            <b>Event Avaliable?</b>
          </label>
          <select
            className='selection'
            defaultValue={currentEvent.available}
            onChange={(e) => {
              setEvent({
                ...event,
                available: e.target.value,
              });
            }}
          >
            <option disabled>available?</option>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Events;
