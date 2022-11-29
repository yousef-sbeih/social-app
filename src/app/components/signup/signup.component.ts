import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoutingService } from 'src/app/shared/services/routing.service';
import { FormsService } from 'src/app/shared/services/forms.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  formStep: number = 1;
  minFormStep: number = 1;
  maxFormStep: number = 3;
  uploadedImageUrl: string | ArrayBuffer | null =
    'https://i.top4top.io/p_2469ir5i41.png';
  uploadedImage: File;
  imageURL: Observable<string>;
  filePath: string;
  showLoader: boolean = false;
  isUploadingFinished: boolean = false;
  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService,
    private router: RoutingService,
    public formService: FormsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl('', [Validators.maxLength(100)]),
    });
    this.formService.form = this.signupForm;
  }
  onNextClick() {
    this.formStep++;
  }
  onBackClick() {
    this.formStep--;
  }
  onFileChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    const random = Date.now();
    const filePath = `socialProject/${random}`;
    const fileRef = this.storage.ref(filePath);
    this.showLoader = true;
    let reader = new FileReader();
    if (target.files && target.files.length > 0) {
      let file = target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadedImageUrl = reader.result;
      };
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
            this.isUploadingFinished = true;
            this.showLoader = false;
          }
        );
    }
  }
  onSubmit() {
    this.authService
      .signup({
        ...this.signupForm.value,
        profilePicture: this.filePath,
      })
      .subscribe();
  }
  getInputValue(formControlName: string) {
    return this.signupForm.get(formControlName);
  }
  onLogin() {
    this.router.directToLogin();
  }
  isNextDisabled() {
    return (
      (this.formStep === 1 &&
        !this.formService.allInputsValid('fullname', 'email', 'username')) ||
      (this.formStep === 2 &&
        !this.formService.allInputsValid('password', 'description'))
    );
  }
}
