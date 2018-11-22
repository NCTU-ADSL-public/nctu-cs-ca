import './style.css'
import img from './1.jpg'
import React from 'react'
import { Image } from 'react-bootstrap'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-backspace'
import ScoreDialog from '../ScoreDialog'
import Vedios from '../Vedio.json'

import defaultPic from '../../../../Resources/defalt.jpg'
// mui
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
// for multiTheme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
  largeIcon: {
    width: 40,
    height: 40,
    zIndex: 100
  },
  large: {
    width: 100,
    height: 100,
    padding: 30
  },
  chip: {
    margin: 5
  },
  chipWrapper: {
    padding: 5,
    display: 'flex',
    flexWrap: 'wrap'
  }
}

export default class Show extends React.Component {
  state={
    link : Vedios.filter(t => t.title === this.props.show.research_title && t.link !== undefined && t.link !== '')[0]
  }
  render () {
    return (
      <div className='container'>
        <IconButton
          iconStyle={styles.largeIcon}
          style={styles.large}
          onClick={() => this.props.onclick()}
        >
          <ActionHome />
        </IconButton>
        <div className=' col-md-12 offset-1'>
          <div className='banner-wrapper'>
            <Image
              alt='無圖片'
              width='1200' height='400'
              src={this.props.show.image !== undefined ? this.props.show.image : img}
              responsive
              rounded
           />
          </div>
          <div className='event-title'>{ this.props.show.research_title }</div>
          <div>
            <ScoreDialog
              title={this.props.show.research_title}
              participants={this.props.show.participants}
              firstSecond={this.props.show.firstSecond}
              idCard={this.props.idCard}
              year={this.props.show.year}
            />
          </div>
          <div>
            <MuiThemeProvider>
              <div style={styles.chipWrapper}>
                {this.props.show.participants.map((item, i) => (
                  <Chip style={styles.chip} key={i} >
                    <Avatar src={defaultPic} /> {item.student_id} {item.sname}
                    <span style={{color: 'red'}}> {item.score}</span>
                  </Chip>
                ))}
              </div>
            </MuiThemeProvider>
          </div>
          <div className='event-info-wrapper bg-white'>
            <div className='row'>
              <div className='col-7'>
                <p><i className='glyphicon glyphicon-file' /> 團隊報告: <a href={this.props.file === '' ? this.props.show.file : this.props.file} style={{cursor: 'pointer'}}>點這裡</a></p>
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-7'>
                <p><i className='glyphicon glyphicon-film' /> 影片: </p>
              </div>
            </div>
            {this.state.link !== undefined
              ? <iframe src={this.state.link.link} width='640' height='480' title='show' />
              : ''}
            <div className='divide-horizontal '>
              <div className='divide-horizontal-span'>
                <p >專題簡介</p>
              </div>
            </div>
            <section dangerouslySetInnerHTML={{__html: this.props.show.intro}} />
          </div>
        </div>
      </div>
    )
  }
}
