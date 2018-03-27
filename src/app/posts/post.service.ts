import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService {

  BASE_URL: String = "http://localhost:2000";
  
  constructor(private _http : HttpClient) { }

  createNewPost(post) {
    return this._http.post(this.BASE_URL+'/create', post)
  }
  
  getPosts() {
    return this._http.get(this.BASE_URL+'/list');
  }

  likesUpdate(data) {
    return this._http.post(this.BASE_URL+'/likesupdate', data);
  }

  addComments(data) {
    return this._http.post(this.BASE_URL+'/createcomment', data);
  }

  getUsersPosts(data: any){
    return this._http.post(this.BASE_URL+'/getusersposts', data);
  }

  getPost(id) {
    return this._http.get(this.BASE_URL + "/getpost/"+id);    
  }
}
