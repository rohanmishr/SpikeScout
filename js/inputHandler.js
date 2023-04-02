function addTeam() {
    var inputData = document.getElementById("teamName").value;
    var listItem = document.createElement("li");
    var deleteButton = document.createElement("button");
    
    listItem.innerText = inputData;
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function() {
      inputData.removeChild(listItem);
    };

    listItem.appendChild(deleteButton);
    inputData.appendChild(listItem);
  }