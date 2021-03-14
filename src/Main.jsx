import React, { PureComponent } from 'react';
import moment from 'moment'
import Calendar from './Calendar'
import Summary from './Summary'
import MainCalendar from './MainCalendar'
import AddScheduler from './AddScheduler'

class Main extends PureComponent {
    state = {
        nowDay: moment().date(),
        nowWeek: moment().week(),
        nowMonth: moment().month(),
        nowYear: moment().year(),
        whatDay: -1,
        yearStorage: moment().year(),
        monthStorage: moment().month(),

        addSchedule: false,
        setTitle: null,
        setYear: moment().year(),
        setMonth: moment().month() + 1,
        setDay: moment().date(),
        setStartHours: moment().hour(),
        setStartMinutes: 0,
        setEndHours: moment().hour() + 1,
        setEndMinutes: 0,
        setColor: '#04B910',
        // setAlertTime: 0,
        // setAlertType: null,
        storage: [],

        spanStyle: {
            paddingRight: 0,
            textContent: 'Add Schedule',
        },
        divStyle: ''
    }

    onClickDay = (e) => {
        this.setState(({
            nowDay: e.target.textContent,
            nowWeek: e.target.parentNode.childNodes[0].textContent,
            yearStorage: this.state.nowYear,
            monthStorage: this.state.nowMonth,
            setYear: this.state.nowYear,
            setMonth: this.state.nowMonth + 1,
            setDay: e.target.textContent
        }))
        Array(8).fill().map((v, i) => {
            const get = e.target.parentNode.childNodes[i].textContent === e.target.textContent ?
                this.setState(({
                    whatDay: i - 1
                }))
                :
                ''
        })
    }

    onClickWeek = (e) => {
        if (e.target.parentNode.childNodes[1].className === 'box  grayed ') {
            this.setState(({
                nowDay: 1,
                nowWeek: e.target.textContent,
                yearStorage: this.state.nowYear,
                monthStorage: this.state.nowMonth,
                setYear: this.state.nowYear,
                setMonth: this.state.nowMonth + 1,
                setDay: 1
            }))
            Array(8).fill().map((v, i) => {
                const get = e.target.parentNode.childNodes[i].className === 'box  grayed ' ?
                    this.setState(({
                        whatDay: i
                    }))
                    :
                    ''
            })
        } else {
            this.setState(({
                nowDay: e.target.parentNode.childNodes[1].textContent,
                nowWeek: e.target.textContent,
                yearStorage: this.state.nowYear,
                monthStorage: this.state.nowMonth,
                whatDay: 'Sunday',
                setYear: this.state.nowYear,
                setMonth: this.state.nowMonth + 1,
                setDay: e.target.parentNode.childNodes[1].textContent
            }))
        }

    }

    onClickToday = () => {
        this.setState(({
            nowDay: moment().date(),
            nowWeek: moment().week(),
            nowMonth: moment().month(),
            nowYear: moment().year(),
            whatDay: -1,
            yearStorage: moment().year(),
            monthStorage: moment().month(),
            setYear: moment().year(),
            setMonth: moment().month() + 1,
            setDay: moment().date()
        }))
    }

    onClickRight = () => {
        if (this.state.nowMonth < 11) {
            this.setState((prevState) => {
                return {
                    nowMonth: prevState.nowMonth + 1
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    nowMonth: 0,
                    nowYear: prevState.nowYear + 1
                }
            })
        }
    }

    onClickLeft = () => {
        if (this.state.nowMonth > 0) {
            this.setState((prevState) => {
                return {
                    nowMonth: prevState.nowMonth - 1
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    nowMonth: 11,
                    nowYear: prevState.nowYear - 1
                }
            })
        }
    }

