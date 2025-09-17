type DataObject = { [key: string]: unknown };
type Data = DataObject | DataObject[];

function saveData(local: string, data: Data) {
  const stringData = JSON.stringify(data);

  localStorage.setItem(local, stringData);

  return data;
}

function getData(local: string) {
  const stringData = localStorage.getItem(local);

  if (stringData) return JSON.parse(stringData);
  else return null;
}

function removeData(local: string) {
  localStorage.removeItem(local);
}

const localDatabase = {
  set: saveData,
  get: getData,
  remove: removeData,
};

export default localDatabase;
