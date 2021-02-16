import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Row,
  Col,
} from "antd";
import { PetInfoDetails } from "./NewPetModal";
const { Option } = Select;

interface PetHealthFlagsProps {
  petInfoDetails: PetInfoDetails;
  updatePetInfoDetails: (info: PetInfoDetails) => void;
}

class NewClientInfo extends React.Component<PetHealthFlagsProps, any> {
  render() {
    const createCheckBox = (opt: string) => {
      if (this.props.petInfoDetails.healthFlags?.has(opt)) {
        console.log(opt);
      }

      return (
        <Checkbox
          key={opt}
          checked={this.props.petInfoDetails.healthFlags?.has(opt)}
          onChange={(e) => {
            const newList: Set<string> = new Set(
              this.props.petInfoDetails.healthFlags
            );
            console.log(newList);

            if (newList.has(opt)) {
              // take out
              newList.delete(opt);
            } else {
              // add in
              newList.add(opt);
            }
            this.props.updatePetInfoDetails({
              ...this.props.petInfoDetails,
              healthFlags: newList,
            });
          }}
          style={{
            minWidth: "250px",
            marginLeft: "5px",
          }}
        >
          {opt}
        </Checkbox>
      );
    };
    return (
      <>
        <Form.Item label="Health Flags" name="healthflags">
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "space-between",
            }}
          >
            {[
              "Allergies",
              "Hip Dysplasia",
              "Anal Gland Issue",
              "Hot Spots",
              "Arthritis",
              "Incontinence",
              "Blind / Poor Vision",
              "Kidney Disease",
              "Collapsing Trachea",
              "Moles & Warts",
              "Deaf / Poor Hearing",
              "Pancreatitis",
              "Diabetic",
              "Prone to Ear Infections",
              "Difficulty Standing",
              "Sensitive Skin",
              "Epileptic",
              "Tooth Decay",
              "Heart Problems",
              "Tumors / Cysts",
            ].map((opt) => createCheckBox(opt))}
          </div>
        </Form.Item>
        <Form.Item label="Health Flags" name="healthflags">
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "space-between",
            }}
          >
            {[
              "Anxiety",
              "No Perfumes",
              "Cage Aggressive",
              "No Public Photos",
              "Fear Of Clippers",
              "Potential Aggression w/Animals",
              "Fear Of Dryer",
              "Potential Aggression w/People",
              "Fear Of Nail Clipping",
              "Prone to clipper burn",
              "Fear Of Water",
              "Senior Pet",
              "Heavy Shedding",
              "Table / Kennel Diver",
              "Hernia",
              "Team Lift",
              "High Energy",
              "Tends to chew",
              "History of Biting",
              "Timid / Shy",
              "Leash Required",
              "Vocal / Barker",
              "Nervous Soiler",
            ].map((opt) => createCheckBox(opt))}
          </div>
        </Form.Item>
        <Form.Item label="Additional Notes" name="additionalnotes">
          <Input.TextArea rows={7} />
        </Form.Item>
      </>
    );
  }
}

export default NewClientInfo;
