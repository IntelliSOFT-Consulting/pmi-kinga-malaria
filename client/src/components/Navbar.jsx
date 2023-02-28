import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/actions/userActions';
import { setTest, getTest } from '@/redux/actions/reportActions';

export default function Navbar() {
  const { testReport } = useSelector(state => state.getTestReport);
  const { testReport: setTestReport } = useSelector(
    state => state.setTestReport
  );
  const dispatch = useDispatch();
  const toggleRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(getTest());
  }, [dispatch, setTestReport]);

  const links = [
    {
      path: '/',
      label: 'Home',
    },
    {
      path: '/operation-sites',
      label: 'Operation sites',
    },
    {
      path: '/users',
      label: 'Users',
    }
  ];

  const handleToggle = () => {
    toggleRef.current.classList.toggle('hidden');
  };
  return (
    <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <Link
            to='/'
            className='router-link-active router-link-exact-active navbar-brand'
          >
            PMI Kinga Malaria
          </Link>
        </div>
        <button onClick={handleToggle} className='navbar-right nav-toggle'>
          <i className='fa fa-bars'></i>
        </button>
        <div ref={toggleRef} className='collapse navbar-collapse hidden'>
          <ul id='navbar-links' className='nav navbar-nav'>
            {links.map((link, index) => (
              <li
                key={index}
                className={pathname === link.path ? 'active' : ''}
              >
                <Link
                  to={link.path}
                  className={
                    pathname === link.path ? 'router-link-active' : 'nav-item'
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className='navbar-right'>
            <li className='test-toggle'>
              <span className='test-label'>Load Test Data: &nbsp;</span>
              <label className='switch'>
                <input
                  type='checkbox'
                  className='switch-input'
                  checked={testReport === 'yes' ? true : false}
                  onChange={e =>
                    dispatch(setTest(e.target.checked ? 'yes' : 'no'))
                  }
                />

                <span
                  className='switch-label'
                  data-on='yes'
                  data-off='no'
                ></span>
                <span className='switch-handle'></span>
              </label>
            </li>
            <li>
              <button className='nav-btn' onClick={() => dispatch(logout())}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// <Header
//   style={{
//     position: 'fixed',
//     zIndex: 1,
//     width: '100%',
//     display: 'flex',
//     padding: '15px 1rem',
//   }}
//   className='header'
// >
//   <div style={{ display: 'flex' }}>
//     <Link to='/' className='logo'>
//       <img src={logo} alt='logo' />
//     </Link>
//     <Menu
//       theme='dark'
//       mode='horizontal'
//       defaultSelectedKeys={['0']}
//       items={links}
//       style={{ marginLeft: '1rem' }}
//     />
//   </div>
//   <Menu
//     theme='dark'
//     mode='horizontal'
//     items={[
//       {
//         label: <p onClick={() => dispatch(logout())}>Logout</p>,
//         key: '2',
//       },
//     ]}
//   />
// </Header>
