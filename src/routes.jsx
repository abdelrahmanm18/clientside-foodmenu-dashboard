import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import Add from './Add';
import App from './App';
import EditForm from './EditForm';
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
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
]);
