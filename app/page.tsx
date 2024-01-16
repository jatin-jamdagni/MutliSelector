"use client";
import React, { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import Select, { ActionMeta } from "react-select";

interface Option {
  value: string;
  label: string;
}

const Home: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (
    selectedOptions: any,
    actionMeta: ActionMeta<Option>
  ) => {
    setSelectedOptions(selectedOptions as Option[]);
  };

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Backspace" && inputValue === "") {
      // If input is blank and Backspace is pressed, highlight the last selected option
      const lastOption = selectedOptions[selectedOptions.length - 1];
      if (lastOption) {
        event.preventDefault();
        setInputValue(lastOption.label);
      }
    }
  };

  const handleInputChangeSelect = (
    newValue: string,
    actionMeta: ActionMeta<Option>
  ) => {
    if (
      actionMeta.action === "remove-value" ||
      actionMeta.action === "pop-value"
    ) {
      // Handle the removal of the selected option
      const removedOption = actionMeta.removedValue;
      const newSelectedOptions = selectedOptions.filter(
        (option) => option.value !== removedOption?.value
      );
      setSelectedOptions(newSelectedOptions);
    }
  };

  const customStyles = {
    multiValue: (base: any, state: any) => {
      return state.data.label === inputValue
        ? { ...base, backgroundColor: "#c0c0c0" }
        : base;
    },
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <form>
        <Select
          placeholder="Choose tags ..."
          name="tags[]"
          isMulti
          value={selectedOptions}
          options={[
            { value: "Engineering", label: "Engineering" },
            { value: "Carpentry", label: "Carpentry" },
            { value: "Plumbing", label: "Plumbing" },
            { value: "Electrical", label: "Electrical" },
            { value: "Mechanical", label: "Mechanical" },
            { value: "HVAC", label: "HVAC" },
          ]}
          onInputChange={handleInputChange}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          styles={customStyles}
        />
      </form>
    </div>
  );
};

export default Home;
