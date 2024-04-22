import axios from 'axios';
import { useEffect, useState } from 'react';
import '../style/ItemCard.css';
// eslint-disable-next-line no-unused-vars
import Edit from './EditForm';
import { Link } from 'react-router-dom';

const Offers = function () {
  const [offers, setOffers] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  // const [available, setAvailable] = useState(false);

  useEffect(() => {
    setOffers({ ...offers, loading: true });
    axios
      .get('https://food-menu-dashboard.vercel.app/offers')
      .then((res) => {
        setOffers({ ...offers, results: res.data, loading: false });
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        setOffers({ ...offers, err: 'something went wrong!!', loading: false });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offers.reload]);

  const onClickHandler = function (id, available) {
    available ? (available = 1) : (available = 0);
    available ? (color = 'red') : (color = 'green');
    console.log(color);
    axios
      .put(
        `https://food-menu-dashboard.vercel.app/offers/${id}?available=${available}`
      )
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        // window.location.reload();
      });
  };
  return (
    <>
      {offers.loading && <div className='spinner'></div>}
      <div className='cards-list'>
        {offers.results.map((offer) => (
          <div className='card-container' key={offer.id}>
            <div className='image-container'>
              <img src={offer.image_url}></img>
            </div>
            <div className='card-details'>
              <span className='name'>{offer.title}</span>
              <span className='available'>
                <b>Available:</b>
                {offer.available ? ' yes' : ' no'}
              </span>
            </div>
            <div className='card-buttons' style={{ gap: '0.5rem' }}>
              <Link
                to={'/offers/' + offer.id}
                state={{ offers }}
                className='edit-button'
              >
                Edit
              </Link>
              <button
                className='delete-button'
                // eslint-disable-next-line no-unused-vars
                onClick={(e) => {
                  onClickHandler(offer.id, !offer.available);
                }}
              >
                Change
              </button>
              {/* <button
                className='hide-button'
                // eslint-disable-next-line no-unused-vars
                onClick={(e) => {
                  onClickHandler(offer.id, !offer.available);
                }}
              >
                Hide
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Offers;
