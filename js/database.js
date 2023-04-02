let dbSize = 50 * 1024 * 1024; // 50MB
let db = openDatabase('HashMapStorage', '1.0', 'Team Data', dbSize);

function writeToDB() {
for (const [key, value] of Object.entries(Datasets)) {
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
  
function printDB() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM tableName', [], function (tx, results) {
          var len = results.rows.length, i;
          for (i = 0; i < len; i++){
            console.log(results.rows.item(i));
          }
        }, null);
      });
      
}