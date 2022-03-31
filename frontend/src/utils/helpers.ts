import saveAs from 'file-saver';

export const getConfigFile = (documentType: string) => {
  switch (documentType) {
    case 'Covering Letter':
      return {
        title: 'Covering Letter',
        remarks: 'Covering Letter Remarks',
      };

    case 'Bill Of Lading':
      return {
        blNumber: 'Bill Of Lading Number',
        companyName: 'Company Name',
      };

    case 'Own Configuration':
      return {
        field1: 'Field 1',
        field2: 'Field 2',
        field3: 'Field 3',
      };

    default:
      break;
  }
};

export const downloadJsonDataFile = (jsonTemplate: any): void => {
  const jsonData = JSON.stringify(jsonTemplate);

  const jsonBlob = new Blob([jsonData], { type: 'text/json;charset=utf-8' });
  saveAs(jsonBlob, 'configured-data.json');
};
