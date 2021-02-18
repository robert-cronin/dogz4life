import React from "react";
import moment from 'moment';
import { Button } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import PetsList from "../components/pets/PetsList";
import FluffyDog from "../static/fluffy-dog.jpg";
import NewPetModal, { PetInfoDetails, PetInfoDetailsBody } from "../components/pets/new-pet/NewPetModal";

interface PetInfo {
  id: string;
  name: string;
  type: string;
}

interface PetsProps {}
interface PetsState {
  isLoading: boolean;
  error?: string;
  petInfos: PetInfo[];
}

class Pets extends React.Component<PetsProps, PetsState> {
  constructor(props: PetsProps | Readonly<PetsProps>) {
    super(props);
    this.state = {
      isLoading: false,
      petInfos: [
        // { id: "1", name: "Lil Puppy", type: "Jack Russel" },
        // { id: "2", name: "Sandy", type: "Great Dane" },
        // { id: "3", name: "MeiMei", type: "Abisynia" },
      ],
    };
  }

  async loadPetsList() {
    return await new Promise<void>((resolve, reject) => {
      this.setState({isLoading: true})
      fetch("/api/pets/list")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoading: false,
              petInfos: result
                .map((i: PetInfoDetailsBody) => {
                  const infos: PetInfoDetails = {
                    name: i.name,
                    type: i.type,
                    gender: i.gender,
                    desexed: i.desexed ? (i.desexed == 1) : undefined,
                    weight: i.weight,
                    coatColor: i.coatColor,
                    birthday: i.birthday ? moment(i.birthday) : undefined,
                    allergies: i.allergies,
                    additionalGeneralNotes: i.additionalGeneralNotes,
                    vaccinationRecord: i.vaccinationRecord,
                    dateAdministered: i.dateAdministered ? moment(i.dateAdministered) : undefined,
                    dateNextDue: i.dateNextDue ? moment(i.dateNextDue) : undefined,
                    healthFlags: i.healthFlags ? JSON.parse(window.atob(i.healthFlags)) : undefined,
                    additionalHealthNotes: i.additionalHealthNotes,
                  };
                  return infos;
                }),
            });
            resolve()
          },
          (error) => {
            this.setState({
              isLoading: false,
              error,
            });
            reject(error)
          }
        );
    })
  }

  componentDidMount() {
    this.loadPetsList()
  }

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
          <NewPetModal />
        </div>
        <PetsList petsInfos={this.state.petInfos} />
      </div>
    );
  }
}

export default Pets;
export { PetInfo };
