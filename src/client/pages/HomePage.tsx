import React from "react";
import { Button } from "antd";
import TwoDogs from "../static/two-dogs.jpg";
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
          <div id="home-page-header">
            <img src={Logo} />
            <div>
              <h1 id="home-page-title">DOGZ 4 LIFE</h1>
              <h2 id="home-page-subtitle">FOR THE LOVE OF DOGZ</h2>
            </div>
          </div>
          <div
            className="action-banner"
            style={{
              backgroundImage: `url(${TwoDogs})`,
            }}
          >
            <span>
              A safe-haven where we understand that your dog means everything.
            </span>
            <a
              target="_top"
              className="square-payment"
              href="https://square.site/book/LMQY4941CGM9H/dogz-4-life"
              rel="nofollow"
            >
              Book Now
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
