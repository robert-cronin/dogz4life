import React from "react";
import { Button, Menu } from "antd";
import {
  CalendarFilled,
  HomeFilled,
  InfoCircleFilled,
  PhoneFilled,
  CustomerServiceFilled,
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import MenuButton from "./MenuButton";

const { SubMenu } = Menu;

class Navigation extends React.Component<any, any> {
  render() {
    console.log(this.props.location.pathname);
    return (
      <>
      <div id="nav-menu-container">
        <MenuButton icon={<HomeFilled />} text="Home" route="/home" />
      </div>
        <Menu
          selectedKeys={[this.props.location.pathname]}
          mode="horizontal"
          multiple={false}
          className="navigation"
        >
          <Menu.Item color="white" key="/home" icon={<HomeFilled />}>
            <Link color="white" to="/home">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/about" icon={<InfoCircleFilled />}>
            <Link to="/about">
              <span>About Us</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/contact" icon={<PhoneFilled />}>
            <Link to="/contact">
              <span>Contact</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/booking/new" icon={<CalendarFilled />}>
            <Link to="/booking/new">
              <span>Book</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/services" icon={<CustomerServiceFilled />}>
            <Link to="/services">
              <span>Services</span>
            </Link>
          </Menu.Item>
        </Menu>
      </>
    );
  }
}

export default withRouter((props) => <Navigation {...props} />);
