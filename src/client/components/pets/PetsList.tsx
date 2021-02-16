import React from "react";
import { PetInfo } from "../../pages/Pets";
import PetSummary from "./PetSummary";

interface PetsListProps {
  petsInfos: PetInfo[];
}
interface PetsListState {}

class PetsList extends React.Component<PetsListProps, PetsListState> {
  constructor(props: PetsListProps | Readonly<PetsListProps>) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
        }}
      >
        {this.props.petsInfos.map((p) => (
          <PetSummary
            petInfo={p}
            onEditClick={(id: string) => console.log(id + " was clicked")}
            key={p.id}
          />
        ))}
      </div>
    );
  }
}

export default PetsList;
