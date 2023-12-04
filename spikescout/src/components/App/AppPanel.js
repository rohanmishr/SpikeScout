import Team from '../../../pages/api/Team';
import RegisterTeam from '../../../pages/register-team';
import Task from '../../../pages/api/Task';
import styles from '../../styles/app.module.css'
import React from 'react'
import Dataset from '../../../pages/api/Dataset';

function AppPanel({ tab, team, user }) {
    if(team == undefined) {
        return (
            <div>
                <h1>No team found. (AppPanel:11)</h1>
            </div>
        )
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let sets = [];
    const [month, setMonth] = React.useState(new Date().getMonth());
    const [yr, setYear] = React.useState(new Date().getFullYear());
    const [scoutHtml, setHtml] = React.useState( 
        (
            <div id={styles.scout}>
                    <div>
                        <h3>Datasets</h3>
                        <div id={styles.datasets}>
                            {sets}
                            <button onClick={createDataset()} class={styles.dataset}>
                                <h3 id={styles.add_dataset}>+</h3>
                            </button>
                        </div>
                    </div>
                </div>
        ) 
        )
    const [taskViewer, setTaskViewer] = React.useState(
        <div id={styles.task_viewer}>
            <p>Click on a task to view its details, progress, and more.</p>
        </div>
    )

    const [eventViewer, setEventViewer] = React.useState(
        <div id={styles.calendar_event_viewer}>
            <p>Click on an event to view its details, progress, and more.</p>
        </div>
    )
    // Dashboard
    if(tab == "dashboard") {
        return (
            <div>
                <div id={styles.dashboard_top}>
                    <h3 id={styles.dashboard_welcome}>Hi, {user.name}</h3>
                    <input id={styles.dashboard_searchBar} placeholder="Search..."></input>
                </div>
                <div id={styles.dashboard_statsDisplay}>
                    <div class={styles.dashboard_statWidget}>
                        <h3>Members: {team.members.get("Administrators").length +
                                      team.members.get("Managers").length + 
                                      team.members.get("Members").length}</h3>
                    </div>

                    <div class={styles.dashboard_statWidget}>
                        <h3>Upcoming events: {team.events.length}</h3>
                    </div>

                    <div class={styles.dashboard_statWidget}>
                        <h3>Datasets: {team.datasets.length}</h3>
                    </div>
                </div>

                <div id={styles.dashboard_flex_container}>
                    <div id={styles.dashboard_activity}>
                        <h1>Activity</h1>
                        <button id={styles.dashboard_activity_report_button}>Activity Report</button>
                    </div>
                    <div id={styles.dashboard_inbox}>
                        <h1>Inbox</h1>
                    </div>
                </div>
            </div>
        )
    }

    // Calendar

    // Get the day of the week of the first day of the month and days in the month
    const firstDay = weekdays[new Date(yr, month, 1).getDay()];
    const daysInMonth = new Date(yr, month, 0).getDate();

    const eventClickHandler = (ev) => {
        return () => {
            setEventViewer(
                <div id={styles.calendar_event_viewer}>
                    <h1>{ev.name}</h1>
                    <h3>{ev.date.month}/{ev.date.day}/{ev.date.year}</h3>
                    <p>{ev.desc}</p>
                </div>
            );
        }
    };

    const calendarGrid = [];
    calendarGrid.push(
        <div id={styles.calendar_grid_header}>
            <div class={styles.calendar_grid_header_cell}>Sunday</div>
            <div class={styles.calendar_grid_header_cell}>Monday</div>
            <div class={styles.calendar_grid_header_cell}>Tuesday</div>
            <div class={styles.calendar_grid_header_cell}>Wednesday</div>
            <div class={styles.calendar_grid_header_cell}>Thursday</div>
            <div class={styles.calendar_grid_header_cell}>Friday</div>
            <div class={styles.calendar_grid_header_cell}>Saturday</div>
        </div>
    );

    let day = 1;
    // Get events on a certain date
    function EventsOnDay(m, y, d) {
        let e = [];
        for(let i = 0; i < team.events.length; i++) {
            if(team.events[i].date.month == m && team.events[i].date.year == y && team.events[i].date.day == d) {
                e.push(team.events[i]);
            }
        }
        let ret = [];
        for(let i = 0; i < e.length; i++) {
            ret.push(
                <div onClick={eventClickHandler(e[i])}class={[styles.calendar_event, styles.event_pink].join(" ")}>{e[i].name}</div>
            );
        } 
        return ret;
    } 

    for (let i = 0; i < 6; i++) {
        const row = [];
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < weekdays.indexOf(firstDay)) || day > daysInMonth) {
                // Render empty cell for days before the start of the month or after the end
                row.push(<div class={styles.calendar_grid_cell}></div>);
            } else {
                // Render cell with day number
                row.push(
                    <div class={styles.calendar_grid_cell}>
                        <span class={styles.day}>{day}</span>
                        <div class={styles.events}>
                            {EventsOnDay(month + 1, yr, day)}
                            {/*<div class={styles.calendar_event}>Test Event</div>*/}
                        </div>
                    </div>
                );
                day++;
            }
        }
        calendarGrid.push(<div id={styles.calendar_grid_row}>{row}</div>);
    }

    function prevMonth() {
        setMonth(month - 1);
        if (month === 0) {
            setMonth(11);
            setYear(yr - 1)
        }
    }

    function nextMonth() {
        setMonth(month + 1);
        if (month == 11) {
            setMonth(0);
            setYear(yr + 1);
        }
    }

    const newEventHandler = () => {
        return () => {

        }
    }

    if(tab == "calendar") {
        return (
            <div id={styles.calendar}>
                <div id={styles.calendar_container}>
                    <div id={styles.calendar_grid_months}>
                        <h3 id={styles.calendar_month}>{months[month]} {yr}</h3> 
                        <button onClick={prevMonth}class={styles.calendar_month_changer}>{'<'}</button> 
                        <button onClick={nextMonth}class={styles.calendar_month_changer}>{'>'}</button>
                        <button onClick={newEventHandler()} id={styles.calendar_schedule_event}>Schedule Event</button>
                    </div>

                    <div id={styles.calendar_grid}>
                        {calendarGrid}
                    </div>
                </div>

                {eventViewer}
            </div>
        )
    }

    if(tab == "tasks") {
        let tasks = [];
        let assignees = [];
        let tags = [];

        const taskClickHandler = (task) => {
            return () => {
                assignees = [];
                tags = [];

                for(var i = 0; i < task.assignees.length-1; i++) {
                    assignees.push(task.assignees[i] + ", ");
                } assignees.push(task.assignees[task.assignees.length-1]);
                
                console.log(task.properties);
                for(var i = 0; i < task.properties.tags.length; i++) {
                    tags.push(
                        <div class={styles.tag}>
                            {task.properties.tags[i]}
                        </div>
                    )
                    console.log(tags);
                }

                setTaskViewer(
                    <div id={styles.task_viewer}>
                        <h1>{task.name}</h1>
                        <div id={styles.tags}>{tags}</div>
                        <h3><span id={styles.strong}>Assigned to:</span> {assignees}</h3>
                        <p>{task.desc}</p>
                    </div>
                )
            }
        }

        const newTaskHandler = () => {
            return () => {
                const name = window.prompt("Task name:");
                const desc = window.prompt("Enter task description:");
                team.tasks.push(new Task(name, desc));
            }
        }

        for(var i = 0; i < team.tasks.length; i++) {
            tasks.push(
                <div class={styles.task} onClick={taskClickHandler(team.tasks[i])}>
                    <h2>{team.tasks[i].name}</h2>
                    <p>{team.tasks[i].desc}</p>
                </div>
            )
        }

        return (
            <div id={styles.tasks}>
                <div id={styles.tasks_all}>
                    <div id={styles.tasks_all_header}>
                        <h1>All tasks</h1> <button onClick={newTaskHandler()} id={styles.create_new_task}>+</button>
                    </div>
                    {tasks}
                </div>

                <div id={styles.tasks_assigned}>
                    <h1>Assigned tasks</h1>
                </div>

                {taskViewer}
            </div>
        )
    }

    // Scouting (the main things)

    // 1. get the already present datasets from the team
    for(var i = 0; i < team.datasets.length; i++) {
        sets.push(
            <button onClick={(t) => enterDataset()} class={styles.dataset}>
                <h3>{team.datasets[i].name}</h3>
            </button>
        );
    }
    
    // handlers
    function createDataset() {
        return () => {
            // create a new dataset
            let newDataset = new Dataset(window.prompt("Dataset name:"));
            team.datasets.push(newDataset);
        }
    }

    const enterDataset = (set) => {
        return () => {
            setHtml( (
                <div>
                    <h1>{set.name}</h1>
                </div>
            ) )
        }
    }

    if(tab == "scout") {
        return (
            <div>
                {scoutHtml}
            </div>
        )
    }
}

export default AppPanel;