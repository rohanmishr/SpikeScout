class Task {
    constructor(name, desc, dueDate, assignees=[], type="Task") {
        this.name = name;
        this.desc = desc;
        this.dueDate = dueDate;
        this.assignees = assignees;
        this.type = type;
        // current types: Task, Issue
    }

    assignMember(member) {
        this.assignees.push(member);
    }

    unassignMember(member) {
        this.assignees.splice(this.assignees.indexOf(member), 1);
    }

    changeDueDate(newDate) {
        this.dueDate = newDate;
    }

    changeName(newName) {
        this.name = newName;
    }

    changeDesc(newDesc) {
        this.desc = newDesc;
    }
}

export default Task;