import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Flag,
} from "lucide-react";

import { useState } from "react";

import "./EmployeeCalendar.css";

function EmployeeCalendar() {
  const today = new Date();

  const [viewDate, setViewDate] = useState(
    new Date(2026, 8, 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date(2026, 8, 18)
  );

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  const monthName = viewDate.toLocaleString(
    "en-US",
    {
      month: "long",
    }
  );

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  const startOffset =
    firstDay === 0 ? 6 : firstDay - 1;

  /* =========================================================
     CALENDAR EVENTS
     ========================================================= */

  const events = {
    "2026-09-04": [
      {
        title: "API Integration",
        type: "task",
      },
    ],

    "2026-09-08": [
      {
        title: "Database Integration",
        type: "task",
      },
    ],

    "2026-09-11": [
      {
        title: "Sprint Review",
        type: "milestone",
      },
    ],

    "2026-09-15": [
      {
        title: "Testing Preparation",
        type: "task",
      },
    ],

    "2026-09-18": [
      {
        title: "Project Deadline",
        type: "deadline",
      },
    ],

    "2026-09-22": [
      {
        title: "API Milestone",
        type: "milestone",
      },
    ],

    "2026-09-25": [
      {
        title: "QA Review",
        type: "task",
      },
    ],

    "2026-09-30": [
      {
        title: "Testing Milestone",
        type: "milestone",
      },
    ],
  };

  /* =========================================================
     MONTH / YEAR OPTIONS
     ========================================================= */

  const monthOptions = [];

  for (
    let year = 2026;
    year <= 2027;
    year++
  ) {
    for (
      let month = 0;
      month < 12;
      month++
    ) {
      const date = new Date(
        year,
        month,
        1
      );

      monthOptions.push({
        value: `${year}-${String(
          month
        ).padStart(2, "0")}`,
        label: date.toLocaleString(
          "en-US",
          {
            month: "long",
            year: "numeric",
          }
        ),
      });
    }
  }

  /* =========================================================
     HELPERS
     ========================================================= */

  const formatDateKey = (date) => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const isSameDate = (
    dateOne,
    dateTwo
  ) => {
    return (
      dateOne.getDate() ===
        dateTwo.getDate() &&
      dateOne.getMonth() ===
        dateTwo.getMonth() &&
      dateOne.getFullYear() ===
        dateTwo.getFullYear()
    );
  };

  const isToday = (day) => {
    if (!day) {
      return false;
    }

    const calendarDate = new Date(
      currentYear,
      currentMonth,
      day
    );

    return isSameDate(
      calendarDate,
      today
    );
  };

  const isSelected = (day) => {
    if (!day) {
      return false;
    }

    const calendarDate = new Date(
      currentYear,
      currentMonth,
      day
    );

    return isSameDate(
      calendarDate,
      selectedDate
    );
  };

  /* =========================================================
     MONTH CHANGE
     ========================================================= */

  const handleMonthChange = (event) => {
    const value = event.target.value;

    const [yearValue, monthValue] =
      value.split("-");

    const year = Number(yearValue);
    const month = Number(monthValue);

    const newViewDate = new Date(
      year,
      month,
      1
    );

    setViewDate(newViewDate);

    /*
      Preserve the selected day where possible.
      Example:
      Selected = 31 December
      New month = February
      February has only 28/29 days,
      so select the last valid day.
    */

    const selectedDay =
      selectedDate.getDate();

    const maximumDay = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const validDay = Math.min(
      selectedDay,
      maximumDay
    );

    setSelectedDate(
      new Date(
        year,
        month,
        validDay
      )
    );
  };

  /* =========================================================
     TODAY
     ========================================================= */

  const handleToday = () => {
    const todayDate = new Date();

    setSelectedDate(todayDate);

    setViewDate(
      new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        1
      )
    );
  };

  /* =========================================================
     DAY SELECTION
     ========================================================= */

  const handleDaySelect = (day) => {
    if (!day) {
      return;
    }

    const clickedDate = new Date(
      currentYear,
      currentMonth,
      day
    );

    setSelectedDate(clickedDate);
  };

  /* =========================================================
     CALENDAR DAYS
     ========================================================= */

  const calendarDays = [];

  for (
    let index = 0;
    index < startOffset;
    index++
  ) {
    calendarDays.push(null);
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    calendarDays.push(day);
  }

  /* =========================================================
     SELECTED DAY INFORMATION
     ========================================================= */

  const selectedDateLabel =
    selectedDate.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  const selectedDateKey =
    formatDateKey(selectedDate);

  const selectedDayEvents =
    events[selectedDateKey] || [];

  /* =========================================================
     TODAY LABEL
     ========================================================= */

  const todayLabel =
    today.toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  /* =========================================================
     CURRENT MONTH VALUE
     ========================================================= */

  const currentMonthValue = `${currentYear}-${String(
    currentMonth
  ).padStart(2, "0")}`;

  /* =========================================================
     UPCOMING EVENTS
     ========================================================= */

  const upcomingEvents = [
    {
      date: "18 Sep",
      title: "Project Deadline",
      project: "AI Learning Platform",
      type: "deadline",
    },

    {
      date: "22 Sep",
      title: "API Milestone",
      project: "AI Learning Platform",
      type: "milestone",
    },

    {
      date: "25 Sep",
      title: "QA Review",
      project: "E-Commerce Marketplace",
      type: "task",
    },

    {
      date: "30 Sep",
      title: "Testing Milestone",
      project:
        "Company Management Portal",
      type: "milestone",
    },
  ];

  return (
    <section className="employee-calendar-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="employee-calendar-header">
        <div>
          <span className="employee-calendar-eyebrow">
            WORK SCHEDULE
          </span>

          <h1>Calendar</h1>

          <p>
            Keep track of your assigned tasks,
            milestones, and important project
            deadlines.
          </p>
        </div>
      </div>

      {/* =====================================================
          CALENDAR TOOLBAR
          ===================================================== */}

      <div className="employee-calendar-toolbar">

        {/* MONTH SELECTOR */}

        <div className="employee-calendar-month-selector">

          <div className="employee-calendar-month-icon">
            <CalendarDays />
          </div>

          <div className="employee-calendar-month-content">

            <span className="employee-calendar-control-label">
              MONTH
            </span>

            <div className="employee-calendar-select-wrapper">

              <select
                value={currentMonthValue}
                onChange={
                  handleMonthChange
                }
                aria-label="Select calendar month"
              >
                {monthOptions.map(
                  (month) => (
                    <option
                      key={month.value}
                      value={month.value}
                    >
                      {month.label}
                    </option>
                  )
                )}
              </select>

              <ChevronDown />

            </div>

          </div>

        </div>

        {/* TODAY */}

        <button
          type="button"
          className="employee-calendar-today-control"
          onClick={handleToday}
        >
          <span className="employee-calendar-today-label">
            TODAY
          </span>

          <span className="employee-calendar-today-date">
            {todayLabel}
          </span>
        </button>

      </div>

      {/* =====================================================
          SELECTED DAY BAR
          ===================================================== */}

      <div className="employee-calendar-selected-day">

        <div className="employee-calendar-selected-day-info">

          <span>
            SELECTED DAY
          </span>

          <strong>
            {selectedDateLabel}
          </strong>

        </div>

        <div className="employee-calendar-selected-day-events">

          {selectedDayEvents.length > 0 ? (
            <span>
              {selectedDayEvents.length} scheduled{" "}
              {selectedDayEvents.length === 1
                ? "event"
                : "events"}
            </span>
          ) : (
            <span>
              No scheduled events
            </span>
          )}

        </div>

      </div>

      {/* =====================================================
          CALENDAR
          ===================================================== */}

      <div className="employee-calendar-card">

        <div className="employee-calendar-weekdays">

          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <div key={day}>
              {day}
            </div>
          ))}

        </div>

        <div className="employee-calendar-grid">

          {calendarDays.map(
            (day, index) => {

              const calendarDate = day
                ? new Date(
                    currentYear,
                    currentMonth,
                    day
                  )
                : null;

              const dayKey =
                calendarDate
                  ? formatDateKey(
                      calendarDate
                    )
                  : null;

              const dayEvents =
                dayKey
                  ? events[dayKey] || []
                  : [];

              return (
                <div
                  key={`${day}-${index}`}
                  className={`
                    employee-calendar-day
                    ${day === null ? "empty" : ""}
                    ${isToday(day) ? "today" : ""}
                    ${isSelected(day) ? "selected" : ""}
                  `}
                  onClick={() =>
                    handleDaySelect(day)
                  }
                >

                  {day && (
                    <>

                      <div className="employee-calendar-day-number">

                        <span>
                          {day}
                        </span>

                        {isToday(day) && (
                          <small>
                            Today
                          </small>
                        )}

                      </div>

                      <div className="employee-calendar-events">

                        {dayEvents.map(
                          (
                            event,
                            eventIndex
                          ) => (
                            <div
                              key={`${event.title}-${eventIndex}`}
                              className={`
                                employee-calendar-event
                                ${event.type}
                              `}
                              title={event.title}
                            >

                              <span className="employee-calendar-event-dot"></span>

                              <span>
                                {event.title}
                              </span>

                            </div>
                          )
                        )}

                      </div>

                    </>
                  )}

                </div>
              );
            }
          )}

        </div>

      </div>

      {/* =====================================================
          LEGEND
          ===================================================== */}

      <div className="employee-calendar-legend">

        <div>
          <span className="legend-dot task"></span>
          <span>Task</span>
        </div>

        <div>
          <span className="legend-dot milestone"></span>
          <span>Milestone</span>
        </div>

        <div>
          <span className="legend-dot deadline"></span>
          <span>Deadline</span>
        </div>

      </div>

      {/* =====================================================
          UPCOMING
          ===================================================== */}

      <section className="employee-upcoming-section">

        <div className="employee-calendar-section-heading">

          <div>
            <span className="employee-calendar-eyebrow">
              UPCOMING
            </span>

            <h2>
              Upcoming Schedule
            </h2>
          </div>

          <span className="employee-upcoming-count">
            {upcomingEvents.length} events
          </span>

        </div>

        <div className="employee-upcoming-list">

          {upcomingEvents.map(
            (event, index) => (
              <div
                className="employee-upcoming-item"
                key={`${event.title}-${index}`}
              >

                <div className="employee-upcoming-date">

                  <strong>
                    {event.date.split(" ")[0]}
                  </strong>

                  <span>
                    {event.date.split(" ")[1]}
                  </span>

                </div>

                <div className="employee-upcoming-icon">

                  {event.type ===
                  "deadline" ? (
                    <Flag />
                  ) : event.type ===
                    "milestone" ? (
                    <CalendarDays />
                  ) : (
                    <Clock3 />
                  )}

                </div>

                <div className="employee-upcoming-info">

                  <strong>
                    {event.title}
                  </strong>

                  <span>
                    {event.project}
                  </span>

                </div>

                <span
                  className={`
                    employee-upcoming-type
                    ${event.type}
                  `}
                >
                  {event.type ===
                  "deadline"
                    ? "Deadline"
                    : event.type ===
                      "milestone"
                    ? "Milestone"
                    : "Task"}
                </span>

              </div>
            )
          )}

        </div>

      </section>

    </section>
  );
}

export default EmployeeCalendar;