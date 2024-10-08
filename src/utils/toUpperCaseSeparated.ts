export const toUpperCaseSeparated = (str: string) => {
  if (str === "sunLight20") return "SUN LIGHT 2.0";
  if (str === "iluminusBlond") return "ILUMINUS BLOND (FREE HANDS)";
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([0-9])([A-Z])/g, "$1 $2")
    .toUpperCase();
};
