import CalendarDate from "./CalendarDate.js";

class ProgressReport {
    constructor() {
        this.progress = 0; // 0-100%
        this.date = new CalendarDate();
        this.projectedCompletionDate = new CalendarDate();
        this.content = "";
    }
}

export default ProgressReport;