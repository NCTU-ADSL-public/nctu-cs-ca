import React from 'react'
import './GradTable.css'


class GradSubject extends React.Component {
    realscore = [null, null, null, null, null, null, null, null]
    state = {
        name: this.props.name,
        credit: this.props.credit,
        realCredit: this.props.realCredit,
        semester: this.props.semester,
        year: this.props.year,
        comment: this.props.comment
    };

    componentWillMount(){
        this.realscore[this.state.year*2 + this.state.semester - 3] = this.props.score;
    }

    render(){
        return (
            <tr className={(this.state.name === ' ')? 'bigger-row': ''}>
                <td className="left-text">{this.state.name}</td>
                <td>{this.realscore[0]}</td>
                <td>{this.realscore[1]}</td>
                <td>{this.realscore[2]}</td>
                <td>{this.realscore[3]}</td>
                <td>{this.realscore[4]}</td>
                <td>{this.realscore[5]}</td>
                <td>{this.realscore[6]}</td>
                <td>{this.realscore[7]}</td>
                <td>{this.state.credit}</td>
                <td>{this.state.realCredit}</td>
                <td className="left-text">{this.state.comment}</td>
            </tr>
        );
    }
}

export default GradSubject;