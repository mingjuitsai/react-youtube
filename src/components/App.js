import React from 'react';
import {
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import VideoSearch from './VideoSearch';
import VideoFavourite from './VideoFavourite';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      	<h1>
	      	August Youtube
	      </h1>
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
