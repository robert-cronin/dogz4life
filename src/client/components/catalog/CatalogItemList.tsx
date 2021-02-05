import React from "react";
import moment from "moment";
import CatalogItem from "./CatalogItem";
import { CatalogItemData, CatalogItemVariation } from "../../pages/NewBooking";

interface CatalogItemListProps {
  options: CatalogItemData[];
  selectOption: (itemId: string, variationId?: string) => void
}

interface CatalogItemListState {
}

class CatalogItemList extends React.Component<
  CatalogItemListProps,
  CatalogItemListState
> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul id="catalog-list" style={{
        width: '100%'
      }}>
        {this.props.options.map((itemOptions) => {
          return (
            <CatalogItem
            key={itemOptions.id}
              option={itemOptions}
              onCheckboxClick={(id: string) => this.props.selectOption(id)}
              onVariationSelect={(id: string, variationId: string) => this.props.selectOption(id, variationId)}
            />
          );
        })}
      </ul>
    );
  }
}

export default CatalogItemList;
