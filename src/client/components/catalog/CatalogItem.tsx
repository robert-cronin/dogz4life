import React from "react";
import { Checkbox, Select } from "antd";
import { CatalogItemData, CatalogItemVariation } from "../../pages/NewBooking";

interface CatalogItemProps {
  option: CatalogItemData;
  onCheckboxClick: (id: string) => void;
  onVariationSelect: (itemId: string, variationId: string) => void;
}

class CatalogItem extends React.Component<CatalogItemProps, any> {
  render() {
    console.log(this.props.option.variations.map(o => o.name));
    return (
      <div
        key={this.props.option.id}
        className="catalog-item"
        style={{
          border: "3px solid purple",
          padding: "20px",
          margin: "10px",
          width: "100%",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p>{this.props.option.name}</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            ${this.props.option.variations.length} Options - More Info
            <Select
              placeholder={"Select Variation"}
              onChange={(value) =>
                this.props.onVariationSelect(
                  this.props.option.id,
                  value.toString()
                )
              }
            >
              {this.props.option.variations.map((o) => {
                return (
                  <Select.Option value={o.name} key={o.id}>
                    {o.name}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        </div>
        <Checkbox checked={this.props.option.isSelected} onClick={() => this.props.onCheckboxClick(this.props.option.id)} />
      </div>
    );
  }
}

export default CatalogItem;
