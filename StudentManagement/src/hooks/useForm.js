/**
 *
 * @param {*} rules
 * @returns values, errors, register, validate
 */

import { validate } from "../utils/validate";
import { useEffect, useState } from "react";

export const useForm = (
  rules,
  { initialValue = {}, dependencies = {} } = {}
) => {
  const [values, setValues] = useState(initialValue);
  const [error, setError] = useState({});

  useEffect(() => {
    setValues(initialValue);
  }, [JSON.stringify(initialValue)]);

  const register = (name) => {
    return {
      error: error[name],
      value: values[name] || "",
      onChange: (ev) => {
        let _values = { ...values, [name]: ev.target.value };
        const _errorObj = {};

        if (rules[name]) {
          _errorObj[name] = validate(
            {
              [name]: rules[name],
            },
            _values
          )[name];
        }
        if (dependencies[name]) {
          for (let dependency of dependencies[name]) {
            _errorObj[dependency] = validate(
              {
                [dependency]: rules[dependency],
              },
              _values
            )[dependency];
          }
        }

        setError((prev) => ({ ...prev, ..._errorObj }));
        setValues((prev) => ({ ...prev, [name]: ev.target.value }));
      },
    };
  };

  const _validate = () => {
    const errorObject = validate(rules, values);
    setError(errorObject);
    return Object.keys(errorObject).length === 0;
  };

  const reset = () => {
    setValues({});
  };

  return {
    values,
    error,
    setValues,
    register,
    validate: _validate,
    reset,
  };
};
