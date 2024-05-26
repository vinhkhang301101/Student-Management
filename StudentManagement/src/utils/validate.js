/**
 * @param {*} rules
 * @param {*} forms
 * @returns plan error object
 */

const ERROR_MESSAGE = {
  required: "Please fill in this field!",
  regexp: "Invalid format!",
  compulsory: "Invalid role!",
  minMax: (min) => `This field is at least ${min} characteristic!`,
  confirm: (field) => `Please enter the same as ${field}!`,
};

const REGEXP = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  date: /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/
};

export const validate = (rules, forms) => {
  const errorObject = {};
  for (let name in rules) {
    for (let rule of rules[name]) {
      if (typeof rule === "function") {
        const err = rule(forms[name], forms);
        if (err) {
          errorObject[name] = err;
          break;
        }
      }

      if (rule.required) {
        if (typeof forms[name] !== "boolean" && !forms[name]?.trim() || typeof forms[name] === "boolean" && !forms[name]) {
          errorObject[name] = rule.message || ERROR_MESSAGE.required;
          break;
        }
      }

      if (rule.regexp && forms[name]) {
        let regexp = rule.regexp;
        if (regexp in REGEXP) {
          regexp = REGEXP[regexp];
        } else if (!(regexp instanceof RegExp)) {
          regexp = new RegExp();
        }

        if (!regexp.test(forms[name])) {
          errorObject[name] = rule.message || ERROR_MESSAGE.regexp;
        }
      }

      if (rule.min || rule.max) {
        if (forms[name]?.length < rule.min || forms[name]?.length > rule.max) {
          errorObject[name] =
            rule.message || ERROR_MESSAGE.minMax(rule.min, rule.max);
        }
      }

      if (rule.confirm) {
        if (forms[rule.confirm] != forms[name]) {
          errorObject[name] =
            rule.message || ERROR_MESSAGE.confirm(rule.confirm);
        }
      }
    }
  }
  return errorObject;
};

export const required = (message) => {
  return {
    required: true,
    message,
  };
};

export const regexp = (pattern, message) => {
  return {
    regexp: pattern,
    message,
  };
};

export const minMax = (min, max, message) => ({
  min, max, message
});

export const confirm = (field) => ({
  confirm: field,
});
