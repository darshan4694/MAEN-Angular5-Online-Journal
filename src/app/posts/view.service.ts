import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ViewService {

  post;
  BASE_URL: String = "http://localhost:2000";  
  constructor(private _http : HttpClient) { }

  setPost(data) {
    this.post = data;
  }

  getPost(id) {
    if(this.post) {
      return this.post;
    } else {
      return this._http.get(this.BASE_URL + "/"+id);
    }
  }
}
