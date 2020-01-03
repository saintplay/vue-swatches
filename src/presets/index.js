import basic from "./basic";
import textBasic from "./text-basic";
import textAdvanced from "./text-advanced";
import materialBasic from "./material-basic";

export default {
  basic: basic,
  "text-basic": textBasic,
  "text-advanced": textAdvanced,
  "material-basic": materialBasic
};

export const supportedProperties = [
  "swatches", // Required
  "borderRadius", // Optional String: '50px', '0', '40%'
  "rowLength", // Optional Integer: 5, 8, 6
  "swatchSize", // Optional Positive Number: 12.5, 36, 10
  "spacingSize", // Optional Positive Number: 20, 28.2, 40
  "showBorder" // Optional Boolean: true, false
];
