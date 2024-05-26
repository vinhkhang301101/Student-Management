import React from "react";
import styled from "styled-components";

const ErrorText = styled.span`
  color: red;
  position: absolute;
  font-size: 0.8rem;
  font-style: italic;
  left: 30%;
  top: 100%;
`;

export default function Field({ label, error, required, type = "text", renderInput, ...props }) {
  // const _onChange = (ev) => {
  //   onChange?.(ev.target.value);
  // };

  return (
    <label>
      <p>{label}:</p>
      {renderInput ? (
        renderInput?.(props)
      ) : (
        <input
          {...props}
          type={type}
          // onChange={_onChange}
          className="form-control"
        />
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}
