import React from "react";
import moment from "moment";
import CatalogItem from "./CatalogItem";
import { CatalogItemData, CatalogItemVariation } from "../../pages/NewBooking";

interface CatalogItemListProps {
  options: CatalogItemData[];
  setSelectedOptions: () => {
    
  }
}

interface CatalogItemListState {
}

class CatalogItemList extends React.Component<
  CatalogItemListProps,
  CatalogItemListState
> {
  state = {
    error: "",
    isLoaded: false,
  };

  

  render() {
    return (
      <ul id="catalog-list">
        {this.props.options.map((itemOptions) => {
          return (
            <CatalogItem
              options={itemOptions}
              onCheckboxClick={(id) => {
                const index = this.props.options.findIndex((v) => v.id == id);
                const item = { ...this.props.options[index] };
                item.checked = !item.checked;
                this.setState({
                  options: [
                    ...this.props.options.slice(undefined, index),
                    item,
                    ...this.props.options.slice(index + 1),
                  ],
                });
              }}
            />
          );
        })}
      </ul>
    );
  }
}

export default CatalogItemList;
