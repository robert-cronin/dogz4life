import React from "react";
import { Button } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import PetsList from "../components/pets/PetsList";
import FluffyDog from "../static/fluffy-dog.jpg";

interface PetInfo {
  id: string;
  name: string;
  type: string;
}

interface PetsProps {}
interface PetsState {
  petInfos: PetInfo[];
}

class Pets extends React.Component<PetsProps, PetsState> {
  constructor(props: PetsProps | Readonly<PetsProps>) {
    super(props);
    this.state = {
      petInfos: [
        { id: "1", name: "Lil Puppy", type: "Jack Russel" },
        { id: "2", name: "Sandy", type: "Great Dane" },
        { id: "3", name: "MeiMei", type: "Abisynia" },
      ],
    };
  }

  //   componentDidMount() {}

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          <h1>Pets</h1>
          <Button icon={<FileAddOutlined />}>New Pet</Button>
        </div>
        <PetsList petsInfos={this.state.petInfos} />
      </div>
    );
  }
}

export default Pets;
export { PetInfo };
