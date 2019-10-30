import React from 'react';
import {
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import VideoSearch from './VideoSearch';
import VideoFavourite from './VideoFavourite';
import SearchIcon from './SearchIcon';
import LikeIcon from './LikeIcon';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      	<h1 className="App-title">
	      	<NavLink to="/">August Youtube</NavLink>
	      </h1>
        <nav className="App-nav">
          <ul>
            <li>
              <NavLink to="/">
                <figure className="nav-icon">
                  <SearchIcon />
                </figure>
                <span className="nav-text">Search</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/favourite">
                <figure className="nav-icon">
                  <LikeIcon />
                </figure>
                <span className="nav-text">Favourite</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="App-main">
        <Switch>
            <Route exact path="/" component={VideoSearch}></Route>
            <Route exact path="/favourite" component={VideoFavourite} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
