const NOT_STARTED = 0;
const IN_PROGRESS = 1;
const FINISHED = 2;

class Task {
    constructor(name, desc, assignees=[], properties={
        status: NOT_STARTED, // STATUSES: Not started, In progress, Completed, 
        tags: [],
        dueDate: null
    }) {
        this.name = name;
        this.desc = desc;
        this.assignees = assignees;
        this.properties = properties;
        this.progressReports = [];
    }
}

export default Task;