import React from "react";
import { Layout } from "antd";
import BrownDog from "../static/brown-dog.jpg";
import FluffyDog from "../static/fluffy-dog.jpg";

class AboutUs extends React.Component {
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

    const imageSize = "30vw";
    return (
      <div>
        <div
          style={{
            height: imageSize,
            width: "100%",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${FluffyDog})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "100%",
              width: imageSize,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "left",
              maxWidth: "500px",
              paddingLeft: "80px",
              fontSize: "20px",
            }}
          >
            <h1>Enrichment is Our Main Focus</h1>
            <p>
              We're proud to offer services that enrich your fury friend's life
              and give them the occasional pampering that they deserve.
            </p>
          </div>
        </div>
        <div
          style={{
            height: imageSize,
            width: "100%",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "left",
              maxWidth: "500px",
              paddingRight: "80px",
              fontSize: "20px",
            }}
          >
            <h1>From Our Family to Yours</h1>
            <p>
              Our fury friends are a part of our family. As dog owners, we pride
              ourselves on giving your dog the love and attention that you give
              them. Each groom and training session is done with your pet's
              comfort level in mind.
            </p>
          </div>
          <div
            style={{
              backgroundImage: `url(${BrownDog})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "100%",
              width: imageSize,
            }}
          />
        </div>
      </div>
    );
  }
}

export default AboutUs;
