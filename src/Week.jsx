import React, { PureComponent } from 'react';
import moment from 'moment'

class Week extends PureComponent {
    state = {
        today: moment().format('YYYYMMDD'),
        time: moment().format('LT'),
        location: moment().hours() * 61 + 51 + moment().minutes()
    }

    makeClock = () => {
        return (
            <>
                {Array(24).fill().map((v, i) => {
                    return (
                        <div style={{ color: 'gray', fontWeight: 600, textAlign: 'right', float: 'left', height: '61px', width: '100%' }}>
                            {`${i + 1}:00`}
                        </div>
                    )
                })}
            </>
        )
    }

    generate = () => {
        const today = moment();
        const nowYear = today.set('year', this.props.yearStorage)
        const nowMonth = today.set('month', this.props.monthStorage)
        const nowWeek = today.set('week', this.props.nowWeek)
        const week = today.week();
        return (
            <>
                {Array(7).fill(0).map((n, i) => {
                    let current = today.week(week).startOf('week').add(n + i, 'day')
                    let todaySelect = this.state.today === current.format('YYYYMMDD') ? 'week-selected' : '';
                    let isGrayed = Number(current.format('MM')) === Number(this.props.monthStorage) + 1 ? '' : 'week-grayed';
                    let sun = i === 0 ? 'SUN' : ''
                    let mon = i === 1 ? 'MON' : ''
                    let tue = i === 2 ? 'TUE' : ''
                    let wed = i === 3 ? 'WED' : ''
                    let thu = i === 4 ? 'THU' : ''
                    let fri = i === 5 ? 'FRI' : ''
                    let sat = i === 6 ? 'SAT' : ''

                    const day = []
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

                    return (
                        <div style={{ position: 'relative', width: 'calc((100vw - 430px) / 7)', float: 'left' }}>
                            <div style={{ width: 'calc((100vw - 430px) / 7)', height: '50px' }}>
                                <div className="week-day">
                                    <span>{sun}{mon}{tue}{wed}{thu}{fri}{sat}</span>
                                </div>
                                <div className={`week-box  ${todaySelect} ${isGrayed} `} key={i}>
                                    <span>{current.format('D')}</span>
                                </div>
                            </div>
                            <div style={{ width: '100%' }}>
                                {Array(24).fill().map(() => {
                                    return (
                                        <div style={{ float: 'left', borderBottom: '1px solid #e9e9e9', height: '60px', width: '100%', borderLeft: '1px solid #e9e9e9' }}></div>
                                    )
                                })}
                            </div>
                            {Array(day.length).fill().map((v, n) => {
                                const height = (Number(day[n].endHours) - Number(day[n].startHours)) * 61 + Number(day[n].endMinutes) - Number(day[n].startMinutes)
                                const style = {
                                    position: 'absolute',
                                    top: Number(day[n].startHours) * 61 + Number(day[n].startMinutes) + 48.55,
                                    right: 0,
                                    width: '100%',
                                    height: height,
                                }
                                const back = {
                                    backgroundColor: day[n].color,
                                    opacity: '0.5',
                                    width: '100%',
                                    height: '100%',
                                    float: 'left'
                                }
                                return (
                                    <div style={style}>
                                        <div style={back}></div>
                                        <div style={{ position: 'relative', top: -height, fontSize: '15px', fontWeight: '600', color: 'black' }}>
                                            <div style={{ position: 'absolute', top: height, left: 0, backgroundColor: day[n].color, height: height, width: '10px' }}></div>
                                            <div style={{ marginLeft: '10px' }}>{day[n].startHours}:{day[n].startMinutes}</div>
                                            <div style={{ width: 'calc(100% - 10px)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', height: '17px', marginLeft: '10px' }}>{day[n].title}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </>
        )
    }

    setTimeLine = () => {
        return (
            <div style={{ borderBottom: '1px solid red', width: '100%', position: 'absolute', top: `${this.state.location}px` }}>
                <div style={{ fontWeight: '600', color: 'red', height: '0' }}>{this.state.time}</div>
            </div>
        )
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState(({
                location: moment().hours() * 61 + 51 + moment().minutes(),
                time: moment().format('LT')
            }))
        }, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <div className='week-component'>
                <div style={{ float: 'left' }}>
                    <div className='week-left'>
                        <div style={{ float: 'left', width: '70px', height: '55.55px', marginBottom: '45px', fontSize: '15px', fontWeight: '600' }}>
                            <div style={{ color: 'rgb(47, 72, 218)' }}>CW{moment().set('week', this.props.nowWeek).format('W')}</div>
                            <div style={{ color: 'black', fontSize: '14px' }}>{moment().set('month', this.props.monthStorage).format('MMMM')}</div>
                            <div style={{ color: 'red' }}>{this.props.yearStorage}</div>
                        </div>
                        <div>
                            <this.makeClock />
                        </div>
                    </div>
                    <this.generate />
                </div>
                <this.setTimeLine />
            </div>
        )
    }
};
export default Week