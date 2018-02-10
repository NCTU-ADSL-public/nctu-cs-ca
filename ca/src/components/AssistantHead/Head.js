import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import FadeIn from 'react-fade-in'

import HomeItem from './Home/Home.js'
import GraduationItem from './Graduation/index'

import './Head.css'
import Navbar from '../Components/Navbar'

class Head extends React.Component {

    constructor (props) {

        super(props)
        axios.get('/assistants/profile').then(studentData => {
            this.setState({
                idCard: {
                    name: studentData.data[0].aname,
                    prog: studentData.data[0].assistant_id,
                    grad: studentData.data[0].status
                }
            })
        }).catch(err => {
            console.log(err)
        })

        this.state = {
            selectedIndex: 0,
            idCard: {
                name: '小翠',
                prog: '助理',
                grad: ''
            }
        }
    }

    componentDidMount () {
        this.select(1)
    }

    select (index) {
        if (index === 0) {
            ReactDOM.render(
                <div>
                    <FadeIn>
                        <HomeItem />
                    </FadeIn>
                </div>,
                document.getElementById('page'))
        } else if (index === 1) {
            ReactDOM.render(
                <div>
                    <FadeIn>
                        <GraduationItem idCard={this.state.idCard} />
                    </FadeIn>
                </div>,
                document.getElementById('page'))
        }

        this.setState({selectedIndex: index})
    }

    render () {
        const onTouchTaps = [
            () => this.select(0),
            () => this.select(1),
        ]
        return (
            <div id="Head">
                <Navbar type='assistant'
                        name={this.state.idCard.name}
                        subname={this.state.idCard.prog + this.state.idCard.grad}
                        selectedIndex={this.state.selectedIndex}
                        onTouchTaps={onTouchTaps}
                />
                <div id='topRec' />

                <div id='page' />
                <footer>Copyright @2017 NCTUCS 交通大學資訊工程學系</footer>
            </div>
        )
    }
}

export default Head
