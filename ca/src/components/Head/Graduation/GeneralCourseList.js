import React from 'react'
import GeneralCourse from './GeneralCourse'

let item0=[];
let item1=[];
let item2=[];
let item3=[];
let item4=[];
let item5=[];



class GenetalCourseList extends React.Component{
    state={
        now:false,
        Cival:false,
        Group:false,
        culture:false,
        history:false,
        natural:false,
    };
    componentWillMount(){
        console.log(this.props.items);
        let flag0=0;
        let flag1=0;
        let flag2=0;
        let flag3=0;
        let flag4=0;
        let flag5=0;
        for(let i=0;i<this.props.items.length;i++){
            if(this.props.items[i].dimension==="通識"){
                let newitem = [...item0, this.props.items[i].cn];
                item0 = newitem;
                flag0 = 1;
            }
            else if(this.props.items[i].dimension==='公民'){
                let newitem = [...item1, this.props.items[i].cn];
                item1 = newitem;
                flag1 = 1;
            }
            else if(this.props.items[i].dimension==="群己"){
                let newitem = [...item2, this.props.items[i].cn];
                item2 = newitem;
                flag2 = 1;
            }
            else if(this.props.items[i].dimension==="文化"){
                let newitem = [...item3, this.props.items[i].cn];
                item3 = newitem;
                flag3 = 1;
            }
            else if(this.props.items[i].dimension==="歷史"){
                let newitem = [...item4, this.props.items[i].cn];
                item4 = newitem;
                flag4 = 1;
            }
            else if(this.props.items[i].dimension==="自然"){
                let newitem = [...item5, this.props.items[i].cn];
                item5 = newitem;
                flag5 = 1;
            }
            this.setState({
                now:flag0,
                Cival:flag1,
                Group:flag2,
                culture:flag3,
                history:flag4,
                natural:flag5
            })
        }
        console.log(item4)
    }
    componentDidMount(){
        console.log(item0)
    }
    render(){
        return(
            <div id="course-button">
                <GeneralCourse
                    cosCame="當代"
                    completed={this.state.now}
                    items={item0}
                />
                <GeneralCourse
                    cosCame="公民"
                    completed={this.state.Cival}
                    items={item1}
                />
                <GeneralCourse
                    cosCame="群己"
                    completed={this.state.Group}
                    items={item2}
                />
                <GeneralCourse
                    cosCame="文化"
                    completed={this.state.culture}
                    items={item3}
                />
                <GeneralCourse
                    cosCame="歷史"
                    completed={this.state.history}
                    items={item4}
                />
                <GeneralCourse
                    cosCame="自然"
                    completed={this.state.natural}
                    items={item5}
                />
            </div>
        );
    }
}

export default GenetalCourseList;