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
                {this.state.data.map((item,i)=>(<li key={i}>首页文章 {i+1}</li>) )}
            </ul>)
    }
}