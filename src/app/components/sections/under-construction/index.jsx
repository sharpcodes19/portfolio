import React, { useState } from 'react';
import axios from 'axios';

import TextField from '../../text/field';
import MaintenanceImage from '../../../assets/undraw_clean_up_ucm0.svg';
import config from '../../../../config.json';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

function UnderConstruction () {

  const { executeRecaptcha } = useGoogleReCaptcha ();
  const [subscriber, setSubscriber] = useState (null);

  const onSubscribe = (e) => {
    e.preventDefault ();
    const swal = require ('sweetalert2');

    swal.fire ({
      title: 'Subscribing...',
      text: 'Please be patient while sending your subscription...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
        const email = e.target.email.value;
        const validator = require ('email-validator');
        if (!validator.validate (email)) {
          swal.close ();
          return swal.fire ({
            title: 'Oops',
            text: 'Looks like I did not recognized your email address valid.',
            icon: 'error'
          });
        }
        executeRecaptcha ('sendMail').then ((recaptchaToken) => {
          axios.post (`${ config.server.baseUrl }/visitor/subscribe`, { email, recaptchaToken })
            .catch ((ex) => console.error ('Failed to send your subscription.', ex))
            .then ((res) => {
              if (!res.data.success) {
                swal.close ();
                return swal.fire ({
                  title: 'Sending message failed!',
                  icon: 'warning',
                  text: res.data.message
                });
              }
              setSubscriber ('')
              swal.fire ({ title: 'Hello subscriber!', icon: 'success', text: res.data.message });
            });
        });
      }
    });

  }

  return (
    <div className = 'under-construction'>
      
      <div className = 'message'>
        <h1 className = 'title'>Under construction</h1>
        <p>I am still working on this section. Please try checking again soon. Thank you.</p>
      </div>
      
      <img src = { MaintenanceImage } alt = 'section-under-construction' />

      <form method = 'POST' className = 'subscribe' onSubmit = { onSubscribe }>

        <div className = 'notice'>
          <p>Let me know if this section is done.</p>
        </div>

        <div className = 'control'>
          <TextField name = 'email' type = 'email' placeholder = 'Email address' required = { true } onChange = { (value) => {
          setSubscriber (value)
        } } value = { subscriber } />
          <button type = 'submit' className = 'submit'>Subscribe</button>
        </div>

      </form>

    </div>
  )
}

export default UnderConstruction;