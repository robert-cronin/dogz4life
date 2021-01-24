import React from "react";
import CatalogItem from "./CatalogItem";

interface CatalogItemOptions {
  checked: boolean;
  title: string;
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
  }

  componentDidMount() {
    fetch("/api/catalog/list")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items.map((i) => {}),
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
          return (
            <li>
              <CatalogItem options={itemOptions} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CatalogItemList;
export { CatalogItemOptions };
