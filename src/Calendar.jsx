import React, { PureComponent } from "react";
import moment from "moment";

class Calendar extends PureComponent {
  state = {
    today: moment().format("YYYYMMDD"),
    thisWeek: moment().format("w"),
  };

  generate = () => {
    const today = moment();
    const nowYear = today.set("year", this.props.nowYear);
    const nowMonth = today.set("month", this.props.nowMonth);
    const startWeek = today.clone().startOf("month").week();
    const endWeek =
      today.clone().endOf("month").week() === 1
        ? 53
        : today.clone().endOf("month").week();
    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      let thisWeek = Number(this.state.thisWeek) === week ? "today" : "";
      let weekSelected =
        Number(this.props.nowWeek) === week &&
        Number(this.props.yearStorage) === this.props.nowYear &&
        this.props.monthStorage === this.props.nowMonth
          ? "selected"
          : "";
      calendar.push(
        <div className="row" key={week}>
          <div
            onClick={this.onClickWeek}
            className={`cw ${thisWeek} ${weekSelected}`}
          >
            {week}
          </div>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              let current = today
                .clone()
                .week(week)
                .startOf("week")
                .add(n + i, "day");
              let todaySelect =
                this.state.today === current.format("YYYYMMDD") ? "today" : "";
              let isSelected =
                Number(this.props.nowDay) === Number(current.format("D")) &&
                Number(this.props.yearStorage) === this.props.nowYear &&
                this.props.monthStorage === this.props.nowMonth
                  ? "selected"
                  : "";
              let clicking =
                current.format("MM") === today.format("MM")
                  ? this.onClickDay
                  : (e) => e.preventDefault();
              let isGrayed =
                current.format("MM") === today.format("MM") ? "" : "grayed";

              const day = [];
              if (current.format("MM") === today.format("MM")) {
                Array(this.props.storage.length)
                  .fill()
                  .map((v, n) => {
                    if (
                      this.props.storage[n].year === Number(this.props.nowYear)
                    ) {
                      if (
                        this.props.storage[n].month ===
                        Number(this.props.nowMonth + 1)
                      ) {
                        if (this.props.storage[n].day === current.date()) {
                          if (day.length < 3) {
                            day.push(this.props.storage[n]);
                          } else {
                            return;
                          }
                        }
                      }
                    }
                  });
              }

              return (
                <div
                  onClick={clicking}
                  className={`box ${todaySelect} ${isGrayed} ${isSelected}`}
                  key={i}
                >
                  {current.format("D")}
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      width: "33px",
                      height: "10px",
                      pointerEvents: "none",
                    }}
                  >
                    {Array(day.length)
                      .fill()
                      .map((v, n) => {
                        return (
                          <div
                            style={{
                              marginLeft: "1px",
                              marginRight: "1px",
                              borderRadius: "6px",
                              width: "6px",
                              height: "6px",
                              backgroundColor: day[n].color,
                              display: "inline-block",
                            }}
                          ></div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      );
    }
    return calendar;
  };

  onClickRight = () => {
    this.props.onClickRight();
  };

  onClickLeft = () => {
    this.props.onClickLeft();
  };

  onClickDay = (e) => {
    this.props.onClickDay(e);
  };

  onClickWeek = (e) => {
    this.props.onClickWeek(e);
  };

  componentDidUpdate() {
    this.setState({
      month: moment().set("month", this.props.nowMonth).format("MMMM"),
      year: moment().set("year", this.props.nowYear).format("YYYY"),
    });
  }

  render() {
    return (
      <div className="calendar">
        <div className="body">
          <span style={{ fontSize: "32px", fontWeight: "600" }}>
            {moment().set("month", this.props.nowMonth).format("MMMM")}{" "}
          </span>
          <span style={{ fontSize: "32px", color: "red", fontWeight: "600" }}>
            {this.props.nowYear}
          </span>
          <button style={{ marginLeft: "10px" }} onClick={this.onClickRight}>
            &gt;
          </button>
          <button onClick={this.onClickLeft}>&lt;</button>
        </div>
        <div>
          <div className="row">
            <div
              style={{ borderRight: "1px solid gray", color: "gray" }}
              className="day"
            >
              <span>CW</span>
            </div>
            <div className="day">
              <span>SUN</span>
            </div>
            <div className="day">
              <span>MON</span>
            </div>
            <div className="day">
              <span>TUE</span>
            </div>
            <div className="day">
              <span>WED</span>
            </div>
            <div className="day">
              <span>THU</span>
            </div>
            <div className="day">
              <span>FRI</span>
            </div>
            <div className="day">
              <span>SAT</span>
            </div>
          </div>
          <this.generate />
        </div>
      </div>
    );
  }
}
export default Calendar;