    onClickDayInMonth = (e) => {
        this.setState(({
            nowDay: e.target.childNodes[0].textContent,
            nowWeek: moment().set({ 'year': this.state.nowYear, 'month': this.state.nowMonth, 'date': e.target.childNodes[0].textContent }).week() === 1 && e.target.childNodes[0].textContent > 24 ? 53 : moment().set({ 'year': this.state.nowYear, 'month': this.state.nowMonth, 'date': e.target.childNodes[0].textContent }).week(),
            monthStorage: this.state.nowMonth,
            yearStorage: this.state.nowYear,
            setYear: this.state.nowYear,
            setMonth: this.state.nowMonth + 1,
            setDay: e.target.childNodes[0].textContent
        }))

        Array(7).fill().map((v, i) => {
            const get = e.target.parentNode.childNodes[i].childNodes[0].textContent === e.target.childNodes[0].textContent ?
                this.setState(({
                    whatDay: i
                }))
                :
                ''
        })
    }

    onClickDayInYear = (e) => {
        this.setState(({
            nowDay: e.target.textContent,
            nowWeek: moment().set({ 'year': this.state.nowYear, 'month': e.target.parentNode.parentNode.id, 'date': e.target.childNodes[0].textContent }).week() === 1 && e.target.childNodes[0].textContent > 24 ? 53 : moment().set({ 'year': this.state.nowYear, 'month': e.target.parentNode.parentNode.id, 'date': e.target.childNodes[0].textContent }).week(),
            monthStorage: Number(e.target.parentNode.parentNode.id),
            nowMonth: Number(e.target.parentNode.parentNode.id),
            yearStorage: this.state.nowYear,
            setYear: this.state.nowYear,
            setMonth: Number(e.target.parentNode.parentNode.id) + 1,
            setDay: e.target.textContent
        }), console.log(this.state.nowWeek))
        Array(7).fill().map((v, i) => {
            const get = e.target.parentNode.childNodes[i].textContent === e.target.textContent ?
                this.setState(({
                    whatDay: i
                }))
                :
                ''
        })
    }

    //for AddSchedule
    onChangeTitle = (e) => {
        this.setState(({
            setTitle: e.target.value
        }))
    }

    onChangeYear = (e) => {
        this.setState(({
            setYear: e.target.value
        }))
    }

    onChangeMonth = (e) => {
        this.setState(({
            setMonth: e.target.value
        }))
    }

    onChangeDay = (e) => {
        this.setState(({
            setDay: e.target.value
        }))
    }

    onChangeSHours = (e) => {
        if (Number(e.target.value) < 10) {
            this.setState(({
                setStartHours: `0${e.target.value}`
            }))
        } else {
            this.setState(({
                setStartHours: e.target.value
            }))
        }
    }

    onChangeSMinutes = (e) => {
        if (Number(e.target.value) < 10) {
            this.setState(({
                setStartMinutes: `0${e.target.value}`
            }))
        } else {
            this.setState(({
                setStartMinutes: e.target.value
            }))
        }
    }

    onChangeEHours = (e) => {
        if (Number(e.target.value) < 10) {
            this.setState(({
                setEndHours: `0${e.target.value}`
            }))
        } else {
            this.setState(({
                setEndHours: e.target.value
            }))
        }
    }

    onChangeEMinutes = (e) => {
        if (Number(e.target.value) < 10) {
            this.setState(({
                setEndMinutes: `0${e.target.value}`
            }))
        } else {
            this.setState(({
                setEndMinutes: e.target.value
            }))
        }
    }

    onChangeColor = (e) => {
        this.setState(({
            setColor: e.target.value
        }))
    }

    // onChangeAlertTime = (e) => {
    //     this.setState(({
    //         setAlertTime: e.target.value
    //     }))
    // }

    // onClickAlertType = () => {
    //     this.setState(({
    //         alertType: true,
    //     }))
    // }

    // onClickMinutes = () => {
    //     this.setState(({
    //         setAlertType: 'minutes'
    //     }))
    // }

    // onClickHours = () => {
    //     this.setState(({
    //         setAlertType: 'hours'
    //     }))
    // }

    // onClickDays = () => {
    //     this.setState(({
    //         setAlertType: 'days'
    //     }))
    // }

    // onClickAddAlert = () => {
    //     this.setState(({
    //         setAlertTime: 15,
    //         setAlertType: 'minutes'
    //     }))
    // }

