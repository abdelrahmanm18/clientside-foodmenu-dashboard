import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import Add from './Add';
import App from './App';
import EditForm from './EditForm';
import Offers from './Offers';
import Events from './Events';
import OffersEdit from './OffersEdit';
import EventsEdit from './EventsEdit';

export const routes = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/add',
        element: <Add />,
      },
      {
        path: ':id',
        element: <EditForm />,
      },
      {
        path: '/offers',
        element: <Offers />,
      },
      {
        path: '/offers/:id',
        element: <OffersEdit />,
      },
      {
        path: '/events',
        element: <Events />,
      },
      {
        path: '/events/:id',
        element: <EventsEdit />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
]);
