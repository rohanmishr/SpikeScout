class RobotScoring {
    constructor() {
        this.params = {
            "drivetrain": {
                "maneuverability": undefined,
                "speed": undefined
            },
            "scoring": {
                "time": undefined,
                "accuracy": undefined,
                "cycleTime": undefined
            },
            "ppg": {
                "auto": undefined,
                "teleop": undefined,
                "endgame": undefined
            },
            "penalties": {
                "penspermatch": undefined,
                "overall": undefined
            }
        }
    }

    setParams(params) {
        this.params = params;
    }

    getParams() {
        return this.params;
    }
}

function calcQualScore() {
    let score = 0;
    let params = robotScoring.getParams();
    let drivetrain = params.drivetrain;
    let scoring = params.scoring;
    let ppg = params.ppg;
    let penalties = params.penalties;

    let drivetrainScore = 0;
    let scoringScore = 0;
    let ppgScore = 0;
    let penaltiesScore = 0;

    drivetrainScore = (drivetrain.maneuverability) * (drivetrain.speed);
    scoringScore = (scoring.time) * (scoring.accuracy) * (scoring.cycleTime);
    ppgScore = (ppg.auto) * (ppg.teleop) * (ppg.endgame);
    penaltiesScore = ((penalties.penspermatch * 0.5) * (penalties.overall)) * 0.25;
    score = (drivetrainScore + scoringScore + ppgScore) - penaltiesScore;
}