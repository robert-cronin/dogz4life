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
        defaultSelectedKeys={['/home']}
        defaultOpenKeys={['services']}
        mode="horizontal"
        theme="dark"
        multiple={false}
      >
        <Menu.Item key="/home" icon={<HomeFilled />}>
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="/about" icon={<InfoCircleFilled />}>
          <Link to="/about">About Us</Link>
        </Menu.Item>
        <Menu.Item key="/contact" icon={<PhoneFilled />}>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
        <Menu.Item key="/booking/new" icon={<CalendarFilled />}>
          <Link to="/booking/new">Book</Link>
        </Menu.Item>
        <SubMenu key="services" icon={<CustomerServiceFilled />} title="Services">
          <Menu.Item key="/about/grooming" icon={<CustomerServiceFilled />}>
            <Link to="/about/grooming">Grooming</Link>
          </Menu.Item>
          <Menu.Item key="/about/massage" icon={<CustomerServiceFilled />}>
            <Link to="/about/massage">Massage</Link>
          </Menu.Item>
          <Menu.Item key="/about/training" icon={<CustomerServiceFilled />}>
            <Link to="/about/training">Training</Link>
          </Menu.Item>
          <Menu.Item key="/about/nutrition" icon={<CustomerServiceFilled />}>
            <Link to="/about/nutrition">Nutrition</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}


export default Navigation