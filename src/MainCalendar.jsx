import React, { PureComponent } from 'react';
import moment from 'moment'
import Day from './Day'
import Week from './Week'
import Month from './Month'
import Year from './Year'

class MainCalendar extends PureComponent {

    state = {
        day: true,
        week: false,
        month: false,
        year: false,
        time: moment().format('HH:mm:ss'),
    }

    onClickDay = () => {
        this.setState(({
            day: true,
            week: false,
            month: false,
            year: false,
        }))
    }

    onClickWeek = () => {
        this.setState(({
            day: false,
            week: true,
            month: false,
            year: false,
        }))
    }

    onClickMonth = () => {
        this.setState(({
            day: false,
            week: false,
            month: true,
            year: false,
        }))
    }

    onClickYear = () => {
        this.setState(({
            day: false,
            week: false,
            month: false,
            year: true,
        }))
    }

    onClickToday = () => {
        this.setState(({
            day: true,
            week: false,
            month: false,
            year: false,
        }))
        this.props.onClickToday()
    }

    generate = () => {
        let todayStyle = (this.state.day && Number(this.props.nowDay) === moment().date() && Number(this.props.nowWeek) === moment().week() && this.props.monthStorage === moment().month() && this.props.yearStorage === moment().year()) ? 'clicked' : ''
        let dayStyle = this.state.day ? 'clicked' : ''
        let weekStyle = this.state.week ? 'clicked' : ''
        let monthStyle = this.state.month ? 'clicked' : ''
        let yearStyle = this.state.year ? 'clicked' : ''
        return (
            <>
                <div onClick={this.onClickToday} className={`main-calendar-head-div   ${todayStyle}`} style={{ position: 'absolute', left: '14px', lineHeight: 1.7 }}>Today</div>
                <div style={{ margin: '0 auto', lineHeight: 1.7 }}>
                    <span onClick={this.onClickDay} className={`${dayStyle}`}>Day</span>
                    <span onClick={this.onClickWeek} className={`${weekStyle}`}>Week</span>
                    <span onClick={this.onClickMonth} className={`${monthStyle}`}>Month</span>
                    <span onClick={this.onClickYear} className={`${yearStyle}`}>Year</span>
                </div>
                <div style={{ textAlign: 'center', fontWeight: '600', height: '28px', width: '80px', lineHeight: '1.7', backgroundColor: 'rgb(201, 201, 201)', borderRadius: '7px', fontSize: '', position: 'absolute', right: '14px' }}>{this.state.time}</div>
            </>
        )
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState(({
                time: moment().format('HH:mm:ss')
            }))
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <div className='main-calendar'>
                <div className='main-calendar-head'>
                    <this.generate />
                </div>
                <div>
                    {this.state.day && <Day nowDay={this.props.nowDay} nowWeek={this.props.nowWeek} monthStorage={this.props.monthStorage} yearStorage={this.props.yearStorage} whatDay={this.props.whatDay} storage={this.props.storage} onClickDeleteInDayTable={this.props.onClickDeleteInDayTable} />}
                    {this.state.week && <Week nowDay={this.props.nowDay} nowWeek={this.props.nowWeek} monthStorage={this.props.monthStorage} yearStorage={this.props.yearStorage} monthStorage={this.props.monthStorage} yearStorage={this.props.yearStorage} storage={this.props.storage} />}
                    {this.state.month && <Month nowDay={this.props.nowDay} nowWeek={this.props.nowWeek} monthStorage={this.props.monthStorage} yearStorage={this.props.yearStorage} nowMonth={this.props.nowMonth} nowYear={this.props.nowYear} onClickDayInMonth={this.props.onClickDayInMonth} storage={this.props.storage} />}
                    {this.state.year && <Year nowDay={this.props.nowDay} nowWeek={this.props.nowWeek} monthStorage={this.props.monthStorage} yearStorage={this.props.yearStorage} nowMonth={this.props.nowMonth} nowYear={this.props.nowYear} onClickDayInYear={this.props.onClickDayInYear} storage={this.props.storage} />}
                </div>
            </div>
        )
    }
};
export default MainCalendar