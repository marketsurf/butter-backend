export const formatData = (data: string[]) => {
  console.log(data);
  const formattedData = data.join();

  // remove all spaces
  const splitData = formattedData
    .split('\n')
    .filter((item) => item !== '' && !item.match(/^\s*$/));

  return splitData;
};
