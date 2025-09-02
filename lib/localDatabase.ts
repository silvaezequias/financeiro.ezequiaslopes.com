function saveData(local: string, data: { [key: string]: unknown }) {
  const stringData = JSON.stringify(data);

  localStorage.setItem(local, stringData);

  return data;
}

function getData(local: string) {
  const stringData = localStorage.getItem(local);

  if (stringData) return JSON.parse(stringData);
  else return null;
}

const localDatabase = {
  set: saveData,
  get: getData,
};

export default localDatabase;
