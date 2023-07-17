// PROBABLY NOT USING THIS ANYMORE




// https://stackoverflow.com/questions/10058814/get-data-from-fs-readfile/10058879#10058879
// http://techslides.com/convert-csv-to-json-in-javascript

// const fs = require("fs");
// const path = require("path");

// readData()
//   .then((data) => {
//     csvToJSON(data);
//   })
//   .then((jsonData) => {
//     writeFile(jsonData);
//   })
//   .catch((err) => {
//     console.error("Error converting csv to JSON:", err);
//   })
//   .catch((err) => {
//     console.error("Error reading data:", err);
//   });

// function readData() {
//   return new Promise((resolve, reject) => {
//     fs.readFile(
//       path.join(__dirname, "/scripts", "stock_basic_data.csv"),
//       "utf8",
//       (err, data) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         resolve(data);
//       }
//     );
//   });
// }

// function csvToJSON(csv) {
//   return new Promise((resolve, reject) => {
//     var lines = csv.split("\n");
//     var result = [];
//     var headers = lines[0].split(",");

//     for (var i = 1; i < lines.length; i++) {
//       var obj = {};
//       var currentline = lines[i].split(",");

//       for (var j = 0; j < headers.length; j++) {
//         obj[headers[j]] = currentline[j];
//       }

//       result.push(obj);
//     }

//     resolve(JSON.stringify(result));
//   });
// }

// function writeFile(csvData) {
//   fs.writeFile(
//     path.join(__dirname, "../frontend/src/features/stock", "stock_info.json"),
//     csvData,
//     (err) => {
//       if (err) throw err;
//     }
//   );
// }
