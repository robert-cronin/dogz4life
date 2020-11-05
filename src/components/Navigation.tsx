import React from 'react'
import { Menu, Button } from 'antd';
import {
  CalendarFilled,
  HomeFilled,
  InfoCircleFilled,
  PhoneFilled,
  CustomerServiceFilled,
} from '@ant-design/icons';

const { SubMenu } = Menu;

class Navigation extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div>
        {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button> */}
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="horizontal"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<HomeFilled />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<InfoCircleFilled />}>
            About Us
          </Menu.Item>
          <Menu.Item key="3" icon={<PhoneFilled />}>
            Contact
          </Menu.Item>
          <Menu.Item key="4" icon={<CalendarFilled />}>
            Book
          </Menu.Item>
          <SubMenu key="sub1" icon={<CustomerServiceFilled />} title="Services">
            <Menu.Item key="5" icon={<CustomerServiceFilled />}>Grooming</Menu.Item>
            <Menu.Item key="6" icon={<CustomerServiceFilled />}>Therapy</Menu.Item>
            <Menu.Item key="7" icon={<CustomerServiceFilled />}>Training</Menu.Item>
            <Menu.Item key="8" icon={<CustomerServiceFilled />}>Nutrition</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}


export default Navigation