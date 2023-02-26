import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layouts/Alert';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import AddExperience from './components/profile-form/AddExperience';
import AddEduction from './components/profile-form/AddEduction';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Alert />
            <Routes>
              <Route exact path='/' element={<Landing />} />
              <Route
                exact
                path='/register'
                element={<Register className='container' />}
              />
              <Route
                exact
                path='/login'
                element={<Login className='container' />}
              />
              <Route exact path='/profiles' element={<Profiles />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/dashboard' element={<Dashboard />} />
              </Route>
              <Route exact path='/' element={<PrivateRoute />}>
                <Route
                  exact
                  path='/create-profile'
                  element={<CreateProfile />}
                />
              </Route>
              <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/edit-profile' element={<EditProfile />} />
              </Route>
              <Route exact path='/' element={<PrivateRoute />}>
                <Route
                  exact
                  path='/add-experience'
                  element={<AddExperience />}
                />
              </Route>
              <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/add-education' element={<AddEduction />} />
              </Route>
              <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/posts' element={<Posts />} />
              </Route>
              <Route exact path='/' element={<PrivateRoute />}>
                <Route path='/posts/:id' element={<Post />} />
              </Route>
            </Routes>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