    // onClickRemoveAlert = () => {
    //     this.setState(({
    //         setAlertTime: null,
    //         setAlertType: null
    //     }))
    // }

    onClickAddSchedule = () => {
        if (!this.state.addSchedule) {
            this.setState(({
                addSchedule: true,
                spanStyle: { ...this.state.spanStyle, paddingRight: '20px', textContent: 'Close Scheduler' },
                divStyle: 'forward .4s forwards',
            }))

        } else {
            this.setState(({
                addSchedule: false,
                spanStyle: { ...this.state.spanStyle, paddingRight: '0', textContent: 'Add Schedule' },
                divStyle: 'backward .4s forwards',
            }))
        }
        this.setState(({
            setTitle: null,
            setYear: this.state.yearStorage,
            setMonth: this.state.monthStorage + 1,
            setDay: this.state.nowDay,
            setStartHours: moment().hour(),
            setStartMinutes: 0,
            setEndHours: moment().hour() + 1,
            setEndMinutes: 0,
            // setAlertTime: null,
            // setAlertType: null
        }))
    }

    onClickSubmit = () => {
        const storage = {
            name: this.state.storage.length === 0 ? 0 : this.state.storage[this.state.storage.length - 1].name + 1,
            title: this.state.setTitle,
            year: Number(this.state.setYear),
            month: Number(this.state.setMonth),
            day: Number(this.state.setDay),
            week: Number(moment().set({ 'year': Number(this.state.setYear), 'month': Number(this.state.setMonth - 1), 'date': Number(this.state.setDay) }).week()),
            startHours: this.state.setStartHours === 0 ? '00' : this.state.setStartHours,
            startMinutes: this.state.setStartMinutes === 0 ? '00' : this.state.setStartMinutes,
            endHours: this.state.setEndHours === 0 ? '00' : this.state.setEndHours,
            endMinutes: this.state.setEndMinutes === 0 ? '00' : this.state.setEndMinutes,
            color: this.state.setColor,
            // alertTime: Number(this.state.setAlertTime),
            // alertType: this.state.setAlertType,
        }
        if (this.state.storage.length === 0) {
            this.setState((prevState) => {
                return {
                    spanStyle: { ...prevState.spanStyle, paddingRight: '0', textContent: 'Add Schedule' },
                    divStyle: 'backward .4s forwards',
                    storage: [...prevState.storage, storage],
                    addSchedule: false,
                }
            }, () => localStorage.setItem('storage', JSON.stringify(this.state.storage)))
        } else {
            for (let i = 0; i < this.state.storage.length; i++) {
                if (this.state.storage[i].startHours === storage.startHours
                    && this.state.storage[i].startMinutes === storage.startMinutes
                    && this.state.storage[i].endHours === storage.endHours
                    && this.state.storage[i].endMinutes === storage.endMinutes
                    && this.state.storage[i].year === storage.year
                    && this.state.storage[i].month === storage.month
                    && this.state.storage[i].day === storage.day) {
                    alert('There is same schedule alredy')
                    break
                } else {
                    if (i === this.state.storage.length - 1) {
                        this.setState((prevState) => {
                            return {
                                spanStyle: { ...prevState.spanStyle, paddingRight: '0', textContent: 'Add Schedule' },
                                divStyle: 'backward .4s forwards',
                                storage: [...prevState.storage, storage],
                                addSchedule: false,
                            }

                        }, () => localStorage.setItem('storage', JSON.stringify(this.state.storage)))
                    }
                }
            }
        }
    }

    onClickDelete = (e) => {
        const storage = this.state.storage.filter((v) => {
            return (
                v.name !== Number(e.target.parentNode.getAttribute('name'))
            )
        })
        this.setState(({
            storage: storage
        }), () => localStorage.setItem('storage', JSON.stringify(this.state.storage)))
    }

    onClickDeleteInDayTable = (e) => {
        const storage = this.state.storage.filter((v) => {
            return (
                v.name !== Number(e.target.parentNode.getAttribute('name'))
            )
        })
        this.setState(({
            storage: storage
        }), () => localStorage.setItem('storage', JSON.stringify(this.state.storage)))
    }

