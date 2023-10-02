export const displayTitle = (title: string) => {
  const nameList = title.split('-');
  return nameList.map((item) => item.trim());
};
