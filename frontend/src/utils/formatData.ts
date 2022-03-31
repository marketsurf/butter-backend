import { FormList } from '@mantine/form/lib/form-list/form-list';

export const formatData = (data: string[]) => {
  const formattedData = data.join();

  // remove all spaces
  const splitData = formattedData
    .split('\n')
    .filter((item) => item !== '' && !item.match(/^\s*$/));

  return splitData;
};

export const convertFormToJson = (
  formData: FormList<{
    key: string;
    value: string;
  }>,
) => {
  const jsonData: { [key: string]: string } = {};

  formData.forEach((item) => {
    jsonData[item.key] = item.value;
  });

  return {
    data: jsonData,
  };
};

export const convertJsonToForm = (jsonTemplate: any) => {
  const formData: {
    key: string;
    value: string;
  }[] = [];

  Object.keys(jsonTemplate).forEach((key) => {
    formData.push({
      key,
      value: jsonTemplate[key],
    });
  });

  return formData;
};
