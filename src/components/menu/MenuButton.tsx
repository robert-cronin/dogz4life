import React from "react";
import { Link } from "react-router-dom";

interface MenuButtonProps {
  icon: React.ReactNode;
  text: string;
  route: string;
  onButtonClick: () => void;
}

class MenuButton extends React.Component<MenuButtonProps, any> {
  render() {
    return (
      <div className="menu-button">
        {this.props.icon}
        <Link to={this.props.route} onClick={() => this.props.onButtonClick()}>
          {this.props.text}
        </Link>
      </div>
    );
  }
}

export default MenuButton;
