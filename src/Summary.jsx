import React, { PureComponent } from "react";
import moment from "moment";

class Summary extends PureComponent {
  state = {
    today: moment().format("YYYYMMDD"),
  };

  onClickDelete = (e) => {
    this.props.onClickDelete(e);
  };

  generate = () => {
    const today = moment();
    const nowYear = today.set("year", this.props.yearStorage);
    const nowMonth = today.set("month", this.props.monthStorage);
    const nowWeek = today.set("week", this.props.nowWeek);
    const week = today.week();
    let num = 0;
    return (
      <div className="load-list">
        <span style={{ fontSize: "16px", fontWeight: "600", color: "white" }}>
          Schedules of the week
        </span>
        {Array(7)
          .fill(0)
          .map((n, i) => {
            let current = today
              .week(week)
              .startOf("week")
              .add(n + i, "day");
            let selectedColor =
              Number(this.props.nowDay) === Number(current.format("D")) &&
              Number(this.props.yearStorage) === this.props.nowYear &&
              this.props.monthStorage === this.props.nowMonth
                ? "#4D4FFF"
                : "gray";

            const day = [];
            if (
              Number(current.format("MM")) ===
              Number(this.props.monthStorage) + 1
            ) {
              {
                Array(this.props.storage.length)
                  .fill()
                  .map((v, n) => {
                    if (this.props.storage[n].year === Number(current.year())) {
                      if (
                        this.props.storage[n].month ===
                        Number(current.month() + 1)
                      ) {
                        if (
                          this.props.storage[n].day === Number(current.date())
                        ) {
                          day.push(this.props.storage[n]);
                        }
                      }
                    }
                  });
              }
            }

            //for sorting
            function compare(a, b) {
              const A = Number(a.startHours + a.startMinutes);
              const B = Number(b.startHours + a.startMinutes);

              let comparison = 0;
              if (A > B) {
                comparison = 1;
              } else if (A < B) {
                comparison = -1;
              }
              return comparison;
            }
            day.sort(compare);

            if (day.length > 0) {
              num++;
              return (
                <>
                  <div
                    style={{
                      color: selectedColor,
                      fontWeight: "600",
                      fontSize: "18PX",
                      marginBottom: "10px",
                    }}
                  >
                    {current.month() + 1} / {current.date()} / {current.year()}{" "}
                    {current.format("dddd")}
                  </div>
                  {Array(day.length)
                    .fill()
                    .map((v, n) => {
                      return (
                        <div name={day[n].name} className="summary-schedule">
                          <div
                            style={{
                              marginTop: "6px",
                              position: "absolute",
                              left: "3px",
                              width: "10px",
                              height: "10px",
                              backgroundColor: day[n].color,
                              borderRadius: "10px",
                            }}
                          ></div>
                          <div
                            style={{
                              lineHeight: "1",
                              float: "left",
                              fontSize: "20px",
                              marginLeft: "17px",
                              width: "11.6vw",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              fontWeight: "100",
                              color: "white",
                            }}
                          >
                            {day[n].title}
                          </div>
                          <div
                            style={{
                              lineHeight: "1.5",
                              position: "absolute",
                              right: "40px",
                              overflow: "noWrap",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "gray",
                            }}
                          >
                            {day[n].startHours}:{day[n].startMinutes}~
                          </div>
                          <div
                            style={{
                              lineHeight: "1.5",
                              position: "absolute",
                              right: "5px",
                              overflow: "noWrap",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "gray",
                            }}
                          >
                            {day[n].endHours}:{day[n].endMinutes}
                          </div>
                          <button
                            onClick={this.onClickDelete}
                            className="summary-delete-button"
                          ></button>
                        </div>
                      );
                    })}
                </>
              );
            } else {
              if (i === 6 && num === 0) {
                return (
                  <div
                    style={{
                      color: "gray",
                      marginTop: "15px",
                      fontSize: "15px",
                    }}
                  >
                    There is no schedule in the week you selected
                  </div>
                );
              }
            }
          })}
      </div>
    );
  };

  render() {
    return (
      <div className="summary">
        <this.generate />
      </div>
    );
  }
}
export default Summary;
