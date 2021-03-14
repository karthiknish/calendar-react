import React, { PureComponent } from 'react';
import moment from 'moment'

class Day extends PureComponent {
    state = {
        location: moment().hours() * 61 + moment().minutes(),
        time: moment().format('LT'),
    }

    makeClock = () => {
        return (
            <>
                {Array(24).fill().map((v, i) => {
                    return (
                        <div style={{ color: 'gray', fontWeight: 600, textAlign: 'right', lineHeight: '7.6', float: 'left', height: '61px', width: '100%', borderRight: '1px solid #e9e9e9' }}>
                            {`${i + 1}:00`}
                        </div>
                    )
                })}
            </>
        )
    }

    setTimeLine = () => {
        return (
            <div style={{ zIndex: 3, borderBottom: '1px solid red', width: '100%', position: 'absolute', top: `${this.state.location}px` }}>
                <div style={{ fontWeight: '600', color: 'red', height: '0' }}>{this.state.time}</div>
            </div>
        )
    }

    generate = () => {
        const today = moment();
        const nowYear = today.set('year', this.props.yearStorage)
        const nowMonth = today.set('month', this.props.monthStorage)
        const nowWeek = today.set('week', this.props.nowWeek)
        const nowDay = today.set('date', this.props.nowDay)
        return (
            <>
                <div style={{ width: '48vw', float: 'left' }}>
                    <div style={{ width: '100%' }}>
                        {Array(24).fill().map(() => {
                            return (
                                <div style={{ float: 'left', borderBottom: '1px solid #e9e9e9', height: '60px', width: '100%', borderRight: '1px solid #e9e9e9' }}></div>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }

    takeSchedule = () => {
        const day = []
        {
            Array(this.props.storage.length).fill().map((v, i) => {
                if (this.props.storage[i].year === Number(this.props.yearStorage)) {
                    if (this.props.storage[i].month === Number(this.props.monthStorage + 1)) {
                        if (this.props.storage[i].day === Number(this.props.nowDay)) {
                            day.push(this.props.storage[i])
                        }
                    }
                }
            })
        }
        return (
            <>
                {Array(day.length).fill().map((v, i) => {
                    const height = (Number(day[i].endHours) - Number(day[i].startHours)) * 61 + Number(day[i].endMinutes) - Number(day[i].startMinutes)
                    const style = {
                        position: 'absolute',
                        top: Number(day[i].startHours) * 61 + Number(day[i].startMinutes),
                        right: 0,
                        width: '48vw',
                        height: height,
                    }
                    const back = {
                        backgroundColor: day[i].color,
                        opacity: '0.5',
                        width: '100%',
                        height: '100%',
                        float: 'left'
                    }
                    return (
                        <div style={style}>
                            <div style={back}></div>
                            <div style={{ position: 'relative', top: -height, fontSize: '15px', fontWeight: '600', color: 'black' }}>
                                <div style={{ position: 'absolute', top: height, left: 0, backgroundColor: day[i].color, height: height, width: '10px' }}></div>
                                <div style={{ marginLeft: '10px' }}>{day[i].startHours}:{day[i].startMinutes}</div>
                                <div style={{ marginLeft: '10px' }}>{day[i].title}</div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    makeTable = () => {
        const day = []
        {
            Array(this.props.storage.length).fill().map((v, i) => {
                if (this.props.storage[i].year === Number(this.props.yearStorage)) {
                    if (this.props.storage[i].month === Number(this.props.monthStorage + 1)) {
                        if (this.props.storage[i].day === Number(this.props.nowDay)) {
                            day.push(this.props.storage[i])
                        }
                    }
                }
            })
        }
        return (
            <div className='day-table'>
                <>
                    {Array(day.length).fill().map((v, i) => {
                        // const isAlert = day[i].alertTime === 0 ? 'There is no alert' : `Alert : ${day[i].alertTime}${day[i].alertType} before`
                        return (
                            <div name={day[i].name} style={{ position: 'relative', marginBottom: '20px', border: '1px solid #e9e9e9', backgroundColor: 'mintcream' }}>
                                <div style={{ width: '253px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '1px solid #e9e9e9', padding: '15px', fontWeight: '600', fontSize: '20px' }}>{day[i].title}</div>
                                <div style={{ width: '300px', padding: '15px' }}>
                                    <div style={{ marginBottom: '10px' }}>
                                        <span style={{ fontSize: '17px', fontWeight: '600', marginRight: '20px' }}>date</span>
                                        <span>{day[i].month}/{day[i].day}/{day[i].year}</span>
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <span style={{ fontSize: '17px', fontWeight: '600', marginRight: '20px' }}>start</span>
                                        <span>{day[i].startHours}:{day[i].startMinutes}</span>
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <span style={{ fontSize: '17px', fontWeight: '600', marginRight: '20px' }}>ends</span>
                                        <span>{day[i].endHours}:{day[i].endMinutes}</span>
                                    </div>
                                    <div style={{ height: '20px', marginBottom: '10px' }}>
                                        <span style={{ float: 'left', fontSize: '17px', fontWeight: '600', marginRight: '20px' }}>display</span>
                                        <div style={{ float: 'left', width: '20px', marginRight: '200px', height: '20px', backgroundColor: day[i].color }}></div>
                                    </div>
                                    {/* <div style={{ fontSize: '17px', fontWeight: '600', marginRight: '20px' }}>{isAlert}</div> */}
                                </div>
                                <div onClick={this.props.onClickDeleteInDayTable} style={{ position: 'absolute', top: '15px', right: '15px', backgroundRepeat: 'none', backgroundSize: 'contain', width: '24px', height: '24px', backgroundImage: 'url(https://user-images.githubusercontent.com/71132893/103125964-2e5e3580-46d0-11eb-9cdd-15ce0c5ca318.png)', cursor: 'pointer' }}></div>
                            </div>
                        )
                    })}
                </>
            </div>
        )
    }

    whatDayToday = () => {
        if (this.props.whatDay === -1) {
            return moment().set('date', this.props.nowDay).format('dddd')
        } else {
            return moment().day(this.props.whatDay).format('dddd')
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState(({
                location: moment().hours() * 61 + moment().minutes(),
                time: moment().format('LT'),
            }))
        }, 5000)
    }


    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <div className='day-component'>
                <div style={{ marginLeft: '30px', height: '56px' }}>
                    <span style={{ color: 'rgb(47, 72, 218)', fontSize: '15px', fontWeight: '600' }}>CW{moment().set('week', this.props.nowWeek).format('W')}</span>
                    <span style={{ marginLeft: '20px', color: 'rgb(47, 72, 218)', fontSize: '40px', fontWeight: '600' }}>{this.whatDayToday()}</span>
                    <span style={{ marginLeft: '10px', color: 'black', fontSize: '25px', fontWeight: '600' }}>{moment().set('month', this.props.monthStorage).format('MMMM')}{this.props.nowDay},</span>
                    <span style={{ color: 'red', fontSize: '40px', fontWeight: '600' }}>{this.props.yearStorage}</span>
                </div>
                <div style={{ position: 'relative', float: 'left', height: '89vh', overflowY: 'auto', overflowX: 'hidden' }}>
                    <this.setTimeLine />
                    <this.takeSchedule />
                    <div className='day-left'>
                        <this.makeClock />
                    </div>
                    <this.generate />
                </div>
                <this.makeTable />
            </div>
        )
    }
};
export default Day