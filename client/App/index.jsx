import React, { Component, PropTypes } from 'react'
import cx from 'classnames'

import styles from './index.css'



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
          <div className="row">
            <div className="col-lg-6">
              <form method="post">
                <div className="form-group">
                  <label htmlFor="date">第幾次</label>
                  <input type="text" className="form-control" defaultValue="" required />
                </div>
                <div className="form-group">
                  <label htmlFor="date">大松名稱</label>
                  <input type="text" className="form-control" defaultValue="" required />
                </div>

                <div className="form-group">
                  <label htmlFor="date">開始日期</label>
                  <input type="date" className="form-control" required />
                </div>
                <div className="form-group">
                  <label htmlFor="date">開始時間</label>
                  <input type="time" className="form-control" defaultValue="09:00" required />
                </div>
                <div className="form-group">
                  <label htmlFor="date">結束日期</label>
                  <input type="time" className="form-control" required />
                </div>
                <div className="form-group">
                  <label htmlFor="date">結束時間</label>
                  <input type="time" className="form-control" defaultValue="18:00" required />
                </div>
                <div className="form-group">
                  <label htmlFor="date">註冊日期</label>
                  <input type="time" className="form-control" required />
                </div>
                <div className="form-group">
                  <label htmlFor="date">註冊時間</label>
                  <input type="time" className="form-control" defaultValue="18:00" required />
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
            <div className="col-lg-6">
              <pre id="output">output...</pre>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default App

