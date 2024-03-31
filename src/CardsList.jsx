/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import ItemCard from './ItemCard';
import '../style/CardsList.css';
import '../style/ItemCard.css';
import ItemCard from './ItemCard';

const CardsList = function (props) {
  const deleteItem = (id) => {
    axios
      .delete(`https://food-menu-dashboard.vercel.app/items/${id}`)
      .then((res) => {
        setItems({ ...items, reload: items.reload + 1 });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const [items, setItems] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setItems({ ...items, loading: true });
    axios
      .get('https://food-menu-dashboard.vercel.app/items')
      .then((res) => {
        setItems({ ...items, results: res.data, loading: false, err: null });
      })
      .catch((err) => {
        setItems({ ...items, loading: false, err: 'something went wrong' });
      });
  }, [items.reload]);

  return (
    <>
      {/* loader */}
      <div className='cards-list'>
        {items.results.map((item) => (
          <div className='card-container' key={item.id}>
            <div className='image-container'>
              <img src={item.image_url}></img>
            </div>
            <div className='card-details'>
              <span className='name'>{item.title}</span>
              <span className='price'>{item.price} LE</span>
              <span className='description'>{item.description}</span>
            </div>
            <div className='card-buttons'>
              <Link to={'' + item.id} state={{ items }} className='edit-button'>
                Edit
              </Link>
              <button
                className='delete-button'
                onClick={(e) => {
                  deleteItem(item.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardsList;
