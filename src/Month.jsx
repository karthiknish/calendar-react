import React, { PureComponent } from 'react';
import moment from 'moment'

class Month extends PureComponent {

    state = {
        nowMonth: moment().month(),
        today: moment().format('YYYYMMDD'),
    }

    generate = () => {
        const today = moment();
        const nowYear = today.set('year', this.props.nowYear)
        const nowMonth = today.set('month', this.props.nowMonth)
        const startWeek = today.clone().startOf('month').week();
        const endWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
        let calendar = [];
        for (let week = startWeek; week <= endWeek; week++) {
            calendar.push(
                <div className="month-row" key={week}>
                    {
                        Array(7).fill(0).map((n, i) => {
                            let current = today.clone().week(week).startOf('week').add(n + i, 'day')
                            let todaySelected = this.state.today === current.format('YYYYMMDD') ? 'month-selected' : '';
                            let isSelected = (Number(this.props.nowDay) === Number(current.format('D')) && Number(this.props.yearStorage) === this.props.nowYear && this.props.monthStorage === this.props.nowMonth) ? 'monthSelected' : ''
                            let isGrayed = current.format('MM') === today.format('MM') ? '' : 'month-grayed';
                            let clicking = current.format('MM') === today.format('MM') ? this.props.onClickDayInMonth : ((e) => e.preventDefault());

                            const day = []
                            if (current.format('MM') === today.format('MM')) {
                                {
                                    Array(this.props.storage.length).fill().map((v, n) => {
                                        if (this.props.storage[n].year === Number(current.year())) {
                                            if (this.props.storage[n].month === Number(current.month() + 1)) {
                                                if (this.props.storage[n].day === Number(current.date())) {
                                                    day.push(this.props.storage[n])
                                                }
                                            }
                                        }
                                    })
                                }
                            }

                            //for sorting
                            function compare(a, b) {
                                const A = Number(a.startHours + a.startMinutes)
                                const B = Number(b.startHours + a.startMinutes)

                                let comparison = 0;
                                if (A > B) {
                                    comparison = 1
                                } else if (A < B) {
                                    comparison = -1
                                }
                                return comparison
                            }
                            day.sort(compare)

                            return (
                                <div onClick={clicking} className={`month-box  ${todaySelected} ${isGrayed} ${isSelected}`} key={i}>
                                    <span>{current.format('D')}</span>
                                    <div className='month-display' >
                                        {Array(day.length).fill().map((v, n) => {
                                            return (
                                                <div style={{ display: 'block', width: '100%', height: '18px', position: 'relative' }}>
                                                    <div style={{ marginLeft: '6px', marginTop: '4px', float: 'left', width: '10px', height: '10px', backgroundColor: day[n].color, borderRadius: '10px' }}></div>
                                                    <div style={{ marginLeft: '6px', float: 'left', width: 'calc(100% - 71px)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: '600', color: 'black' }}>{day[n].title}</div>
                                                    <div style={{ lineHeight: '1.5', float: 'right', marginRight: '6px', fontSize: '14px', fontWeight: '600', color: 'gray' }}>{day[n].startHours}:{day[n].startMinutes}</div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        return calendar
    }

    render() {
        return (
            <div className='month-component'>
                <div>
                    <span style={{ color: 'black', fontSize: '30px', fontWeight: '500' }}>{moment().set('month', this.props.nowMonth).format('MMMM')}</span>
                    <span style={{ fontSize: '36px', color: 'red' }}>{this.props.nowYear}</span>
                </div>
                <div className="month-row">
                    <div className="month-day">
                        <span>SUN</span>
                    </div>
                    <div className="month-day">
                        <span>MON</span>
                    </div>
                    <div className="month-day">
                        <span>TUE</span>
                    </div>
                    <div className="month-day">
                        <span>WED</span>
                    </div>
                    <div className="month-day">
                        <span>THU</span>
                    </div>
                    <div className="month-day">
                        <span>FRI</span>
                    </div>
                    <div className="month-day">
                        <span>SAT</span>
                    </div>
                </div>
                {this.generate()}
            </div>
        )
    }
};
export default Month