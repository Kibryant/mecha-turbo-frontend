export const toCamelCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[- ](.)/g, (match, group1) => group1.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, "");
};
