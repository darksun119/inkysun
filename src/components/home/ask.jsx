import React,{Component} from 'react';

export default class AllArticle extends Component{
    constructor(){
        super();
        this.state={
            data:[1,2,3,4,5,6,7,8,9,10]
        }
    }
    render(){
        return(
            <ul className="articleList">
                {this.state.data.map((item,i)=>(<li key={i}>提问页第 {i+1} 个问题</li>) )}
            </ul>)
    }
}