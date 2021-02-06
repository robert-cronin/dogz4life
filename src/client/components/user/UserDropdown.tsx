import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

interface UserDropdownProps {
  userProfile: any;
}

class UserDropdown extends React.Component<UserDropdownProps, any> {
  constructor(props) {
    super(props);
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1" icon={<ProfileOutlined />}>
          My Information
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          Manage Pets
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<LogoutOutlined />}
          onClick={() => window.location.replace("/logout")}
        >
          Logout
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <div>
          <span style={{ paddingRight: "5px", color: "white" }}>
            {this.props.userProfile.nickname}
          </span>
          <Avatar
            src={
              this.props.userProfile.picture ? (
                this.props.userProfile.picture
              ) : (
                <UserOutlined />
              )
            }
          />
        </div>
      </Dropdown>
    );
  }
}

export default UserDropdown;
