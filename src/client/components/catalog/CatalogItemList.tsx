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
  options: CatalogItemOptions[];
  error: string;
}

class CatalogItemList extends React.Component<any, CatalogItemListState> {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      isLoaded: false,
      options: [],
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
            options: result
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
        {this.state.options.map((itemOptions) => {
          return <CatalogItem options={itemOptions} onCheckboxClick={(id) => {
            const index = this.state.options.findIndex(v => v.id == id)
            const item = {...this.state.options[index]}
            item.checked = !item.checked
            this.setState({
              options: [...this.state.options.slice(undefined, index), item, ...this.state.options.slice(index+1)]
            })
          }} />;
        })}
      </ul>
    );
  }
}

export default CatalogItemList;
export { CatalogItemOptions };
