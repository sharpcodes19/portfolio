import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Fade } from 'react-awesome-reveal';
import { FaPaperPlane } from 'react-icons/fa';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import TextField from '../../../../components/text/field';
import TextArea from '../../../text/area';

import config from '../../../../../config.json';

function Form () {

  const swal = require ('sweetalert2');
  const { executeRecaptcha } = useGoogleReCaptcha ();
  const [visitor, setVisitor] = useState ({ name: '', email: '' });

  const handleGoogleLogin = (google) => {
    const data = google.profileObj;
    setVisitor ({ name: data.name,  email: data.email });
  }

  const handleSubmit = async (e) => {
    e.preventDefault ();
    await swal.fire ({
      title: 'Sending message.',
      text: 'Please be patient while sending your message...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
        swal.showLoading ();
        const email = e.target.email.value;
        const name = e.target.name.value;
        const message = e.target.message.value;
        const validator = require ('email-validator');
        if (!validator.validate (email)) {
          swal.close ();
          return swal.fire ({
            title: 'Oops',
            text: 'Looks like I did not recognized your email address valid.',
            icon: 'error'
          });
        }
        if (name.length < 4) {
          swal.close ();
          return swal.fire ({
            title: 'Oops',
            text: 'Looks like I did not recognized your name valid.',
            icon: 'error'
          });
        }
        executeRecaptcha ('sendMail').then ((recaptchaToken) => {
          const axios = require ('axios');
          axios.post (`${ config.server.baseUrl }/visitor/sendMail`, { 
            recaptchaToken,
            from: `'${ name } <${ email }>'`,
            html: message, email,
            date: new Date ()
          })
            .then ((res) => {
              swal.close ();
              if (!res.data.success) {
                return swal.fire ({
                  title: 'Sending message failed!',
                  icon: 'warning',
                  text: res.data.message
                });
              }
              setVisitor ({
                name: '',
                email: ''
              });
              e.target.message.value = '';
              swal.fire ({ title: 'Message sent!', icon: 'success', text: res.data.message });
            })
            .catch ((ex) => {
              console.error ('Got an error after sending an e-mail message.', ex);
              swal.close ();
            })
        });
      }
    })


  }

  return (
    <Fade duration = { 400 } delay = { 500 } direction = 'left' triggerOnce>
      <form method = 'POST' className = 'contact-form' onSubmit = { handleSubmit }>

        <div className = 'social-login'>
          <GoogleLogin 
            { ...config.security.google.login } 
            className = 'google' 
            buttonText = 'Fill-up with Google account' 
            onSuccess = { handleGoogleLogin }
          />
          <p>Recommended</p>
        </div>

        <TextField type = 'text' placeholder = 'Your full name' name = 'name' onChange = { (value) => {
          setVisitor ({
            name: value,
            email: visitor.email
          })
        } } value = { visitor.name } required = { false } />
        <TextField type = 'email' placeholder = 'Your email' name = 'email' onChange = { (value) => {
          setVisitor ({
            name: visitor.name,
            email: value
          })
        } } value = { visitor.email } required = { false } />
        <TextArea placeholder = 'Message' name = 'message' rows = { 10 } />
        <div className = 'control'>
          <button className = 'submit' type = 'submit'>
            <FaPaperPlane />
            <span>Send Message</span>
          </button>
          <p>Be adviced that you can only send a message <span>once every hour</span> to prevent inbox spamming.</p>
        </div>
      </form>
    </Fade>
  )
}

export default Form;