import React from "react";
import { Checkbox, Select } from "antd";
import { CatalogItemOptions } from "./CatalogItemList";

interface CatalogItemProps {
  options: CatalogItemOptions;
  onCheckboxClick: (id: string) => void;
}

class CatalogItem extends React.Component<CatalogItemProps, any> {
  render() {
    return (
      <div
        onClick={() => this.props.onCheckboxClick(this.props.options.id)}
        key={this.props.options.id}
        className="catalog-item"
        style={{
          border: "3px solid purple",
          padding: "20px",
          margin: "10px",
          width: "100%",
          borderRadius: "2px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p>{this.props.options.title}</p>
          <div>
            ${} - {}
          </div>
        </div>
        <Checkbox checked={this.props.options.checked} />
      </div>
    );
  }
}

export default CatalogItem;
