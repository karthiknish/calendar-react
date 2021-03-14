import React, { PureComponent } from 'react';
import moment from 'moment'

class AddScheduler extends PureComponent {
    state = {
        // addAlert: false,
        // alertType: false,
        timeError: false,
        dayError: false,
        dayStyle: 0,
        timeStyle: 0,
        titleStyle: {
            border: 0,
            backgroundColor: 'white',
            color: null,
            placeholder: 'Title'
        },
        // alertStyle:'+'
    }

    // onClickAlertType = () => {
    //     this.setState(({
    //         alertType: true,
    //     }))
    // }

    //propsHandiling
    onChangeTitle = (e) => {
        this.props.onChangeTitle(e)
        if (this.props.setTitle) {
            this.setState(({
                titleStyle: { ...this.titleStyle, border: '0', placeholder: 'Title' }
            }))
        }
    }

    onChangeYear = (e) => {
        this.props.onChangeYear(e)
    }

    onChangeMonth = (e) => {
        this.props.onChangeMonth(e)
    }

    onChangeDay = (e) => {
        this.props.onChangeDay(e)
        if (this.props.setDay <= moment().set({ 'year': Number(this.props.setYear), 'month': Number(this.props.setMonth - 1) }).endOf('month').date()) {
            this.setState(({
                dayError: false,
                dayStyle: '0'
            }))
        }
    }

    onChangeSHours = (e) => {
        this.props.onChangeSHours(e)
        if (Number(String(this.props.setEndHours) + String(this.props.setEndMinutes)) - Number(String(this.props.setStartHours) + String(this.props.setStartMinutes)) < 0) {
            this.setState(({
                timeError: false,
                timeStyle: '0'
            }))
        }
    }

    onChangeSMinutes = (e) => {
        this.props.onChangeSMinutes(e)
        if (Number(String(this.props.setEndHours) + String(this.props.setEndMinutes)) - Number(String(this.props.setStartHours) + String(this.props.setStartMinutes)) < 0) {
            this.setState(({
                timeError: false,
                timeStyle: '0'
            }))
        }
    }

    onChangeEHours = (e) => {
        this.props.onChangeEHours(e)
        if (Number(String(this.props.setEndHours) + String(this.props.setEndMinutes)) - Number(String(this.props.setStartHours) + String(this.props.setStartMinutes)) < 0) {
            this.setState(({
                timeError: false,
                timeStyle: '0'
            }))
        }
    }

    onChangeEMinutes = (e) => {
        this.props.onChangeEMinutes(e)
        if (Number(String(this.props.setEndHours) + String(this.props.setEndMinutes)) - Number(String(this.props.setStartHours) + String(this.props.setStartMinutes)) < 0) {
            this.setState(({
                timeError: false,
                timeStyle: '0'
            }))
        }
    }

    onChangeColor = (e) => {
        this.props.onChangeColor(e)
    }

    // onChangeAlertTime = (e) => {
    //     this.props.onChangeAlertTime(e)
    // }

    // onClickMinutes = () => {
    //     this.setState(({
    //         alertType: false,
    //         setAlertType: 'minutes'
    //     }))
    //     this.props.onClickMinutes()
    // }

    // onClickHours = () => {
    //     this.setState(({
    //         alertType: false,
    //         setAlertType: 'hours'
    //     }))
    //     this.props.onClickHours()
    // }

    // onClickDays = () => {
    //     this.setState(({
    //         alertType: false,
    //         setAlertType: 'days'
    //     }))
    //     this.props.onClickDays()
    // }

    // onClickAddAlert = () => {
    //     if (!this.state.addAlert) {
    //         this.setState(({
    //             addAlert: true,
    //             alertStyle:'-'
    //         }))
    //         this.props.onClickAddAlert()
    //     } else {
    //         this.setState(({
    //             addAlert: false,
    //             alertStyle:'+'
    //         }))
    //         this.props.onClickRemoveAlert()
    //     }
    // }

    onClickSubmit = () => {
        if (this.props.setTitle) {
            if (Number(String(this.props.setEndHours) + String(this.props.setEndMinutes)) - Number(String(this.props.setStartHours) + String(this.props.setStartMinutes)) > 0) {
                if (this.props.setDay <= moment().set({ 'year': Number(this.props.setYear), 'month': Number(this.props.setMonth - 1) }).endOf('month').date()) {
                    this.props.onClickSubmit()
                } else {
                    this.setState(({
                        dayError: true,
                        dayStyle: '1px solid red'
                    }))
                }
            } else {
                this.setState(({
                    timeError: true,
                    timeStyle: '1px solid red'
                }))
            }
        } else {
            this.setState(({
                titleStyle: { ...this.titleStyle, border: '4px solid red', placeholder: 'There must be a title', backgroundColor: 'red', color: 'white' }
            }))
            setTimeout(() => {
                this.setState(({
                    titleStyle: { ...this.titleStyle, backgroundColor: 'transparent', color: 'black', border: '4px solid red', placeholder: 'There must be a title' }
                }))
            }, 400)
        }
    }

