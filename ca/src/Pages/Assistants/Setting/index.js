import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { FormControl, Grid, Row, Col } from "react-bootstrap";
import moment from "moment";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";

const styles = theme => ({
  root: {
    width: '90%',
    margin: '0 auto'
  },
})

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      end: null
    };

    this.applyCallback = this.applyCallback.bind(this);
  }

  applyCallback(startDate, endDate) {
    console.log("Apply Callback");
    console.log(startDate.format("DD-MM-YYYY HH:mm"));
    console.log(endDate.format("DD-MM-YYYY HH:mm"));
    this.setState({
      start: startDate,
      end: endDate
    });
  }

  renderVanillaPicker(ranges, local, maxDate) {
    let value = 
      (this.state.start === null || this.state.end === null) ? '尚未設定' : 
    `${this.state.start.format(
      "YYYY-MM-DD HH:mm"
    )} - ${this.state.end.format("YYYY-MM-DD HH:mm")}`;
    let disabled = true;
    let start = moment();
    let end = moment(start).add(2, "months").subtract(1, "minute");
    return (
      <div>
        <DateTimeRangeContainer
          start={this.state.start === null ? start : this.state.start}
          end={this.state.end === null ? end : this.state.end}
          local={local}
          applyCallback={this.applyCallback}
          smartMode
        >
          <FormControl
            id="formControlsTextB"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: "pointer" }}
            disabled={disabled}
            value={value}
          />
        </DateTimeRangeContainer>
        <br />
      </div>
    );
  }

  render() {
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(1, "days")
      .subtract(1, "seconds");
    let ranges = {
      // "Today Only": [moment(start), moment(end)],
      // "Yesterday Only": [
      //   moment(start).subtract(1, "days"),
      //   moment(end).subtract(1, "days")
      // ],
      // "3 Days": [moment(start).subtract(3, "days"), moment(end)],
      // "5 Days": [moment(start).subtract(5, "days"), moment(end)],
      // "1 Week": [moment(start).subtract(7, "days"), moment(end)],
      // "2 Weeks": [moment(start).subtract(14, "days"), moment(end)],
      // "1 Month": [moment(start).subtract(1, "months"), moment(end)],
      // "90 Days": [moment(start).subtract(90, "days"), moment(end)],
      // "1 Year": [moment(start).subtract(1, "years"), moment(end)]
    };
    let local = {
      format: "YYYY-MM-DD HH:mm",
      sundayFirst: false
    };
    let maxDate = moment(start).add(100, "years");
    return (
      <div className="container">
        {this.renderVanillaPicker(ranges, local, maxDate)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(index))