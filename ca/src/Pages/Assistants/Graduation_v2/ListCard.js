import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgressbar from 'react-circular-progressbar'
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import QueryBuilder from '@material-ui/icons/QueryBuilder';

const styles = theme => ({
  card: {
    marginTop: '10px'
  }
})

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({

})

const GRAD_STATUS_CN = ['未符合', '將符合', '已符合']

class ListPanel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {

    const { classes, student } = this.props

    return (
      <Card className={classes.card}>
        <CardContent>
          <div style={{ width: "120px" }}>
            <div style = {{ fontSize: '35px', fontWeight: 'bold' }}>{ student.name }</div>
            <div style = {{ fontSize: '18px', marginBottom: '10px'}}>{ student.id + ' / ' + student.program }</div>
            <CircularProgressbar
              percentage={100 * student.total / 128}
              text={student.total}
              initialAnimation
              styles={{
                path: { stroke: '#34855e' },
                text: { fill: '#34855e', fontSize: '25px', fontWeight: 'bold' }
              }}
            />
            <div>
            {
              parseInt(student.status) === 0 && <span>
                <Clear style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                <div style = {{ display: 'inline', verticalAlign: 'middle', fontSize: '25px', fontWeight: 'bold' }} >未符合</div>
              </span>
              ||
              parseInt(student.status) === 1 && <span>
                <QueryBuilder style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                <div style = {{ display: 'inline', verticalAlign: 'middle', fontSize: '25px', fontWeight: 'bold' }} >將符合</div>
              </span>
              ||
              parseInt(student.status) === 2 && <span>
                <Done style = {{ fontSize: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
                <div style = {{ display: 'inline', verticalAlign: 'middle', fontSize: '25px', fontWeight: 'bold' }} >已符合</div>
              </span>
            }

            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListPanel))
