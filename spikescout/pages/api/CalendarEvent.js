class CalendarEvent {
    constructor(date, name, desc, startTime=0, endTime=0, col="gray") {
        this.date = date;
        this.name = name;
        this.desc = desc;
        this.startTime = startTime;
        this.endTime = endTime;
        this.col = col;
    }
}

export default CalendarEvent;