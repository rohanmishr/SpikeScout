import styles from '../../styles/app.module.css'
import React from 'react'

function AppPanel({ tab, team }) {
    if(team == undefined) {
        // send user to Join a team page
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [month, setMonth] = React.useState(new Date().getMonth());
    const [yr, setYear] = React.useState(new Date().getFullYear());

    // Get the day of the week of the first day of the month and days in the month
    const firstDay = weekdays[new Date(yr, month, 1).getDay()];
    const daysInMonth = new Date(yr, month, 0).getDate();

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
                <div class={[styles.calendar_event, styles.event_pink].join(" ")}>{e[i].name}</div>
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

    //click handlers
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

    if(tab == "calendar") {
        return (
            <div id={styles.calendar}>
                <div id={styles.calendar_grid_months}>
                    <h3 id={styles.calendar_month}>{months[month]} {yr}</h3> 
                    <button onClick={prevMonth}class={styles.calendar_month_changer}>{'<'}</button> 
                    <button onClick={nextMonth}class={styles.calendar_month_changer}>{'>'}</button>
                </div>

                <div id={styles.calendar_grid}>
                    {calendarGrid}
                </div>
            </div>
        )
    }
}

export default AppPanel;