let dbSize = 50 * 1024 * 1024; // 50MB
function createDB(name) {
  
  return name;
}
let db = openDatabase(name, '1.0', 'Team Data', dbSize);

function listAllDB() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM sqlite_master WHERE type="table"', [], function (tx, results) {
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
            console.log(results.rows.item(i));
          }
        }, null);
      }); 
}

function writeToDB(name) {
for (const [key, value] of Object.entries(findDatasetByName(name).data)) {
    db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS ' + key + ' (key, value)');
      const entries = value.data.entries();
      let next = entries.next();
      while (!next.done) {
        const [k, v] = next.value;
        tx.executeSql('INSERT INTO ' + key + ' (key, value) VALUES (?, ?)', [k, JSON.stringify(v)]);
        next = entries.next();
      }
    });
  }
}
  
function printDB(name){
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + name, [], function (tx, results) {
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
            console.log(results.rows.item(i));
          }
        }, null);
      });
}

function addToDB(name, key, value) {
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO ' + name + ' (key, value) VALUES (?, ?)', [key, JSON.stringify(value)]);
    });
    return true;
}