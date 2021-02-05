import React from "react";
import { Checkbox, Select, Button } from "antd";
import { CatalogItemData, CatalogItemVariation } from "../../pages/NewBooking";

interface CatalogItemProps {
  option: CatalogItemData;
  // validate: () => boolean;
  onCheckboxClick: (id: string) => void;
  onVariationSelect: (itemId: string, variationId: string) => void;
}
interface CatalogItemState {
  moreInfoVisible: boolean;
}

class CatalogItem extends React.Component<CatalogItemProps, CatalogItemState> {
  constructor(props: CatalogItemProps | Readonly<CatalogItemProps>) {
    super(props);

    this.state = {
      moreInfoVisible: false,
    };
  }
  render() {
    const moreInfoLink = (
      <Button
        onClick={() =>
          this.setState({ moreInfoVisible: !this.state.moreInfoVisible })
        }
        style={{ padding: "1px" }}
        type="link"
      >
        More Info
      </Button>
    );
    return (
      <div
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
          {this.props.option.variations.length == 1 ? (
            <span>1 Option - {moreInfoLink}</span>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                {this.props.option.variations.length} Options - {moreInfoLink}
              </div>
              <Select
                placeholder={"Select Variation"}
                onChange={(value) => {
                  console.log(value);
                  console.log(value);

                  this.props.onVariationSelect(
                    this.props.option.id,
                    value.toString()
                  );
                }}
              >
                {this.props.option.variations.map((o) => {
                  return (
                    <Select.Option value={o.id} key={o.id}>
                      {o.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          )}
          <div>
            <br />
            <div
              style={{
                padding: "10px",
                border: "1px solid gray",
                borderRadius: "8px",
              }}
              hidden={!this.state.moreInfoVisible}
            >
              {this.props.option.description}
            </div>
          </div>
        </div>
        <Checkbox
          checked={this.props.option.isSelected}
          onClick={() => {
            if (this.props.option.variations.length == 1) {
              this.props.onVariationSelect(this.props.option.id, this.props.option.variations[0]?.id);
            } else {
              this.props.onCheckboxClick(this.props.option.id);
            }
          }}
        />
      </div>
    );
  }
}

export default CatalogItem;
