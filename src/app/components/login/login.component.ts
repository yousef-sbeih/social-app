import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginUser } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormsService } from 'src/app/shared/services/forms.service';
import { RoutingService } from 'src/app/shared/services/routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  constructor(
    private routerService: RoutingService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public formService: FormsService
  ) {}
  ngOnInit(): void {
    this.formService.form = this.loginForm;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.formService.form = this.loginForm;
  }
  onSignup() {
    this.routerService.directToSignup();
  }
  onSubmit() {
    this.authService.login(this.createLoginInterface()).subscribe(
      () => {
        this.snackBar.dismiss();
      },
      () => {
        this.snackBar.open('Wrong email or password ', 'close', {});
      }
    );
  }
  createLoginInterface(): LoginUser {
    const { email, password } = this.loginForm.value;
    return { email, password };
  }
}
