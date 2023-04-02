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
}
var Datasets = [];
var TestSet = new Data();
TestSet.initTeam("293");
TestSet.set("293", "field", "value");
