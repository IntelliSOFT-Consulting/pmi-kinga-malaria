import Home from '@/Pages/Home';
import OperationSites from '@/Pages/OperationSites';
import Supervisory from '@/Pages/Supervisory';
import SubmissionByForm from '@/Pages/SubmissionByForm';
import LatePmt from '@/Pages/LatePmt';
import SmsReports from '@/Pages/SmsReports';
import Users from '@/Pages/Users';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/report/supervisory',
    element: <Supervisory />,
  },
  {
    path: '/report/submissions',
    element: <SubmissionByForm />,
  },
  {
    path: '/report/late-pmt',
    element: <LatePmt />,
  },
  {
    path: '/report/sms',
    element: <SmsReports />,
  },
  {
    path: '/operation-sites',
    element: <OperationSites />,
  },
  {
    path: '/users',
    element: <Users />,
  },
];

export default routes;
