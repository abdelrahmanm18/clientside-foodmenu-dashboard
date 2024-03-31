import CardsList from './CardsList';
import '../style/Home.css';
import { Link } from 'react-router-dom';
const Home = function () {
  return (
    <>
      <div className='home-container'>
        <div className='sub-header'>
          {/* <h3>Menu Items</h3> */}
          <Link to={'add'} className='add-button'>
            Add New Item 🍕
          </Link>
        </div>
        <CardsList />
      </div>
    </>
  );
};

export default Home;
