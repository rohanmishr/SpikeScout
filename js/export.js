function exportAsCSV(DATASET){
    var csv = "";
    var fields = DATASET.fields();
    var teams = DATASET.teams();
    csv += "Team,";
    for(var i = 0; i < fields.length; i++){
        csv += fields[i] + ",";
    }
    csv += "\n";
    for(var i = 0; i < teams.length; i++){
        csv += teams[i] + ",";
        for(var j = 0; j < fields.length; j++){
            csv += DATASET.getVal(teams[i], fields[j]) + ",";
        }
        csv += "\n";
    }
    //download csv
    var file = new Blob([csv], {type: 'text/csv'});
    var a = document.createElement("a"),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = DATASET.name + ".csv";
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0);
}

function uploadDataset(){
    var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var text = reader.result;
        var lines = text.split("\n");
        var fields = lines[0].split(",");
        var dataset = new Data(fields[0]);
        for(var i = 1; i < fields.length; i++){
            dataset.addField(fields[i], "number");
        }
        for(var i = 1; i < lines.length; i++){
            var line = lines[i].split(",");
            var team = line[0];
            for(var j = 1; j < line.length; j++){
                dataset.setVal(team, fields[j], line[j]);
            }
        }
        Datasets.push(dataset);
        document.getElementById("datasets").innerHTML += 
        `
        <div class="dataset" onclick="selectDataset('${dataset.name}')"id="dataset-${dataset.name.toLowerCase().replaceAll(" ", "")}">
            <h3>${dataset.name}</h3>
        </div>
        `
    };
    reader.readAsText(file);
}

$("#file").change(function(){uploadDataset();});