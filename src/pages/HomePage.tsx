import React from "react";
import Logo from "../static/only-tree-background.jpg";
import { Layout, BackTop, Row, Col, Image, List, Button } from "antd";
import { UpCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import Leaf from "../static/Leaf.svg";
const { Header, Footer, Content } = Layout;

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
          <div className="action-banner">some text</div>
        </div>
        <div>
          <img src={Leaf} id="animated-leaf-1" />
          <img src={Leaf} id="animated-leaf-2" />
          <img src={Leaf} id="animated-leaf-3" />
        </div>
      </>
    );
  }
}

export default HomePage;