    componentDidMount() {
        if (JSON.parse(localStorage.getItem('storage'))) {
            this.setState(({
                storage: JSON.parse(localStorage.getItem('storage'))
            }))
        }
    }

    render() {
        return (
            <>
                <div style={{ height: '100vh', float: 'left' }}>
                    <div style={{ backgroundColor: '#292726' }}>
                        <button onClick={this.onClickAddSchedule} className='add-schedule'>
                            <span style={{ paddingRight: this.state.spanStyle.paddingRight, position: 'relative', transition: 'all .6s' }}>{this.state.spanStyle.textContent}</span>
                            <div style={{ animation: this.state.divStyle }} className='add-schedule-div'>▶</div>
                        </button>
                        {this.state.addSchedule &&
                            <AddScheduler
                                yearStorage={this.state.yearStorage}
                                monthStorage={this.state.monthStorage}
                                nowDay={this.state.nowDay}
                                addSchedule={this.state.addSchedule}

                                setTitle={this.state.setTitle}
                                setYear={this.state.setYear}
                                setMonth={this.state.setMonth}
                                setDay={this.state.setDay}
                                setStartHours={this.state.setStartHours}
                                setStartMinutes={this.state.setStartMinutes}
                                setEndHours={this.state.setEndHours}
                                setEndMinutes={this.state.setEndMinutes}
                                setColor={this.state.setColor}
                                // setAlertTime={this.state.setAlertTime}
                                // setAlertType={this.state.setAlertType}

                                onChangeTitle={this.onChangeTitle}
                                onChangeYear={this.onChangeYear}
                                onChangeMonth={this.onChangeMonth}
                                onChangeDay={this.onChangeDay}
                                onChangeSHours={this.onChangeSHours}
                                onChangeSMinutes={this.onChangeSMinutes}
                                onChangeEHours={this.onChangeEHours}
                                onChangeEMinutes={this.onChangeEMinutes}
                                onChangeColor={this.onChangeColor}
                                // onChangeAlertTime={this.onChangeAlertTime}
                                onClickMinutes={this.onClickMinutes}
                                onClickHours={this.onClickHours}
                                onClickDays={this.onClickDays}
                                // onClickAddAlert={this.onClickAddAlert}
                                // onClickRemoveAlert={this.onClickRemoveAlert}
                                onClickSubmit={this.onClickSubmit}
                            />}
                    </div>

                    <Calendar
                        openCal={this.openCal}
                        nowDay={this.state.nowDay}
                        nowWeek={this.state.nowWeek}
                        nowMonth={this.state.nowMonth}
                        nowYear={this.state.nowYear}
                        monthStorage={this.state.monthStorage}
                        yearStorage={this.state.yearStorage}
                        storage={this.state.storage}
                        onClickLeft={this.onClickLeft}
                        onClickRight={this.onClickRight}
                        onClickDay={this.onClickDay}
                        onClickWeek={this.onClickWeek}
                    />

                    <Summary
                        storage={this.state.storage}
                        onClickDelete={this.onClickDelete}
                        nowDay={this.state.nowDay}
                        nowWeek={this.state.nowWeek}
                        nowMonth={this.state.nowMonth}
                        nowYear={this.state.nowYear}
                        monthStorage={this.state.monthStorage}
                        yearStorage={this.state.yearStorage}
                    />
                </div>
                <div style={{ float: 'left' }}>
                    <MainCalendar
                        nowDay={this.state.nowDay}
                        nowWeek={this.state.nowWeek}
                        nowMonth={this.state.nowMonth}
                        nowYear={this.state.nowYear}
                        whatDay={this.state.whatDay}
                        monthStorage={this.state.monthStorage}
                        yearStorage={this.state.yearStorage}
                        storage={this.state.storage}
                        onClickToday={this.onClickToday}
                        onClickDayInMonth={this.onClickDayInMonth}
                        onClickDayInYear={this.onClickDayInYear}
                        onClickDeleteInDayTable={this.onClickDeleteInDayTable}
                    />
                </div>

            </>
        )
    }
};
export default Main