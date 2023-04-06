//new Data() will initialize a new dataset
class Data{
    constructor(name){
        this.name = name;
        this.data = new Map();
        this.UNWANTED_FIELDS = [];
        this.score = new Map();
        this.presetFields = [];
    }

    initTeam(num){
        this.data.set(num, new Map());
    }

    async setVal(team, field, value){
        if (this.data.has(team)) {
            this.data.get(team).set(field, value);
        } else {
            throw new Error("Error parsing data: team not found"); // TODO: Fix this error
        }
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

    async addRobot(){
        var num = "";
        num = await Notifications.input("Team number:");
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

    async addField(){
        var f = await Notifications.input("Field name:")
        this.setVal(this.teams()[0], f.toString(), "No data");
        renderTree(this);
    }

    teamScore(team) {
        var fields = this.fields();
        for (var i = 0; i < fields.length; i++) {
            //parse out unwanted fields
            for(var j = 0; j < this.UNWANTED_FIELDS.length; j++) {
                if(fields[i] == this.UNWANTED_FIELDS[j]) {
                    fields.splice(i, 1);
                }
            } 
            //do calculations
            var values = new Map();
            for(var j = 0; j < fields.length; j++) {
                //checkfor drivetrain value
                var value = this.getVal(team, fields[j]);
                if(value.includes("swerve" || "Swerve")) {
                    values.set("drivetrain", "swerve");
                }
            }
        }
    }


    createField() {
        var button = document.getElementById("createField");
        var self = this;
        button.addEventListener("click", function() {
            console.log("button clicked");
            self.newField = prompt("Enter a field name");
            if (self.newField == null || self.newField == "") {
                alert("Invalid field name");
            } else {
                self.newFieldType = prompt("Enter a field type (number, text, true/false)");
                if (self.newFieldType == null || self.newFieldType == "") {
                    alert("Invalid field type");
                } else if (self.newFieldType.toLowerCase() == "number") {
                    self.presetFields.push({name: self.newField, type: "number"});
                } else if (self.newFieldType.toLowerCase() == "text") {
                    self.presetFields.push({name: self.newField, type: "text"});
                } else if (self.newFieldType.toLowerCase() == "true/false" || self.newFieldType.toLowerCase() == "true / false") {
                    self.presetFields.push({name: self.newField, type: "checkbox"});
                } else {
                    alert("Invalid field type");
                }
                
            }
        console.log(self.presetFields);
        });
    }

    applyPresetData() {
        var button = document.getElementById("applyPresetDataButton");
        var self = this;
        button.addEventListener("click", function() {
            console.log("button clicked");
            console.log(self.presetFields);
            if(self.presetFields == null || self.presetFields.length == 0) {
                self.newField = prompt("Enter a field name");
                if (self.newField == null || self.newField == "") {
                    alert("Invalid field name");
                } else {
                    self.newFieldType = prompt("Enter a field type (number, text, true/false)");
                    if (self.newFieldType == null || self.newFieldType == "") {
                        alert("Invalid field type");
                    } else if (self.newFieldType.toLowerCase() == "number") {
                        self.presetFields.push({name: self.newField, type: "number"});
                    } else if (self.newFieldType.toLowerCase() == "text") {
                        self.presetFields.push({name: self.newField, type: "text"});
                    } else if (self.newFieldType.toLowerCase() == "true/false" || self.newFieldType.toLowerCase() == "true / false") {
                        self.presetFields.push({name: self.newField, type: "checkbox"});
                    } else {
                        alert("Invalid field type");
                    }  
                }
            console.log(self.presetFields);
            } else {
                for (var i = 0; i <= self.presetFields.length; i++) {
                    self.addField(self.presetFields[i]);
                    console.log(self.presetFields[i]);
                }
            }
        });
    }    
}    

window.onload = function(){
    var data = new Data("Data");
    data.createField();
    data.applyPresetData([]);
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