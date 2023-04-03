//new Data() will initialize a new dataset
class Data{
    constructor(name){
        this.name = name;
        this.data = new Map();
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
    
    fields(){
        var keys;
        try{
            keys = this.data.get(this.teams()[0]).keys();
        }catch(e){
            return;
        }
        var next = keys.next();
        var r = [];
        while (!next.done){
            r.push(next.value);
            next = keys.next();
        }
        return r;
    }

    teamScore(team) {
        var score = [];
        var fields = this.fields();
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

