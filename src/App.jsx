// import { Outlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './App.css';
// import Home from './Home';
// import Add from './Add';
import Header from './shared/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
