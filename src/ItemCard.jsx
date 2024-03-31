/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import '../style/ItemCard.css';
import axios from 'axios';

// eslint-disable-next-line no-unused-vars
const ItemCard = function (props) {
  const deleteItem = (id) => {
    axios
      .delete(`https://food-menu-dashboard.vercel.app/items/${id}`)
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <>
      <div className='card-container' key={props.item.id}>
        <div className='image-container'>
          <img src={props.item.image_url}></img>
        </div>
        <div className='card-details'>
          <span className='name'>{props.item.title}</span>
          <span className='price'>{props.item.price} LE</span>
          <span className='description'>{props.item.description}</span>
        </div>
        <div className='card-buttons'>
          <Link to={'/edit'} className='edit-button'>
            Edit
          </Link>
          <button className='delete-button' onClick={deleteItem(props.item.id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
