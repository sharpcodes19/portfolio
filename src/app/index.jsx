import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { IconContext } from 'react-icons';

import HomeView from './views/home';
import Forbidden from './views/403';

import config from '../config.json';

function App() {
  return (
    <GoogleReCaptchaProvider { ...config.security.google.recaptcha }>
      <IconContext.Provider value = { config.icon }>
        <Router>
          <Switch>
            <Route exact path = { config.routes.home } component = { () => <HomeView /> } />
            <Route exact path = { config.routes.forbidden } component = { () => <Forbidden /> } />
          </Switch>
        </Router>
      </IconContext.Provider>
    </GoogleReCaptchaProvider>
  )
}

export default App
