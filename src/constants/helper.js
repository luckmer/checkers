export const wallCreator = (DATA, POS) => DATA.filter(POS).map((el) => el._id);

export const dataFinder = (arr, finder) => arr.find(finder);

export const TargetType = (TYPE, POS) =>
  TYPE && TYPE.split(" ")[POS].replace(/[,]/g, "");
