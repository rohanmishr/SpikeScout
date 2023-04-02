function createNewDataset(){
    var setName = window.prompt("Enter the name of the new dataset");
    Datasets.push(new Data(setName));
}