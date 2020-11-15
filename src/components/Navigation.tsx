import React from 'react'
import { Menu } from 'antd';
import {
  CalendarFilled,
  HomeFilled,
  InfoCircleFilled,
  PhoneFilled,
  CustomerServiceFilled,
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

class Navigation extends React.Component {
  render() {
    return (
      <Menu
        defaultSelectedKeys={['/']}
        defaultOpenKeys={['services']}
        mode="horizontal"
        theme="dark"
        multiple={false}
      >
        <Menu.Item key="/" icon={<HomeFilled />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/about" icon={<InfoCircleFilled />}>
          About Us
          </Menu.Item>
        <Menu.Item key="/contact" icon={<PhoneFilled />}>
          Contact
          </Menu.Item>
        <Menu.Item key="/booking/new" icon={<CalendarFilled />}>
          <Link to="/client/new">Book</Link>
        </Menu.Item>
        <SubMenu key="services" icon={<CustomerServiceFilled />} title="Services">
          <Menu.Item key="/about/grooming" icon={<CustomerServiceFilled />}>Grooming</Menu.Item>
          <Menu.Item key="/about/massage" icon={<CustomerServiceFilled />}>Massage</Menu.Item>
          <Menu.Item key="/about/training" icon={<CustomerServiceFilled />}>Training</Menu.Item>
          <Menu.Item key="/about/nutrition" icon={<CustomerServiceFilled />}>Nutrition</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}


export default Navigation