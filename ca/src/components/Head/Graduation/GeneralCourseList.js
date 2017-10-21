import React from 'react'
import GeneralCourse from './GeneralCourse'

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
            console.log(this.props.items[i]);
            if(this.props.items[i].dimension==="通識"){
                flag0 = 1;
            }
            else if(this.props.items[i].dimension==='公民'){
                flag1 = 1;
            }
            else if(this.props.items[i].dimension==="群己"){
                flag2 = 1;
            }
            else if(this.props.items[i].dimension==="文化"){
                flag3 = 1;
            }
            else if(this.props.items[i].dimension==="歷史"){
                flag4 = 1;
            }
            else if(this.props.items[i].dimension==="自然"){
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
            /*let newItem = [...this.state];
            newItem.公民.complete = true;
            this.setState({
                newItem
            })
            if(this.props.items[i].dimension==="通識"){
                let newItem = [...this.state];
                let newDimensionItem=[...this.state.now.items, this.props.items[i]];
                newItem["now"].items = newDimensionItem;
                newItem["now"].complete = true;
                this.setState({
                    newItem,
                })
            }
            else {
                let newItem = [...this.state];
                let dimension = this.props.items[i].dimension;
                let aItem = { cn: this.props.items[i].cn, en: this.props.items[i].en, dimension: this.props.items[i].dimension};
                //let newDimensionItem=[aItem, ...this.state.公民.items];
                newItem[this.props.items[i].dimension].items = aItem;
                newItem[this.props.items[i].dimension].complete = true;
                this.setState({
                    newItem,
                })
            }*/
        }
    }
    render(){
        return(
            <div id="course-button">
                <GeneralCourse
                    cosCame="當代"
                    completed={this.state.now}
                    items={this.state.now.items}
                />
                <GeneralCourse
                    cosCame="公民"
                    completed={this.state.Cival}
                    items={this.state.Cival.items}
                />
                <GeneralCourse
                    cosCame="群己"
                    completed={this.state.Group}
                    items={this.state.Group.items}
                />
                <GeneralCourse
                    cosCame="歷史"
                    completed={this.state.history}
                    items={this.state.history.items}
                />
                <GeneralCourse
                    cosCame="文化"
                    completed={this.state.culture}
                    items={this.state.culture.items}
                />
                <GeneralCourse
                    cosCame="自然"
                    completed={this.state.natural}
                    items={this.state.natural.items}
                />
            </div>
        );
    }
}

export default GenetalCourseList;