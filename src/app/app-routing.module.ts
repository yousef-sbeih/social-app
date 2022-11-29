import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { FormsGuard } from './shared/guards/forms.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [FormsGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [FormsGuard] },
  { path: ':username', component: ProfileComponent },
  { path: '', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
