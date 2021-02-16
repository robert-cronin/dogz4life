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
const { Option } = Select;

class NewClientInfo extends React.Component {
  render() {
    return (
      <>
        <Form.Item label="Health Flags" name="healthflags">
          <Checkbox.Group>
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
              ].map((opt) => {
                return (
                  <Checkbox
                    value={opt}
                    style={{
                      width: "200px",
                      marginLeft: "5px",
                    }}
                  >
                    {opt}
                  </Checkbox>
                );
              })}
            </div>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="Health Flags" name="healthflags">
          <Checkbox.Group>
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
              ].map((opt) => {
                return (
                  <Checkbox
                    value={opt}
                    style={{
                      minWidth: "250px",
                      marginLeft: "5px",
                    }}
                  >
                    {opt}
                  </Checkbox>
                );
              })}
            </div>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <Form.Item label="Additional Notes" name="additionalnotes">
            <Input.TextArea rows={7} />
          </Form.Item>
        </Form.Item>
      </>
    );
  }
}

export default NewClientInfo;
