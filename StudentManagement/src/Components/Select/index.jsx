import React, { useEffect, useState } from "react";
import { SelectStyle } from "./style";

export const Select = ({ placeholder, error, option, onChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(placeholder);

  useEffect(() => {
    const onClose = () => setIsOpen(false);

    window.addEventListener("click", onClose);

    return () => {
      window.removeEventListener("click", onClose);
    };
  }, []);

  const handleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickLabel = (index) => (event) => {
    setLabel(option[index].label);
    // setValueSelectInForm(ele.label)
    onChange({ target: { value: option[index].value } });
  };

  return (
    <SelectStyle className="select" onClick={(e) => handleOpen(e)}>
      <div className="form-control head">{label}</div>
      <div className="sub" style={{ display: isOpen ? "block" : "none" }}>
        {option.map((e, i) => (
          <a className="form-control" key={e.value} onClick={handleClickLabel(i)}>
            {e.label}
          </a>
        ))}
      </div>
    </SelectStyle>
  );
};
