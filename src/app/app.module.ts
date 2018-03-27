import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { DashboardComponent } from './users/dashboard/dashboard.component';
import { CreateComponent } from './posts/create/create.component';
import { ListComponent } from './posts/list/list.component';
import { SinglePostComponent } from './posts/list/single-post/single-post.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from './posts/post.service';
import { AuthinterceptorService } from './auth/authinterceptor.service';
import { ViewPostComponent } from './posts/view-post/view-post.component';
import { ViewService } from './posts/view.service';
import { ViewModalComponent } from './posts/view-modal/view-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'create', component: CreateComponent },
  { path: 'list', component: ListComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CreateComponent,
    ListComponent,
    SinglePostComponent,
    NavComponent,
    ViewPostComponent,
    ViewModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],
  providers: [
    AuthService,
    CookieService,
    PostService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthinterceptorService,
      multi : true
    },
    ViewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
