export default {
  // Pass as function to process entire repo instead of only staged.
  "*": () => ["yarn run check-types", "yarn run format", "yarn run lint"],
};
