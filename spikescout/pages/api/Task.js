const NOT_STARTED = 0;
const IN_PROGRESS = 1;
const FINISHED = 2;

class Task {
    constructor(name, desc, assignees, properties) {
        this.name = name;
        this.desc = desc;
        this.assignees = assignees;
        this.properties = {
            tags: [],
            dueDate: null,
            status: NOT_STARTED, // STATUSES: Not started, In progress, Completed, 
        }
    }
}

export default Task;