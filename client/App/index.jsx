import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import moment from 'moment-natural'
import { isNumeric, isAscii, isMultibyte } from 'validator'

import styles from './index.css'



class App extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props)

    const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm'

    let default_start_moment = moment.natural('09:00 next saturday')
    default_start_moment = default_start_moment.natural('+7d')
    const [ beginDate, beginTime ] = default_start_moment.format(DATETIME_FORMAT).split(' ')

    let default_end_moment = moment.natural('18:00 next saturday')
    default_end_moment = default_end_moment.natural('+7d')
    const [ endDate, endTime ] = default_end_moment.format(DATETIME_FORMAT).split(' ')

    let default_signup_moment = moment.natural('12:00 next monday')
    default_signup_moment = default_signup_moment.natural('+7d')
    const [ signupDate, signupTime ] = default_signup_moment.format(DATETIME_FORMAT).split(' ')

    this.state = {
      times: 0,
      name: '',
      beginDate,
      beginTime,
      begin: +default_start_moment,
      endDate,
      endTime,
      end: +default_end_moment,
      signupDate,
      signupTime,
      signup: +default_signup_moment,
    }
  }

  render() {
    const { id, className } = this.props
    const classes = cx(styles.className, className)
    const {
      times, name,
      beginDate, beginTime, begin,
      endDate, endTime, end,
      signupDate, signupTime, signup
    } = this.state

    const isTimesValid = isNumeric('' + times)
    const isNameValid = isAscii(name) || isMultibyte(name)
    let YYYY, MM, DD, HH, mm
    ;[ YYYY, MM, DD ] = beginDate.split('-')
    const isBeginDateValid = isNumeric(YYYY) && isNumeric(MM) && isNumeric(DD)
    ;[ HH, mm ] = beginTime.split(':')
    const isBeginTimeValid = isNumeric(HH) && isNumeric(mm)
    ;[ YYYY, MM, DD ] = endDate.split('-')
    const isEndDateValid = isNumeric(YYYY) && isNumeric(MM) && isNumeric(DD)
    ;[ HH, mm ] = endTime.split(':')
    const isEndTimeValid = isNumeric(HH) && isNumeric(mm)
    ;[ YYYY, MM, DD ] = signupDate.split('-')
    const isSignupDateValid = isNumeric(YYYY) && isNumeric(MM) && isNumeric(DD)
    ;[ HH, mm ] = endTime.split(':')
    const isSignupTimeValid = isNumeric(HH) && isNumeric(mm)

    const isOk =
      isTimesValid && isNameValid &&
      isBeginDateValid && isBeginTimeValid &&
      isEndDateValid && isEndTimeValid &&
      isSignupDateValid && isSignupTimeValid

    return (
      <div id={id} className={classes}>
        <div className="container">
          <h1>一鍵開大松</h1>
          <div id={styles.panel}>
            <div id={styles.panelLeft}>
              <form method="post">
                <div className="form-group">
                  <label htmlFor="times">第幾次</label>
                  <input
                    id="times"
                    type="number"
                    className="form-control"
                    required
                    value={times}
                    onChange={e => this.setState({ times: +e.target.value })}
                  />
                  <span>{ !isTimesValid && '必須是數字' }</span>
                </div>
                <div className="form-group">
                  <label htmlFor="name">大松名稱</label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    required
                    value={name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                  <span>{ !isNameValid && '必須有打字' }</span>
                </div>

                <div className="form-group">
                  <label htmlFor="begin-date">開始日期</label>
                  <input
                    id="begin-date"
                    type="date"
                    className="form-control"
                    required
                    value={beginDate}
                    onChange={e => {
                      const beginDate = e.target.value
                      const { beginTime } = this.state
                      const begin = +moment(`${beginDate} ${beginTime}`)
                      this.setState({ beginDate, begin })
                    }}
                  />
                  <span>{ !isBeginDateValid && '必須是日期' }</span>
                </div>
                <div className="form-group">
                  <label htmlFor="begin-time">開始時間</label>
                  <input
                    id="begin-time"
                    type="time"
                    className="form-control"
                    required
                    value={beginTime}
                    onChange={e => {
                      const beginTime = e.target.value
                      const { beginDate } = this.state
                      const begin = +moment(`${beginDate} ${beginTime}`)
                      this.setState({ beginTime, begin })
                    }}
                  />
                  <span>{ !isBeginTimeValid && '必須是時間' }</span>
                </div>
                <div className="form-group">
                  <label htmlFor="end-date">結束日期</label>
                  <input
                    id="end-date"
                    type="date"
                    className="form-control"
                    required
                    value={endDate}
                    onChange={e => {
                      const endDate = e.target.value
                      const { endTime } = this.state
                      const end = +moment(`${endDate} ${endTime}`)
                      this.setState({ endDate, end })
                    }}
                  />
                  <span>{ !isEndDateValid && '必須是日期' }</span>
                </div>
                <div className="form-group">
                  <label htmlFor="end-time">結束時間</label>
                  <input
                    id="end-time"
                    type="time"
                    className="form-control"
                    required
                    value={endTime}
                    onChange={e => {
                      const endTime = e.target.value
                      const { endDate } = this.state
                      const end = +moment(`${endDate} ${endTime}`)
                      this.setState({ endTime, end })
                    }}
                  />
                  <span>{ !isEndTimeValid && '必須是時間' }</span>
                </div>
                <div className="form-group">
                  <label htmlFor="signup-date">註冊日期</label>
                  <input
                    id="signup-date"
                    type="date"
                    className="form-control"
                    required
                    value={signupDate}
                    onChange={e => {
                      const signupDate = e.target.value
                      const { signupTime } = this.state
                      const signup = +moment(`${signupDate} ${signupTime}`)
                      this.setState({ signupDate, signup })
                    }}
                  />
                  <span>{ !isSignupDateValid && '必須是日期' }</span>
                </div>
                <div className="form-group">
                  <label htmlFor="signup-time">註冊時間</label>
                  <input
                    id="signup-time"
                    type="time"
                    className="form-control"
                    required
                    value={signupTime}
                    onChange={e => {
                      const signupTime = e.target.value
                      const { signupDate } = this.state
                      const signup = +moment(`${signupDate} ${signupTime}`)
                      this.setState({ signupTime, signup })
                    }}
                  />
                  <span>{ !isSignupTimeValid && '必須是時間' }</span>
                </div>

                <button
                  id="go"
                  type="button"
                  className="btn btn-danger btn-lg btn-block"
                  disabled={!isOk}
                  onClick={() => {
                    console.log(this.state)
                    $('#tube iframe').attr('src', 'https://youtube.com/embed/mSaKTmpzV-0?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1')
                  }}
                >
                  給我開吧！
                </button>
              </form>
            </div>
            <div id={styles.panelRight}>
              <pre id={styles.output}>output...</pre>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default App

