async function createNewDataset(){
    var setName = await Notifications.input("Dataset name:");
    var varName = setName.toString().toLowerCase().replaceAll(" ", "");
    Datasets.push(new Data(setName));

    document.getElementById("datasets").innerHTML += 
    `
    <div class="dataset" onclick="selectDataset('${setName}')"id="dataset-${varName}">
        <h3>${setName}</h3>
    </div>
    `
}
