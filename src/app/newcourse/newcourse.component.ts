import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-newcourse',
  templateUrl: './newcourse.component.html',
  styleUrls: ['./newcourse.component.css']
})
export class NewcourseComponent {

  form 
  // = new FormGroup({
  //   name:new FormControl(),
  //   contact:new FormGroup({
  //     email:new FormControl(),
  //     phone:new FormControl()
  //   }),
  //   topics:new FormArray([])
  // });
  constructor(fb:FormBuilder){
    this.form = fb.group({
      name : ['',Validators.required],
      contact:fb.group({
        email:[],
        phone:[]
      }),
      topics:fb.array([])
    })

  }
  addTopic(topic:HTMLInputElement){
    console.log(topic);
    this.topics.push(new FormControl(topic.value))
    topic.value='';
    console.log(this.topics);
  }

  removeTopic(topic:FormControl){
    let index = this.topics.controls.indexOf(topic)
    this.topics.removeAt(index)
  }

  get topics(){
    return this.form.get('topics') as FormArray
  }

  

}
