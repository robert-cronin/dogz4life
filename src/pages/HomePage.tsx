import React from "react";
import { Button } from "antd";
import { SocialIcon } from "react-social-icons";
import Logo from "../static/only-tree-background.jpg";

class HomePage extends React.Component {
  state = {
    current: 0,
  };

  next() {
    this.setState({
      current: this.state.current + 1,
    });
  }

  prev() {
    this.setState({
      current: this.state.current - 1,
    });
  }

  steps = [
    {
      title: "First",
      content: "First-content",
    },
    {
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];

  render() {
    const threeSteps = [
      "1. Book an apointment",
      "2. Bring your puppy on the selected date",
      "3. Come back when they're ready!",
    ];
    return (
      <>
        <div className="home-page">
          <h1>
            <span>DOGZ 4 LIFE</span>
          </h1>
          <h2>
            <span>FOR THE LOVE OF DOGZ</span>
          </h2>
          <img src={Logo} />
          <div className="action-banner">
            <a
              target="_top"
              className="square-payment"
              href="https://square.site/book/LMQY4941CGM9H/dogz-4-life"
              rel="nofollow"
            >
              Book an Appointment
            </a>
          </div>
          <div className="social-banner">
            <h1>Connect With Dogz4Life!</h1>
            <div className="social-contact">
              <SocialIcon url="https://www.facebook.com/dogz4lifeaus/" />
              <SocialIcon url="https://www.instagram.com/dogz4lifeaus/" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
