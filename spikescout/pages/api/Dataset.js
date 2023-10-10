/** Dataset class. Contains all data and methods for data manipulation.*/
export default class Dataset {
    /**
     * Create a new dataset.
     * @param {*} name 
     */
    constructor(name){
        this.name = name;
        this.data = new Map();
        this.UNWANTED_FIELDS = [];
        this.score = new Map();
        this.presetFields = [];
    }

    /**
     * Initialize a team.
     * @param {number} num 
     */
    initTeam(num){
        this.data.set(num, new Map().set("%tags", []));
    }

    /**
     * Set a value for a team property. Contains tag logic.
     * @param {*} team 
     * @param {*} field 
     * @param {*} value 
     */
    async setVal(team, field, value){
        if (this.data.has(team)) {
            const t = this.data.get(team);
            t.set(field, value);

            // tags
            // This logic sucks but it works
            if(value != "No data") {
                const charArray = value.split("");
                console.log(charArray);
                var tagEnd = false;
                var tag = "";
                for(var i = 0; i < charArray.length; i++) {
                    if(charArray[i] == "#") {
                        i++;
                        while(!tagEnd) {
                            if(charArray[i] == " " || charArray[i] == undefined) {
                                tagEnd = true;
                            } 
                            tag += charArray[i] ?? "";
                            i++;
                        }
                        tagEnd = false;
                        t.get("%tags").push(tag);
                        tag = "";
                        i--;
                    }
                }

                // go through and remove duplicates
                let tagsList = t.get("%tags");
                for(var i = 0; i < t.get("%tags").length; i++) {
                    for(var j = i + 1; j < t.get("%tags").length; j++) {
                        if(tagsList[i] == tagsList[j]) {
                            tagsList.splice(j, 1);
                        }
                    }
                }
                //t.get("%tags") = tagsList;
            }
        } else {
            throw new Error("Error parsing data: team not found");
        }
    }

    /**
     * Get a team value.
     * @param {*} team 
     * @param {*} field 
     * @returns 
     */
    getVal(team, field){
        return this.data.get(team).get(field);
    }

    /**
     * Get all teams in a dataset.
     * @returns
     */
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

    teamsList = [];

    /**
     * Add a robot (team) to the dataset.
     * @returns
     */
    async addRobot(){
        var num = "";
        num = await Notifications.input("Team number:");
        this.initTeam(num);
        analyze_first = true;
        renderTree(this);
    }
    
    /**
     * Get all of the fields in the dataset.
     * @returns 
     */
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

    /**
     * Add a field to the dataset.
     * @returns
     */
    async addField(){
        var f = await Notifications.input("Field name:")
        this.setVal(this.teams()[0], f.toString(), "No data");
        renderTree(this);
    }

    /**
     * Calculate the score of a team for evaluation purposes.
     * @param {*} team 
     */
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
}