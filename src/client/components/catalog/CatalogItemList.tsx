import React from "react";
import CatalogItem from "./CatalogItem";

interface CatalogItemOptions {
  id: string;
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
                id: i.id ?? "",
                title: i.itemData?.name ?? "",
                description: i.itemData?.description ?? "",
                checked: false,
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
          return <CatalogItem options={itemOptions} onCheckboxClick={(id) => {
            const index = this.state.items.findIndex(v => v.id == id)
            const item = {...this.state.items[index]}
            item.checked = !item.checked
            this.setState({
              items: [...this.state.items.slice(undefined, index), item, ...this.state.items.slice(index+1)]
            })
          }} />;
        })}
      </ul>
    );
  }
}

export default CatalogItemList;
export { CatalogItemOptions };
