import React from "react";
import { Checkbox } from "antd";
import { CatalogItemOptions } from "./CatalogItemList";

interface CatalogItemProps {
  options: CatalogItemOptions;
}

class CatalogItem extends React.Component<CatalogItemProps, any> {
  render() {
    return (
      <div
        className="catalog-item"
        style={{
          border: "3px solid purple",
          padding: "20px",
          margin: "10px",
          width: "100%",
          borderRadius: "2px",
        }}
      >
        <Checkbox />
        <div>
          <p>{this.props.options.title}</p>
          <div>
            ${} - {}
          </div>
        </div>
      </div>
    );
  }
}

export default CatalogItem;
