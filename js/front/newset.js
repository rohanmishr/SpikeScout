function createNewDataset(){
    var setName = window.prompt("Enter the name of the new dataset");
    var varName = setName.toLowerCase().replaceAll(" ", "");
    Datasets.push(new Data(setName));

    document.getElementById("datasets").innerHTML += 
    `
    <div class="dataset" onclick="selectDataset('${setName}')"id="dataset-${varName}">
        <h3>${setName}</h3>
    </div>
    `
}
