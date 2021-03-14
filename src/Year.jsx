import React, { PureComponent } from "react";
import moment from "moment";

class Year extends PureComponent {
  state = {
    today: moment().format("YYYYMMDD"),
  };

  generate = (year, month) => {
    const today = moment();
    const nowYear = today.set("year", year);
    const nowMonth = today.set("month", month);
    const startWeek = today.clone().startOf("month").week();
    const endWeek =
      today.clone().endOf("month").week() === 1
        ? 53
        : today.clone().endOf("month").week();
    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className="year-row" key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              let current = today
                .clone()
                .week(week)
                .startOf("week")
                .add(n + i, "day");
              let todaySelected =
                this.state.today === current.format("YYYYMMDD")
                  ? "year-selected"
                  : "";
              let isSelected =
                Number(this.props.nowDay) === Number(current.format("D")) &&
                Number(this.props.yearStorage) === this.props.nowYear &&
                this.props.nowWeek === week
                  ? "yearSelected"
                  : "";
              let isGrayed =
                current.format("MM") === today.format("MM")
                  ? ""
                  : "year-grayed";
              let clicking =
                current.format("MM") === today.format("MM")
                  ? this.props.onClickDayInYear
                  : (e) => e.preventDefault();
              const day = [];
              if (current.format("MM") === today.format("MM")) {
                {
                  Array(this.props.storage.length)
                    .fill()
                    .map((v, n) => {
                      if (
                        this.props.storage[n].year === Number(current.year())
                      ) {
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
              let zero = day.length === 0 ? "" : "";
              let one = day.length === 1 ? "rgb(229, 255, 0)" : "";
              let two = day.length === 2 ? "rgb(255, 238, 0)" : "";
              let three = day.length === 3 ? "rgb(255, 204, 0)" : "";
              let four = day.length === 4 ? "rgb(255, 170, 0)" : "";
              let five = day.length >= 5 ? "rgb(255, 106, 0)" : "";
              const color = `${zero}${one}${two}${three}${four}${five}`;
              return (
                <div
                  onClick={clicking}
                  style={{ backgroundColor: color }}
                  className={`year-box  ${todaySelected} ${isGrayed} ${isSelected}`}
                  key={i}
                >
                  {current.format("D")}
                </div>
              );
            })}
        </div>
      );
    }
    return calendar;
  };

  generateWrap = () => {
    return (
      <>
        {Array(12)
          .fill()
          .map((v, i) => {
            return (
              <div
                id={i}
                style={{
                  marginRight: "10px",
                  height: "28vh",
                  float: "left",
                  marginTop: "20px",
                }}
              >
                <div style={{ fontWeight: "600", marginBottom: "5px" }}>
                  {moment()
                    .add(i - 2, "month")
                    .format("MMMM")}
                </div>
                <div className="year-row">
                  <div className="year-day">
                    <span>SUN</span>
                  </div>
                  <div className="year-day">
                    <span>MON</span>
                  </div>
                  <div className="year-day">
                    <span>TUE</span>
                  </div>
                  <div className="year-day">
                    <span>WED</span>
                  </div>
                  <div className="year-day">
                    <span>THU</span>
                  </div>
                  <div className="year-day">
                    <span>FRI</span>
                  </div>
                  <div className="year-day">
                    <span>SAT</span>
                  </div>
                </div>
                {this.generate(this.props.nowYear, i)}
              </div>
            );
          })}
      </>
    );
  };

  render() {
    return (
      <>
        <div className="year-component">
          <div style={{ color: "red", fontSize: "30px" }}>
            {this.props.nowYear}
          </div>
          <this.generateWrap />
        </div>
      </>
    );
  }
}
export default Year;
