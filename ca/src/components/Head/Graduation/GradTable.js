import React from 'react'
import './GradTable.css'

class GradSubject extends React.Component {
    state = {
        name: '',
        credit: 0,
        score: [null, null, null, null, null, null, null, null],
        comment: ''
    }

    render(){
        return (
            <tr>
                <td class="cell-text left-text">{this.state.name}</td>
                <td class="cell-text">{this.state.score[0]}</td>
                <td class="cell-text">{this.state.score[1]}</td>
                <td class="cell-text">{this.state.score[2]}</td>
                <td class="cell-text">{this.state.score[3]}</td>
                <td class="cell-text">{this.state.score[4]}</td>
                <td class="cell-text">{this.state.score[5]}</td>
                <td class="cell-text">{this.state.score[6]}</td>
                <td class="cell-text">{this.state.score[7]}</td>
                <td class="cell-text">{this.state.credit}</td>
                <td class="cell-text"></td>
                <td class="cell-text">{this.state.comment}</td>
            </tr>
        )
    }
}

export default GradSubject;