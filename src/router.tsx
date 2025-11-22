import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import AboutPage from './components/About/AboutPage';
import HomePage from './components/Home/HomePage';
import Privacy from './components/Privacy/PrivacyPage'
import SubmitPage from './components/Submit/SubmitPage';
import SupportPage from './components/Support/SupportPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'submit',
        element: <SubmitPage />,
      },
      {
        path: 'support',
        element: <SupportPage />,
      },
      {
        path: 'privacy-policy',
        element: <Privacy />,
      },
    ],
  },
]);

export default router;
