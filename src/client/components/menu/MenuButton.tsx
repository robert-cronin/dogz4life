import React from "react";
import { Link } from "react-router-dom";

interface MenuButtonProps {
  icon: React.ReactNode;
  text: string;
  route?: string;
  onButtonClick: () => void;
  id?: string;
}

class MenuButton extends React.Component<MenuButtonProps, any> {
  render() {
    return (
      <div
        className="menu-button"
        id={this.props.id}
        onClick={this.props.onButtonClick}
      >
        {this.props.icon}
        {this.props.route ? (
          <Link to={this.props.route} style={{ color: "inherit" }}>
            {this.props.text}
          </Link>
        ) : (
          <span
            style={{ color: "inherit" }}
          >
            {this.props.text}
          </span>
        )}
      </div>
    );
  }
}

export default MenuButton;
