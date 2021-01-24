import React from "react";
import { CatalogItemOptions } from "./CatalogItemList";

interface CatalogItemProps {
  options: CatalogItemOptions;
}

class CatalogItem extends React.Component<CatalogItemProps, any> {
  render() {
    return (
      <div className="catalog-item">
        <p>{this.props.options.title}</p>
        <div>${} - {}</div>
      </div>
    );
  }
}

export default CatalogItem;
