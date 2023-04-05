function findDatasetByName(name) {
  for(var i = 0; i < Datasets.length; i++){
    if(Datasets[i].name == name){
      return Datasets[i];
    }
  }
}
