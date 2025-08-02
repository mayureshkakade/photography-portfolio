export const getImageNumber = (name: string): number => {
  return Number(name.split('.')[0]);
};
