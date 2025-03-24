const fs = require('fs');
const db = require('./db'); // უნდა იმპორტირდეს თქვენი db.js ფაილი
const mysql = require('mysql');

// JSON ფაილის წაკითხვა
fs.readFile('C:/Users/User/Desktop/CineHub/cine-hub/src/data/ganrre.json', 'utf8', (err, data) => {
  if (err) {
    console.log('Error reading JSON file', err);
    return;
  }

  const genres = JSON.parse(data);

  // მონაცემების დამატება MySQL ბაზაში
  genres.forEach((genre) => {
    const query = 'INSERT INTO genres (name) VALUES (?)';
    db.query(query, [genre.name], (err, result) => {
      if (err) {
        console.log('Error inserting data into database', err);
      } else {
        console.log('Data inserted successfully', result);
      }
    });
  });
});
