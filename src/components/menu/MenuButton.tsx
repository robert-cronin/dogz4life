import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

interface MenuButtonProps {
    icon: React.ReactNode
    text: string
    route: string
}

class MenuButton extends React.Component<MenuButtonProps, any> {
  render() {
    return (
        <div className="menu-button">
            {this.props.icon}
            <Link to={this.props.route}>{this.props.text}</Link>
        </div>
    );
  }
}

export default MenuButton;
