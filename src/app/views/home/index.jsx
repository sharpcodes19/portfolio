import React, { useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useHistory } from 'react-router-dom';

import Landing from '../../components/sections/landing';
import Contact from '../../components/sections/contact';
import Works from '../../components/sections/works';
import Skills from '../../components/sections/skills';

import config from '../../../config.json';
import axios from 'axios';

function Home () {
  const history = useHistory ();
  const { executeRecaptcha } = useGoogleReCaptcha ();

  useEffect (() => {
    document.title = `${ config.dev.name.brand } | Portfolio`;
    executeRecaptcha ('home').then ((recaptchaToken) => {
      axios.post (`${ config.server.baseUrl }/visitor`, { recaptchaToken })
        .catch ((ex) => console.error ('Got an error after visiting home page of Sharpcodes Portfolio.', ex))
        .then ((res) => {
          if (!res.data.success) {
            return history.push ({
              pathname: '/403',
              state: {
                verified: true,
                message: res.data.message
              }
            });
          }
        })
    });
  }, [executeRecaptcha, history]);

  return (
    <div className = 'v-home'>
      
      <Landing />
      <Skills />
      <Contact />
      <Works />

    </div>
  )
}

export default Home;