/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function OffersEdit() {
  let { id } = useParams();
  const navigate = useNavigate();
  let { state } = useLocation();
  const currentOffer = state.offers.results[id - 3];
  const [offer, setOffer] = useState({
    title: currentOffer.title,
    available: currentOffer.available,
    err: '',
    successMessage: null,
  });

  console.log(offer);
  const image = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setOffer({ ...offer });
    const formData = new FormData();
    formData.append('title', offer.title);
    formData.append('available', offer.available);
    if (image.current.files && image.current.files[0]) {
      formData.append('image', image.current.files[0]);
    }

    axios
      .put(`https://food-menu-dashboard.vercel.app/offers/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        setOffer({
          title: '',
          err: [],
          successMessage: 'Offer Updated Successfully !!',
        });
        image.current.value = null;
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        setOffer({
          ...offer,
          successMessage: null,
          err: 'Something went wrong, Please try again later !!',
        });
      });
  };

  if (offer.successMessage) {
    setTimeout(() => {
      navigate('/offers');
    }, 2000);
  }

  return (
    <>
      {offer.successMessage && (
        <div className='alert'>Offer Updated Successfully!!✅✅</div>
      )}
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='form'>
          <input
            type='text'
            id='text'
            className='input'
            placeholder='offer title'
            value={offer.title}
            onChange={(e) => {
              setOffer({ ...offer, title: e.target.value });
            }}
          ></input>
          <input
            type='file'
            htmlFor='choose image'
            className='file-input'
            ref={image}
          ></input>
          <label>
            <b>Offer Avaliable?</b>
          </label>
          <select
            className='selection'
            defaultValue={offer.available}
            onChange={(e) => {
              setOffer({
                ...offer,
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
}
