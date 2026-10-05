const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "data", "database.json");

function bacaDatabase() {
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

function simpanDatabase(data) {
    fs.writeFileSync(
        file,
        JSON.stringify(data, null, 2),
        "utf8"
    );
}

module.exports = {
    bacaDatabase,
    simpanDatabase
};
