import { Layout } from 'antd';
import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '@/components/Navbar';
import routes from '@/routes';
import moh from '../assets/img/moh.png';
import pmi from '../assets/img/pmi.png';

const { Content } = Layout;

const AppLayout = () => {
  const { userInfo } = useSelector(state => state.userSignin);
  const { testReport } = useSelector(state => state.getTestReport);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!userInfo) {
      location.href = '/login';
    }
  }, [userInfo]);

  useEffect(() => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.reset();
    });
  }, [testReport]);

  return (
    <Layout>
      <Navbar />
      <div className='heading-section'>
        <div className='label'>
          <span id='page-back-title'>
            <Link to='/' className='pmi-logo'>
              PMI Kinga Malaria
            </Link>
          </span>
          {pathname !== '/' && <Link to='/'> Back</Link>}
        </div>
        <div className='logos'>
          <img src={pmi} alt='PMI' />
          <img src={moh} alt='MOH' />
        </div>
      </div>
      <Content className='site-layout'>
        <div className='site-layout-background'>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Routes>
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
