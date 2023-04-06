//return 0 for errors
function throwErr(ex) {
	try {
		return ex ?? 0
	} catch (e) {
		return e
	}
}

function selectDataset(dataset) {
	console.log("selecting dataset");
	var DATASET = findDatasetByName(dataset);
	$("#datgui").toggle();
	$("#datgui-title").html(DATASET.name);
	renderTable(DATASET);
	renderTree(DATASET);
	SwitchButtons(DATASET);
}

//render the table
function renderTable(DATASET) {
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
	for (var i = 0; i < throwErr(DATASET.fields()).length; i++) {
		headings += `<th>${DATASET.fields()[i]}</th>`;
	}
	Table = Table.replace("@headings", headings);
	var rows = "";
	for (var i = 0; i < DATASET.teams().length ?? 0; i++) {
		var team = DATASET.teams()[i];
		var row = `<tr><td>${team}</td>`;
		for (var j = 0; j < DATASET.fields().length; j++) {
			var field = DATASET.fields()[j];
			row += `<td>${DATASET.getVal(team, field) ?? "No data"}</td>`;
		}
		row += "</tr>";
		rows += row;
	}
	Table = Table.replace("@rows", rows);
	$("#view-table")[0].innerHTML = Table;
}

//remember the expanded states of the tree
var expanded = new Map();
//render the adding area
function renderTree(DATASET, init = true) {
	var list;
	var listItems = [];
	var fields = "";

	function Fields(team) {
		for (var j = 0; j < DATASET.fields().length ?? 0; j++) {
			var field = DATASET.fields()[j];
			fields += `<li><span class="caret">${field ?? ""}</span>
                <ul class="nested ${expanded.get(team) === "true" ? "active" : ""}">
                    ${DATASET.getVal(team, field) ?? "No data"}
                    <button class="edit-btn" onclick='
                        findDatasetByName("${DATASET.name}").setVal("${team}", "${field}", prompt("Enter new value:")),
                        renderTree(findDatasetByName("${DATASET.name}", false))'
                    >&#9998;</button>
                </ul>
            </li>`;
		}
		var temp = fields;
		fields = "";
		return temp + `<button class="add-btn" onclick='findDatasetByName("${DATASET.name}").addField()'>&#43;</button>`;
	}
	for (var i = 0; i < DATASET.teams().length; i++) {
		var team = DATASET.teams()[i];
		var listItem = `
            <li><span class="caret ${expanded.get(team) === true ? "caret-down" : ""}">${team ?? ""}</span>
                <ul class="nested ${expanded.get(team) === true ? "active" : ""}">
                    ${Fields(team)}
                </ul>
            </li>
            `;
		listItems.push(listItem);
	}
	for (var i = 0; i < listItems.length; i++) {
		list += listItems[i] ?? "";
	}
	$("#add-inner")[0].innerHTML = `
        <ul id='myUL'>${list ?? ""}
        </ul>
        <button class="add-btn" onclick='findDatasetByName("${DATASET.name}").addRobot()'>&#43;</button>
        <!--<button onclick="saveEdits()">Save Edits</button>!-->`
		.replaceAll("undefined", "");

	//listen for clicks
	var toggler = document.getElementsByClassName("caret");
	for (var i = 0; i < toggler.length; i++) {
		toggler[i].addEventListener("click", function() {
			this.parentElement.querySelector(".nested").classList.toggle("active");
			this.classList.toggle("caret-down");
			// Store the expanded state in a data attribute
			var nested = document.getElementsByClassName("nested");
			console.log(nested);
			for (var j = 0; j < nested.length; j++) {
				var isExpanded = nested[j].classList.contains("active");
				expanded.set(nested[j].parentElement.children[0].innerHTML, isExpanded);
			}
		});
	}
}

function SwitchButtons(dataset) {
	var html = `
	<button class="view-btn" onclick='switchView("view", "${dataset.name}")'>View</button>
    <button class="view-btn" onclick='switchView("add", "${dataset.name}")'>Add</button>
	<button class="view-btn" onclick='switchView("export", "${dataset.name}")'>Export</button>
	<button class="view-btn" onclick='switchView("analyze", "${dataset.name}")'>Analyze (WIP)</button>
    `;
	$("#view-buttons")[0].innerHTML = html;

	var html2 = `
	<button onclick="exportAsCSV(findDatasetByName('${dataset.name}'))">Export as CSV</button>
    <button onclick="exportAsJSON(findDatasetByName('${dataset.name}'))">Export as JSON</button>
	`
	$("#export-inner")[0].innerHTML = html2;
}

//toggle view
function switchView(view, set) {
	switch (view) {
		case "add":
			$("#add").show();
			$("#view").hide();
			$("#export").hide();
			$("#analyzer").hide();
			break;
		case "view":
			$("#add").hide();
			$("#view").show();
			$("#export").hide();
			$("#analyzer").hide();
            renderTable(findDatasetByName(set.toString()));
			break;
		case "export":
			$("#add").hide();
			$("#view").hide();
			$("#export").show();
			$("#analyzer").hide();
			break;
		case "analyze":
			$("#add").hide();
			$("#view").hide();
			$("#export").hide();
			$("#analyzer").show();
			renderAnalyzers(findDatasetByName(set.toString()));
	}
}

/*document.getElementById("datasets").innerHTML += 
    `
        <div class="dataset" onclick="selectDataset('Test Set')"id="dataset-testset}">
            <h3>Test Set</h3>
        </div>
    `;*/

//save edits
function saveEdits() {
	//TODO
}