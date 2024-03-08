import { Alert, FormGroup, Input } from 'reactstrap';
import { FC, useState } from 'react';

import { ChangeEventHandler } from 'react';
import Image from 'next/image';
import { SEND_MAIL_URL } from '@/constants';
import axios from 'axios';

const DivImgStyle = {
  width: '200px',
  margin: 'auto',
  height: '110px',
  textAlign: 'center',
};

const ImgStyle = {
  height: '80px',
  width: '75%',
};

const H3Style = {
  paddingTop: '10px',
};

const ContactUs: FC = () => {
  const [state, setState] = useState({
    message: '',
    name: '',
    mobile: '',
    email: '',
    subject: '',
    showSuccessAlert: false,
    showErrorAlert: false,
  });

  const handleChange : ChangeEventHandler<HTMLInputElement>= (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { message, name, email, mobile, subject } = state;
    const userData = {
      message,
      email,
      mobile,
      name,
      subject,
    };

    // Perform send mail task using the firebase function
    axios.post(`${SEND_MAIL_URL}`, { userData }).then((res) => {
      if (res && res.data === 'Sended') {
        setState((prevState) => ({
          ...prevState,
          showSuccessAlert: true,
          message: '',
          name: '',
          mobile: '',
          email: '',
          subject: '',
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          showErrorAlert: true,
        }));
      }
    });
  };

  return (
    <>
      <div className="padding_top">
        <Image
          alt="Contact Wedding Photographer Image"
          src={`/assets/images/contact-page/ContactUs.jpg`}
          width={1000}
          height={1000}
          style={{ width: '100%', height: 'auto' }}
          unoptimized
        />
      </div>
      <div className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">GET IN TOUCH</h2>
            </div>
            <div className="col-lg-8">
              <form
                onSubmit={handleSubmit}
                className="form-contact contact_form"
              >
                <div className="row">
                  <div className="col-12">
                    <FormGroup>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        value={state.name}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-12">
                    <FormGroup>
                      <Input
                        type="textarea"
                        name="message"
                        placeholder="Message"
                        value={state.message}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-sm-4">
                    <FormGroup>
                      <Input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile No."
                        value={state.mobile}
                        maxLength={10}
                        minLength={10}
                        pattern="^[0-9-+\s()]*$"
                        required
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-sm-8">
                    <FormGroup>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={state.email}
                        required
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-12">
                    <FormGroup>
                      <Input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={state.subject}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-3">
                    <FormGroup>
                      <button
                        className="button button-contactForm boxed-btn"
                        type="submit"
                        name="send"
                      >
                        Send
                      </button>
                    </FormGroup>
                  </div>
                  <div className="col-12">
                    <Alert
                      isOpen={state.showSuccessAlert}
                      color="success"
                      closeLabel="Close Alert"
                      dismissible
                      toggle={() =>
                        setState((prevState) => ({
                          ...prevState,
                          showSuccessAlert: !state.showSuccessAlert,
                        }))
                      }
                    >
                      Thanks for connecting!!
                    </Alert>
                    <Alert
                      isOpen={state.showErrorAlert}
                      color="danger"
                      closeLabel="Close Alert"
                      dismissible
                      toggle={() =>
                        setState((prevState) => ({
                          ...prevState,
                          showErrorAlert: !state.showErrorAlert,
                        }))
                      }
                    >
                      Something went wrong!!
                    </Alert>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-3 offset-lg-1 contact_card">
              <div className="media">
                <div
                  className="black_logo"
                  style={{ ...DivImgStyle, textAlign: 'center' }}
                >
                  <Image
                    alt="Wedding Photography Logo"
                    src={`/assets/images/contact-page/BlackLogo.png`}
                    width={1000}
                    height={1000}
                    style={{ ...ImgStyle }}
                    unoptimized
                  />
                </div>
              </div>
              <div className="media media_tablet contact-info">
                <span className="contact-info__icon">
                  <i className="flaticon-map"></i>
                </span>
                <div className="media-body">
                  <h3 style={H3Style}>Pune, Maharashtra</h3>
                </div>
              </div>
              <div className="media media_tablet contact-info">
                <span className="contact-info__icon">
                  <i className="flaticon-book"></i>
                </span>
                <div className="media-body">
                  <h3 style={H3Style}>+91 9545228983</h3>
                </div>
              </div>
              <div className="media media_tablet contact-info">
                <span className="contact-info__icon">
                  <i className="flaticon-email"></i>
                </span>
                <div className="media-body">
                  <h3 style={H3Style}>
                    <a
                      href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=photuphactory@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      photuphactory@gmail.com
                    </a>
                  </h3>
                </div>
              </div>
              <div className="media media_tablet contact-info">
                <span className="contact-info__icon">
                  <i className="flaticon-instagram"></i>
                </span>
                <div className="media-body">
                  <h3 style={H3Style}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.instagram.com/omkarkalgude_photography/"
                    >
                      omkarkalgude_photography@instagram
                    </a>
                  </h3>
                </div>
              </div>
              <div className="media media_tablet contact-info">
                <span className="contact-info__icon">
                  <i className="flaticon-facebook"></i>
                </span>
                <div className="media-body">
                  <h3 style={H3Style}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.facebook.com/photu.phactory/"
                    >
                      photu.phactory@facebook
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
