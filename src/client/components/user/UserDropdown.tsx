import React from "react";
import { Dropdown, Menu } from "antd";

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
  }
  handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          1st menu item
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          2nd menu item
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          3rd menu item
        </Menu.Item>
      </Menu>
    );
    return <Dropdown.Button overlay={menu}>User</Dropdown.Button>;
  }
}

export default UserDropdown;
