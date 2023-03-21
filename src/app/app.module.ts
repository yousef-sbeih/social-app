import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MaterialModule } from './material.module';
import { NewPostComponent } from './components/new-post/new-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersListComponent } from './components/users-list/users-list.component';
import { PostDialogComponent } from './components/post-dialog/post-dialog.component';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './shared/store/post.reducer';
import { userReducer } from './shared/store/user.reducer';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TokenInterceptorService } from './shared/services/interceptors/token-interceptor.service';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    NavBarComponent,
    PostsComponent,
    ProfileComponent,
    NewPostComponent,
    UsersListComponent,
    PostDialogComponent,
    ConfirmDialogComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ posts: postReducer, user: userReducer }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
