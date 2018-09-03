import React from 'react'
// mui
import Avatar from 'material-ui/Avatar'
import {Card, CardText} from 'material-ui/Card'
// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {CardHeader, Table, TableBody, TableRow, TableRowColumn} from 'material-ui'
import {Tabs, Tab} from 'material-ui/Tabs'
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import MailButton from '../../../Components/mail/MailButton'

const semester = ['', '上', '下', '暑']

class InfoCard extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <Card style={this.props.selected.failed && {backgroundColor: '#fff', border: '2px solid #F50057'}}>
          <CardHeader
            avatar={
              <Avatar style={
                this.props.selected.failed
                  ? {backgroundColor: '#F50057', color: '#fff'}
                  : {backgroundColor: '#3949AB', color: '#fff'}
              }>
                {this.props.selected.sname[0]}
              </Avatar>
            }
            title={this.props.selected.sname}
            subtitle={`${this.props.selected.program} / ${this.props.selected.student_id}`}>
            <span style={{position: 'absolute', right: 20}}>
              <MailButton
                sender={this.props.sender}
                sender_email={this.props.sender_email}
                receiver={this.props.selected.sname}
                receiver_email={this.props.selected.email}
                failed={this.props.selected.failed}
              />
            </span>
          </CardHeader>
          <CardText>
            <div className='text-center h5 mb-2'>各學年度平均總成績</div>
            <div>
              <ResponsiveContainer
                width={(window.innerWidth < 768) ? window.innerWidth * 0.6 : window.innerWidth * 0.4}
                aspect={2}>
                <LineChart
                  data={this.props.selected.score}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                  <XAxis dataKey='semester' />
                  <YAxis domain={[0, 100]} />
                  <CartesianGrid strokeDasharray='3 3' />
                  <Tooltip />
                  <Line
                    type='monotone'
                    dataKey='avg'
                    stroke={`${this.props.selected.failed ? '#F50057' : '#8884d8'}`}
                    activeDot={{r: 8}}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardText>
          <CardText>
            <Tabs>
              {
                this.props.selected.score && this.props.selected.score.map(
                  (v, i) => (
                    <Tab
                      key={i}
                      label={`${v.semester.split('-')[0]}${semester[parseInt(v.semester.split('-')[1])]}`}
                      buttonStyle={
                        v.failed
                          ? {backgroundColor: '#fd93b5'}
                          : {backgroundColor: '#87cdff'}}>
                      <Table>
                        {/* <TableHeader displaySelectAll={false}>
                        <TableRow>
                          <TableRowColumn>科目</TableRowColumn>
                          <TableRowColumn>成績</TableRowColumn>
                        </TableRow>
                      </TableHeader> */}
                        <TableBody displayRowCheckbox={false} >
                          {v.score.map((v, i) => (
                            <TableRow key={i} style={v.pass || {color: 'red'}}>
                              <TableRowColumn>{v.cn}</TableRowColumn>
                              <TableRowColumn>{v.score === null ? (v.pass ? '通過' : '不通過') : v.score}</TableRowColumn>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Tab>
                  )
                )
              }
            </Tabs>

          </CardText>
        </Card>
      </MuiThemeProvider>
    )
  }
}
export default InfoCard
