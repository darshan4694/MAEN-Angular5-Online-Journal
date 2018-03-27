import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  allPosts = [];
  constructor( private _post : PostService) { }

  ngOnInit() {
    this._post.getPosts().subscribe((data:any) => {
      this.allPosts = data.posts;
      console.log(this.allPosts);
    })
  }

}
