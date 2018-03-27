import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { PostService } from '../../posts/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user;
  allBlogs = [];
  constructor(private _auth : AuthService, private _post : PostService, private _router : Router) { }

  ngOnInit() {
    this._auth.getUserDetails().subscribe((data: any)=>{
      console.log(data);
      if(data.success) {
        this.user = data.user;
        this._post.getUsersPosts(this.user.blogs).subscribe((data:any) => {
          this.allBlogs = data.blogs;
          console.log(data);
        })
      }
    })
  }

  viewMoreFn(id) {
    this._router.navigate(['view-post', id]);
  }

}
