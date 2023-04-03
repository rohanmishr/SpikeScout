//return 0 for errors
function throwErr(ex){
    try{return ex ?? 0}catch(e){return e}
}

function selectDataset(dataset){
    console.log("selecting dataset");
    var DATASET = findDatasetByName(dataset);
    $("#datgui").toggle();
    $("#datgui-title").html(DATASET.name);
    //render the viewing area with a table
    console.log("making table outline");
    var Table = `
        <table>
            <thead>
                @headings
            </thead>
            <tbody>
                @rows
            <tbody>
        </table>
    `;
    //replace tables
    console.log("filling table");
    var headings = "";
    headings += `<th>Team</th>`
    for(var i = 0; i < throwErr(DATASET.fields()).length; i++){
        headings += `<th>${DATASET.fields()[i]}</th>`;
    }
    Table = Table.replace("@headings", headings);
    var rows = "";
    for(var i = 0; i < DATASET.teams().length ?? 0; i++){
        var team = DATASET.teams()[i];
        var row = `<tr><td>${team}</td>`;
        for(var j = 0; j < DATASET.fields().length; j++){
            var field = DATASET.fields()[j];
            row += `<td>${DATASET.getVal(team, field) ?? "No data"}</td>`;
        }
        row += "</tr>";
        rows += row;
    }
    Table = Table.replace("@rows", rows);
    $("#view-table")[0].innerHTML = Table;
    renderAddTree(DATASET);
}

//render the adding area
function renderAddTree(DATASET){
    console.log("making add area");
    var list;
    var listItems = [];
    var fields = "";
    function Fields(team){
        for(var j = 0; j < DATASET.fields().length ?? 0; j++){
            var field = DATASET.fields()[j];
            fields += `<li><span class="caret">${field ?? ""}</span>
                <ul class="nested">
                    ${DATASET.getVal(team, field) ?? "No data"}
                </ul>
            </li>`;
        }
        var temp = fields;
        fields = "";
        return temp + `<button onclick='findDatasetByName("${DATASET.name}").setVal("293", window.prompt("Field name:"), "No data");'>Add Field</button>`;
    }
        for(var i = 0; i < DATASET.teams().length; i++){
            var team = DATASET.teams()[i];
            var listItem = `
            <li><span class="caret">${team ?? ""}</span>
                <ul class="nested">
                    ${Fields(team)}
                </ul>
            </li>
            `;
            listItems.push(listItem);
        }
        for(var i = 0; i < listItems.length; i++){
            list += listItems[i] ?? "";
        }
        $("#add-inner")[0].innerHTML = `
        <ul id='myUL'>${list ?? ""}
        </ul>
        <button onclick='addRobot(findDatasetByName("${DATASET.name}"))'>Add Team</button>`.replaceAll("undefined", "");

        //listen for clicks
        var toggler = document.getElementsByClassName("caret");
        for (var i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener("click", function() {
                this.parentElement.querySelector(".nested").classList.toggle("active");
                this.classList.toggle("caret-down");
            });
        }
}

//toggle view
function switchView(){
    $("#add").toggle();
    $("#view").toggle();
}

//add a robot to the dataset
function addRobot(DATASET){
    var num = window.prompt("Team #:");
    DATASET.initTeam(num);
    renderAddTree(DATASET);
}

//add a field to the dataset
function addField(setName){
    var FIELD = window.prompt("Field name:");
    findDatasetByName(setName).setVal("293", FIELD.toString(), "No data");
    renderAddTree(findDatasetByName(setName));
}