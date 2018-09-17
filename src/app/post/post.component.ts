import { BadInputError } from './../common/bad-input';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post:any=[];
  
  constructor(private service:PostService) { 
   
  }
  createPost(inputTitle:HTMLInputElement){
    console.log(inputTitle);
    let post = {
      title:inputTitle.value
    }
    this.post.splice(0,0,post);
    inputTitle.value='';

    this.service.create(post)
    .subscribe(
      newPost=>{
      post['id'] = newPost.id;
      
      console.log(newPost);
      },(error:AppError)=>{
        this.post.splice(0,1);
        if(error instanceof BadInputError){
          // this.form.setErrors(error.originalError);

        }
        else throw error;
    })
  }

  updatePost(pos){
    this.service.update(pos)
    .subscribe(
      updatePost=>{
      console.log(updatePost);
    })
  }

  deletePost(post){
    let postId =  post.id
    this.service.deletePost(postId)
    .subscribe(
      ()=>{
      let index= this.post.indexOf(post);
      this.post.splice(index,1); 
    },(error:AppError)=>{
      if(error instanceof NotFoundError){
        alert('This Post ID Already deleted');
      }
     else throw error
    })
  }

  ngOnInit() {
    this.service.getAll()
    .subscribe(
      post=>{
      this.post = post;
    })
  }

  

}
