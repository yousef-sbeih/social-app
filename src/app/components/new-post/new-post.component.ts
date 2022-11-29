import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { postPost } from 'src/app/shared/interfaces/post.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  currentUser: User;
  imageURL: Observable<string>;
  filePath: string;
  showUploadMessage: boolean = false;
  isUploadFinished: boolean = false;
  postText: string;
  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    private postSerivce: PostService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.decodeCurrentUser();
  }
  onFileChanged(e: Event) {
    this.showUploadMessage = true;
    const target = e.target as HTMLInputElement;
    const random = Date.now();
    const filePath = `socialProject/${random}`;
    const fileRef = this.storage.ref(filePath);
    let reader = new FileReader();
    if (target.files && target.files.length > 0) {
      let file = target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {};
      const task = this.storage.upload(`/socialProject/${random}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.imageURL = fileRef.getDownloadURL();
            this.imageURL.subscribe((url) => {
              this.filePath = url;
            });
          })
        )
        .subscribe(
          () => {},
          () => {},
          () => {
            this.showUploadMessage = false;
            this.isUploadFinished = true;
          }
        );
    }
  }
  onSubmit() {
    this.postSerivce.post(this.createPost()).subscribe();
    this.isUploadFinished = false;
  }
  createPost(): postPost {
    return {
      authorId: this.currentUser._id,
      image: this.filePath,
      text: this.postText,
    };
  }
}
