import React from "react";
import CatalogItem from "./CatalogItem";

interface CatalogItemOptions {
  checked: boolean;
  title: string;
  description: string;
  options: string[];
  selectedOptionIndex: number;
}

interface CatalogItemListState {
  isLoaded: boolean;
  items: CatalogItemOptions[];
  error: string;
}

class CatalogItemList extends React.Component<any, CatalogItemListState> {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("/api/catalog/list")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);

          this.setState({
            isLoaded: true,
            items: result
            .filter(i => {
              return i.type == "ITEM"
            })
            .map(i => {
              console.log(i);

              const item: CatalogItemOptions = {
                title: i.itemData?.name ?? "",
                description: i.itemData?.description ?? "",
                checked: true,
                options: [],
                selectedOptionIndex: 0,
              };
              return item;
            }),
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    return (
      <ul id="catalog-list">
        {this.state.items.map((itemOptions) => {
          return <CatalogItem options={itemOptions} />;
        })}
      </ul>
    );
  }
}

export default CatalogItemList;
export { CatalogItemOptions };
