class Team {
    constructor(teamNumber, teamName, location="") {
        this.teamNumber = teamNumber;
        this.teamName = teamName;
        this.location = location;
        this.members = new Map(
            [
                ["Administrators", []], // These are PERMISSION levels. Custom subteams are created with new Subteam()
                ["Managers", []],
                ["Members", []]
            ]
        );
        
        this.activity = [
            
        ]

        this.tasks = [];

        this.subteams = [];
        this.events = [];
        this.datasets = [];
    }
}

export default Team;