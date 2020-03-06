import React, { Component } from 'react'
import $ from 'jquery'
import { findDOMNode } from 'react-dom'
import Navbar from './Navbar'


export default class Home extends Component {

    constructor(props){
        super(props);
        this.state={
          act: 0,
          index: '',
          datas: [],
          course_error:'',
          grade_error:'',
          changeBtn:true
        }
      } 
    
      componentDidMount(){
        this.refs.name.focus();
      }

      increment = (e) =>{
          e.preventDefault();
          this.setState({ count: this.state.count + 1 })
      }

      decrement = (e) =>{
        e.preventDefault();
        this.setState({ count: this.state.count - 1 })
      }

    
      fSubmit = (e) =>{
        e.preventDefault();
        console.log('try');
        let datas = this.state.datas;
        let name = this.refs.name.value;
        let grade = this.refs.grade.value;

        if(!name==""){
            if(!grade==""){
                if(this.state.act === 0){ 
                    //new
                   let data = {
                     name, grade
                   }
                   datas.push(data);
                 }else{
                                      //update
                   let index = this.state.index;
                   datas[index].name = name;
                   datas[index].grade = grade;
                 }
         
                 this.setState({
                   datas: datas,
                   act: 0
                 });
          
                 this.refs.myForm.reset();
                 this.refs.name.focus();
            }
            else{
                this.setState({grade_error : "Grade must be an integer between 0-100"})
        }
        }
        else{
            this.setState({course_error : "Course name cannot be blank"})
        }
      }
    
      fRemove = (i) => {
        let datas = this.state.datas;
        datas.splice(i,1);
        this.setState({
          datas: datas
        });
    
        this.refs.myForm.reset();
        this.refs.name.focus();
      }
    
      fEdit = (i) => {
        
        let data = this.state.datas[i];
        this.refs.name.value = data.name;
        this.refs.grade.value = data.grade;
        this.state.changeBtn = false
        
     if(this.state.changeBtn==false){
        this.setState({
            act: 1,
            index: i,
          });
      
     }
        
        this.refs.name.focus();
    
    }

    render() {
        let datas = this.state.datas;
        
        return (
            <div>
                 <Navbar /> <br/> <br/> 
            <div className="row">
                <div style={{marginLeft:'500px'}} className="col-md-5">
                
        <h2 className="text-center">Add Data</h2>
        <form ref="myForm" >
        <div className="form-group">
         <label>Course Name</label>
          <input 
          type="text" 
          ref="name" 
          placeholder="Course Name" 
          className="form-control" 
          />
          <small style={{fontSize:'15px'}} className="form-text text-danger" >{this.state.course_error}</small>
          </div>
          <div className="form-group">
          <label>Grade</label>
          <input 
          type="number" 
          minLength="0"
          maxLength="100"
          ref="grade" 
          placeholder="Grade 0 to 100" 
          className="form-control" 
          />
          <small style={{fontSize:'15px'}} className="form-text text-danger" >{this.state.grade_error}</small>
          </div>
          
        {this.state.changeBtn ? (<button onClick={(e)=>this.fSubmit(e)} className="btn btn-primary">Submit </button>) : (<button onClick={(e)=>this.fSubmit(e)} className="btn btn-primary">Edit </button>)}
          
        </form>
      </div>
    

      <div style={{marginLeft:'500px'}} className="col-md-5" >
      <hr/>
      <h2 className="text-center">Show Data</h2>
      <table className="table">
  <thead className="thead-light">
    <tr>
      <th>Id</th>
      <th>Course Name</th>
      <th>Grade</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {datas.map((data, i) =>
    <tr key={i}>
        <td>{i+1}</td>
      <td>{data.name}</td>
      <td>{data.grade}</td>
      <td>
      <button className="btn btn-primary" onClick={()=>this.fEdit(i)} ><i className="fa fa-pencil"></i></button>&nbsp;&nbsp;
      <button className="btn btn-danger" onClick={()=>this.fRemove(i)}><i className="fa fa-trash"></i></button>
      </td>
    </tr>
 )}
  </tbody>
</table>
      </div>
            </div>
            </div>
        )
    }
}