    render() {
        return (
            <div className='scheduler'>
                <div className='scheduler-head'>
                    <input spellCheck='false' placeholder={this.state.titleStyle.placeholder} style={{ border: this.state.titleStyle.border, backgroundColor: this.state.titleStyle.backgroundColor, color: this.state.titleStyle.color }} onChange={this.onChangeTitle}></input>
                </div>
                <div className='scheduler-body'>
                    <div style={{ marginBottom: '0' }} className='scheduler-body-time'>
                        <span style={{ float: 'left' }}>date</span>
                        <div style={{ marginLeft: '20px', float: 'left', }}>
                            <input max='12' min='1' type='number' value={this.props.setMonth} onChange={this.onChangeMonth}></input>/
                            <input style={{ border: this.state.dayStyle }} max={moment().set({ 'year': Number(this.props.setYear), 'month': Number(this.props.setMonth - 1) }).endOf('month').date()} min='1' type='number' value={this.props.setDay} onChange={this.onChangeDay}></input>/
                            <input max='9999' min='1' type='number' value={this.props.setYear} onChange={this.onChangeYear}></input>
                        </div>
                        {this.state.dayError && <div className='scheduler-day-error'><span>This setting have to be under {moment().set({ 'year': Number(this.props.setYear), 'month': Number(this.props.setMonth - 1) }).endOf('month').date() + 1}</span></div>}
                    </div>
                    <div style={{ border: this.state.timeStyle }} className='scheduler-body-time'>
                        <span style={{ float: 'left' }}>starts</span>
                        <div style={{ marginLeft: '26px', float: 'left' }}>
                            <input max='24' min='0' type='number' style={{ marginRight: '10px' }} value={this.props.setStartHours} onChange={this.onChangeSHours}></input>:
                            <input max='59' min='0' style={{ marginLeft: '10px', marginRight: '130px' }} type='number' value={this.props.setStartMinutes} onChange={this.onChangeSMinutes}></input>
                        </div>
                        <span style={{ float: 'left', marginRight: '6px' }}>ends</span>
                        <div style={{ marginLeft: '26px', float: 'left' }}>
                            <input max='24' min='0' type='number' style={{ marginRight: '10px' }} value={this.props.setEndHours} onChange={this.onChangeEHours}></input>:
                            <input max='59' min='0' style={{ marginLeft: '10px' }} type='number' value={this.props.setEndMinutes} onChange={this.onChangeEMinutes}></input>
                        </div>
                        {this.state.timeError && <div className='scheduler-time-error'><span>Start time must not be earlier than end time</span></div>}
                    </div>
                    <div className='scheduler-body-color'>
                        <span style={{ float: 'left' }}>display</span>
                        <input type='color' value={this.props.setColor} onChange={this.onChangeColor}></input>
                    </div>
                    {/* <div className='scheduler-body-alert'>
                        <span style={{ fontWeight: '600', marginRight: '265px' }}>alert</span>
                        <span onClick={this.onClickAddAlert} style={{ cursor: 'pointer' }}>{this.state.alertStyle}</span>
                        <div style={{ height: '34px' }}>
                            <div style={{ position: 'relative', textAlign: 'center' }}>
                                {this.state.addAlert &&
                                    <>
                                        <input min='1' type='number' value={this.props.setAlertTime} onChange={this.props.onChangeAlertTime}></input>
                                        <span onClick={this.onClickAlertType} style={{ width: '60px', cursor: 'pointer' }}>{this.props.setAlertType}</span>
                                        {this.state.alertType &&
                                            <>
                                                <div onClick={this.onClickMinutes} style={{fontSize:'10px', position: 'absolute', top: '20px', left: '123px', cursor: 'pointer' }}>minutes</div>
                                                <div onClick={this.onClickHours} style={{ fontSize:'10px',position: 'absolute', top: '35px', left: '123px', cursor: 'pointer' }}>hours</div>
                                                <div onClick={this.onClickDays} style={{fontSize:'10px', position: 'absolute', top: '50px', left: '123px', cursor: 'pointer' }}>days</div>
                                            </>}
                                        <span style={{ marginLeft: '20px' }}>before</span>
                                    </>}
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className='scheduler-foot'>
                    <button onClick={this.onClickSubmit} style={{ backgroundColor: this.props.setColor }}>Add Event</button>
                </div>
            </div>
        )
    }
};
export default AddScheduler