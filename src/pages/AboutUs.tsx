import React from "react";
import Banner from "../components/Banner";
import Logo from "../static/dogz4lifelogo.jpg";
import Bella from "../static/bella.jpg";
import Benni from "../static/benni-silly.jpg";
import { Layout, BackTop, Row, Col, Image, List, Button } from "antd";
import {
  UpCircleOutlined,
  CalendarOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
const { Header, Footer, Content } = Layout;

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
    return (
      <>
        <Banner odd style={{ height: "100%" }}>
          <Row
            gutter={[24, 0]}
            style={{ height: "100%", position: "relative" }}
            justify="space-around"
            align="middle"
          >
            <Col
              span={12}
              style={{
                textAlign: "center",
              }}
            >
              <p className="text-4xl font-mono">Dogs for life</p>
              <p className="text-2xl font-mono">Your dog deserves the best.</p>
              <Button type="primary" icon={<CalendarOutlined />}>
                Book Now
              </Button>
            </Col>
            <Col
              span={12}
              style={{
                height: "100%",
                backgroundImage: `url(${Logo})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
            <Button
              style={{
                position: "absolute",
                bottom: "20px",
                zIndex: 1,
                borderRadius: "200px",
              }}
              icon={<CaretDownOutlined />}
            ></Button>
          </Row>
        </Banner>
        <Banner even style={{ height: "100%" }}>
          <Row
            gutter={[24, 0]}
            style={{ height: "100%" }}
            justify="space-around"
            align="middle"
          >
            <Col
              span={12}
              style={{
                height: "100%",
                backgroundImage: `url(${Bella})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
            <Col
              span={12}
              style={{
                textAlign: "center",
              }}
            >
              <p className="text-5xl font-mono">
                Take care of your pet in 3 simple steps
              </p>
              <List
                dataSource={threeSteps}
                renderItem={(item) => (
                  <List.Item>
                    <p className="text-xl font-mono">{item}</p>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Banner>
        <Banner odd style={{ height: "100%" }}>
          <Row
            gutter={[24, 0]}
            style={{ height: "100%" }}
            justify="space-around"
            align="middle"
          >
            <Col
              span={12}
              style={{
                textAlign: "center",
              }}
            >
              <p className="text-4xl font-mono">
                We love your pets as much as you do!
              </p>
              <p className="text-2xl font-mono">
                Treat your best friend with a groom or massage, up their skills
                with a training session or get a tailoured nutrition plan.
              </p>
            </Col>
            <Col
              span={12}
              style={{
                height: "100%",
                backgroundImage: `url(${Benni})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
          </Row>
        </Banner>
        <Banner even></Banner>
        <Banner odd></Banner>
      </>
    );
  }
}

export default AboutUs;
