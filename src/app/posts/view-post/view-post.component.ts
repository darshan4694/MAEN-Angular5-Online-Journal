import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewService } from '../view.service';
import { PostService } from '../post.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  post;
  currentUser = "";
  likesIncluded;
  newComment = "";
  constructor(private route: ActivatedRoute, private _post: PostService, private _auth : AuthService) { }

  ngOnInit() {
    this._post.getPost(this.route.snapshot.params['id']).subscribe((data: any) => {
      this.post = data.post;
      this.currentUser = this._auth.fetchUsername();
      this.likesIncluded = this.post.likes.includes(this.currentUser)
    });
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
      id: this.post._id, content: this.newComment
    }).subscribe((data: any) => {
      if (data.success) {
        this.post.comments.push({ commentedBy: this.currentUser, content: this.newComment })
        this.newComment = "";        
      }
    })
  }



}
