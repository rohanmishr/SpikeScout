//new Data() will initialize a new dataset
class Data{
    constructor(name){
        this.name = name;
        this.data = new Map();
        this.UNWANTED_FIELDS = [];
        this.score = new Map();
    }

    initTeam(num){
        this.data.set(num, new Map());
    }

    setVal(team, field, value){
        this.data.get(team).set(field, value);
    }

    getVal(team, field){
        return this.data.get(team).get(field);
    }

    teams(){
        var keys = this.data.keys();
        var next = keys.next();
        var r = [];
        while (!next.done){
            r.push(next.value);
            next = keys.next();
        }
        return r;
    }

    addRobot(){
        var num = "";
        while (num.length > 4 || isNaN(num) || num.length < 1) {
            num = prompt("Enter team number");
            if (isNaN(num) || num.length > 4 || num.length < 1) {
                alert("Invalid team number");
            }   
        }
        this.initTeam(num);
        renderTree(this);
    }
    
    fields(){
        var keys = this.data.keys();
        var next = keys.next();
        var r = [];

        try{
            keys = this.data.get(this.teams()[0]).keys();
        }catch(e){return;}

        next = keys.next();
        while (!next.done){
            r.push(next.value);
            next = keys.next();
        }
        return r;
    }

    addField(field){  
        this.setVal(this.teams()[0], field.toString(), "No data");
        renderTree(this);
    }

    teamScore(team) {
        var fields = this.fields();
        for (var i = 0; i <= fields.length; i++) {
            //parse out unwanted fields
            for(var j = 0; i < this.UNWANTED_FIELDS.length; j++) {
                if(fields[i] == this.UNWANTED_FIELDS[j]) {
                    fields.splice(i, 1);
                }
            } 
            //do calculations
            var totalScore;
            while (i <= fields.length) {
                totalScore += fields[i];
            }
            this.score.get(team).set("Total Score", totalScore);
        }
    }

    createField() {
        var button = document.getElementById("createField");
        button.addEventListener("click", function() {
            console.log("button clicked");
            var presetFields = [];
            newField = prompt("Enter a field name");
            if (newField == null || newField == "") {
                alert("Invalid field name");
            } else {
                newFieldType = prompt("Enter a field type (number, text, true/false)");
                if (newFieldType == null || newFieldType == "") {
                    alert("Invalid field type");
                } else if (newFieldType.toLowerCase() == "number") {
                    presetFields.push({name: newField, type: "number"});
                } else if (newFieldType.toLowerCase() == "text") {
                    presetFields.push({name: newField, type: "text"});
                } else if (newFieldType.toLowerCase() == "true/false" || newFieldType.toLowerCase() == "true / false") {
                    presetFields.push({name: newField, type: "checkbox"});
                }
            }
        });
    }
}

var Datasets = [];
var TestSet = new Data("Test Set");
Datasets.push(TestSet);

var teamName = "Team 25";
var robotDesc = "30x41 chassis, swerve drive (18 ft/s) 4 wheel diameter";

TestSet.initTeam("25");
TestSet.setVal("25", "Team Name", teamName);
TestSet.setVal("25", "Robot Description", robotDesc);
TestSet.setVal("25", "Autonomous", "Score top + mobility, score + autobalance");
TestSet.setVal("25", "Drive Train", "Swerve");
TestSet.initTeam("41");
TestSet.initTeam("293");
TestSet.setVal("293", "Team Name", "SPIKE");
TestSet.initTeam("2495");
TestSet.setVal("2495", "Team Name", "Hive Mind");
TestSet.initTeam("254");