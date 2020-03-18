import basic from "./basic";
import textBasic from "./text-basic";
import textAdvanced from "./text-advanced";

export { basic, textBasic, textAdvanced };

export default {
  basic: basic,
  "text-basic": textBasic,
  "text-advanced": textAdvanced
};

export const supportedProperties = [
  "colors", // Required
  "borderRadius", // Optional String: '50px', '0', '40%'
  "rowLength", // Optional Integer: 5, 8, 6
  "swatchSize", // Optional Positive Number: 12.5, 36, 10
  "spacingSize", // Optional Positive Number: 20, 28.2, 40
  "showBorder" // Optional Boolean: true, false
];
