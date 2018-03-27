import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { PostService } from '../../post.service';
import { Router } from '@angular/router';
import { ViewService } from '../../view.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  @Input() post;
  currentUser = "";
  likesIncluded;
  newComment = "";
  constructor(private _auth: AuthService, private _post: PostService,
  private _route: Router, private _view : ViewService) { }

  ngOnInit() {
    this.currentUser = this._auth.fetchUsername();
    this.likesIncluded = this.post.likes.includes(this.currentUser)
  }

  checkButtonValue() {
    if (this.post.likes.includes(this.currentUser)) {
      this.likesIncluded = true;
    } else {
      this.likesIncluded = false;
    }
  }

  likeFn() {
    this._post.likesUpdate({ like: true, id: this.post._id }).subscribe((data: any) => {
      if (data.success) {
        this.post.likes.push(this.currentUser);
        this.checkButtonValue();
      }
    })

  }

  unlikeFn() {
    this._post.likesUpdate({ like: false, id: this.post._id }).subscribe((data: any) => {
      if (data.success) {
        this.post.likes.splice(this.post.likes.indexOf(this.currentUser), 1)
        this.checkButtonValue();
      }
    })
  }

  addComment() {
    this._post.addComments({
      id: this.post._id, content : this.newComment
    }).subscribe((data: any) =>{
      if(data.success) {
        this.post.comments.push({ commentedBy: this.currentUser, content: this.newComment})
        this.newComment = "";
      }
    })
  }

  viewPostFn(){
    this._view.setPost(this.post);
    this._route.navigate(['view-post', this.post._id]);
  }

  likeModalFn() {
    
  }
}
