import { cn } from "../../utils";
import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const Radio = ({ children, ...props }) => {
  const { value, onChange } = useContext(Context);
  return (
    <div
      className="flex align-items-center mb-3"
      onClick={() => onChange(props.value)}
    >
      <input
        checked={props.value == value}
        className="form-control"
        type="radio"
        onChange={() => onChange(props.value)}
      />
      <label>{children}</label>
    </div>
  );
};

Radio.Toggle = ({ children, ...props }) => {
  const { value, onChange } = useContext(Context);
  return (
    <label
      className={cn("btn btn-rounded", {
        active: props.value === value,
      })}
      onClick={() => onChange(props.value)}
    >
      <input
        type="radio"
        name="gender"
        checked={props.value === value}
        onChange={() => onChange(props.value)}
      />
      {children}
    </label>
  );
};

Radio.Group = ({ children, defaultValue, toggle, ...props }) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (_value) => {
    if (toggle && _value === value) {
      setValue();
      props?.onChange?.();
      return;
    }
    setValue(_value);
    props?.onChange?.(_value);
  };

  return (
    <Context.Provider value={{ value, onChange }}>{children}</Context.Provider>
  );
};
