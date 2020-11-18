const fs = require("fs");
const loadUserData = () => {
  return JSON.parse(fs.readFileSync("user-data.json").toString());
};
const updateUserData = (key, value) => {
    const data = loadUserData();
    data[key] = value;
    fs.writeFileSync("user-data.json", JSON.stringify(data));
}
module.exports = {
    loadUserData,
    updateUserData
}