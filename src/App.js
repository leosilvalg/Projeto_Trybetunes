import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Login exact path="/" component={ Login } />
        <Search path="/search" component={ Search } />
        <Album path="/album/:id" component={ Album } />
        <Favorites path="/favorites" component={ Favorites } />
        <Profile path="/profile" component={ Profile } />
        <ProfileEdit path="/profile/edit" component={ ProfileEdit } />
        <NotFound path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
