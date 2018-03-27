import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  newPost = {
    title: "",
    content: ""
  }
  constructor(private _post: PostService, private _router : Router) { }

  ngOnInit() {
  }

  createPost() {
    this._post.createNewPost(this.newPost).subscribe((data : any) => {
      if(data.success) {
        alert('Post created! Thank you!');
        this._router.navigate(['list']);
      }
    })
  }
}
