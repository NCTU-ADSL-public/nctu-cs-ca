import React from 'react'
import './GradTable.css'


class GradSubject extends React.Component {
    realscore = [null, null, null, null, null, null, null, null]
    state = {
        name: this.props.name,
        credit: this.props.credit,
        semester: this.props.semester,
        year: this.props.year,
        comment: ''
    };

    componentWillMount(){
        this.realscore[(this.state.year-103)*2 + this.state.semester - 1] = this.props.score;
    }

    render(){
        return (
            <tr>
                <td className="cell-text left-text">{this.state.name}</td>
                <td className="cell-text">{this.realscore[0]}</td>
                <td className="cell-text">{this.realscore[1]}</td>
                <td className="cell-text">{this.realscore[2]}</td>
                <td className="cell-text">{this.realscore[3]}</td>
                <td className="cell-text">{this.realscore[4]}</td>
                <td className="cell-text">{this.realscore[5]}</td>
                <td className="cell-text">{this.realscore[6]}</td>
                <td className="cell-text">{this.realscore[7]}</td>
                <td className="cell-text">{this.state.credit}</td>
                <td className="cell-text"></td>
                <td className="cell-text">{this.state.comment}</td>
            </tr>
        );
    }
}

export default GradSubject;