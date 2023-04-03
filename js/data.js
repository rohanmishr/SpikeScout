//new Data() will initialize a new dataset
class Data{
    constructor(name){
        this.name = name;
        this.data = new Map();
    }

    initTeam(num){
        this.data.set(num, new Map());
    }

    set(team, field, value){
        this.data.get(team).set(field, value);
    }

    get(team, field){
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
}
var Datasets = [];
var TestSet = new Data("Test Set");
Datasets.push(TestSet);

var teamName = 1;

TestSet.initTeam("25");
TestSet.set("25", "Team Name", teamName);
TestSet.set("25", "Robot Description", "30x41 chassis, swerve drive (18 ft/s) 4 wheel diameter");
TestSet.set("25", "Autonomous", "Score top + mobility, score + autobalance");
TestSet.initTeam("41");
TestSet.initTeam("293");
TestSet.set("293", "Team Name", "SPIKE");
TestSet.initTeam("2495");
TestSet.set("2495", "Team Name", "Hive Mind");
TestSet.initTeam("254");

