import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const EditableField = (props) => {
  const [inputValue, setInputValue] = useState(props.cellData.value);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    props.onItemizedItemEdit(e);
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setInputValue(selectedValue);
    props.onItemizedItemEdit({
      target: {
        name: props.cellData.name,
        value: selectedValue,
        id: props.cellData.id,
      },
    });
  };

  return (
    <InputGroup className="my-1 flex-nowrap">
      {props.cellData.leading != null && (
        <InputGroup.Text className="bg-light fw-bold border-0 text-secondary px-2">
          <span
            className="d-flex align-items-center justify-content-center small"
            style={{ width: "20px", height: "20px" }}
          >
            {props.cellData.leading}
          </span>
        </InputGroup.Text>
      )}
      {props.cellData.name === "itemName" && props.options ? (
        <>
          <Form.Control
            as="select"
            value=""
            onChange={handleSelectChange}
            className="me-1"
          >
            <option value="">Select an item</option>
            {props.options.map((option, index) => {
              if (option.itemName !== "") {
                return (
                  <option key={index} value={option.itemName}>
                    {option.itemName}
                  </option>
                );
              }
            })}
          </Form.Control>
          <Form.Control
            type="text"
            placeholder={props.cellData.placeholder}
            name={props.cellData.name}
            id={props.cellData.id}
            value={inputValue}
            onChange={handleInputChange}
            required
          />
        </>
      ) : (
        <Form.Control
          className={props.cellData.textAlign}
          type={props.cellData.type}
          placeholder={props.cellData.placeholder}
          min={props.cellData.min}
          name={props.cellData.name}
          id={props.cellData.id}
          value={props.cellData.value}
          step={props.cellData.step}
          precision={props.cellData.precision}
          aria-label={props.cellData.name}
          onChange={props.onItemizedItemEdit}
          required
        />
      )}
    </InputGroup>
  );
};

export default EditableField;
