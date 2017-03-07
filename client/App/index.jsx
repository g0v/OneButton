import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

import styles from './index.css'
console.log(styles)



class App extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { id, className } = this.props
    const classes = cx(styles.className, className)

    return (
      <div id={id} className={classes}>
        <div className="container">
          <h1>一鍵開大松</h1>
          <div id={styles.panel}>
            <div id={styles.panelLeft}>
              <form method="post">
                <div className="form-group">
                  <label htmlFor="times">第幾次</label>
                  <input id="times" type="number" className="form-control" defaultValue="" required />
                </div>
                <div className="form-group">
                  <label htmlFor="name">大松名稱</label>
                  <input id="name" type="text" className="form-control" defaultValue="" required />
                </div>

                <div className="form-group">
                  <label htmlFor="begin-date">開始日期</label>
                  <input id="begin-date" type="date" className="form-control" required />
                </div>
                <div className="form-group">
                  <label htmlFor="begin-time">開始時間</label>
                  <input id="begin-time" type="time" className="form-control" defaultValue="09:00" required />
                </div>
                <div className="form-group">
                  <label htmlFor="end-date">結束日期</label>
                  <input id="end-date" type="time" className="form-control" required />
                </div>
                <div className="form-group">
                  <label htmlFor="end-time">結束時間</label>
                  <input id="end-time" type="time" className="form-control" defaultValue="18:00" required />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-date">註冊日期</label>
                  <input id="signup-date" type="time" className="form-control" required />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-time">註冊時間</label>
                  <input id="signup-time" type="time" className="form-control" defaultValue="18:00" required />
                </div>
                <button
                  id="go"
                  type="button"
                  className="btn btn-danger btn-lg btn-block"
                  onClick={() => {
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

