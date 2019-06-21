import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// Components
import {AppComponent} from './app.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {FeedbackComponent} from './components/user.feedback/feedback.component';
import {NotesComponent} from './components/user.notes/notes.component';
import {NotFoundComponent} from './components/public.not-found/not-found.component';
import {LoginComponent} from './components/public.login/login.component';
import {RegisterComponent} from './components/public.register/register.component';
import {UsersComponent} from './components/admin.users/users.component';
import {CommandsComponent} from './components/admin.commands/commands.component';
// Font Awesome
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope,
  faPen,
  faPlusCircle,
  faSignInAlt,
  faSignOutAlt,
  faStickyNote,
  faTrashAlt,
  faUser,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
// Toasts
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
// Modules
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {AutosizeModule} from 'ngx-autosize';

import {APP_CONFIG, AppConfig} from './app.config';
import {AuthInterceptor} from './auth/auth.interceptor';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {AuthRole} from './auth/auth-role.enum';
import {RouteUrls} from './app.route-urls';
import {AuthRedirectGuard} from './auth/auth.redirect.guard';

const appRoutes: Routes = [
  {path: RouteUrls.REGISTER, component: RegisterComponent, canActivate: [AuthRedirectGuard]},
  {path: RouteUrls.LOGIN, component: LoginComponent, canActivate: [AuthRedirectGuard]},
  {path: RouteUrls.NOTES, component: NotesComponent, canActivate: [AuthGuard], data: {role: AuthRole.USER}},
  {path: RouteUrls.FEEDBACK, component: FeedbackComponent, canActivate: [AuthGuard], data: {role: AuthRole.USER}},
  {path: RouteUrls.USERS, component: UsersComponent, canActivate: [AuthGuard], data: {role: AuthRole.ADMIN}},
  {path: RouteUrls.COMMANDS, component: CommandsComponent, canActivate: [AuthGuard], data: {role: AuthRole.ADMIN}},
  {path: '**', component: NotFoundComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FeedbackComponent,
    NotesComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    CommandsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgxPaginationModule,
    ReactiveFormsModule, FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AutosizeModule,
    ToastrModule.forRoot({newestOnTop: false, positionClass: 'toast-bottom-right'})
  ],
  providers: [{provide: APP_CONFIG, useValue: AppConfig},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // fontawesome library
    library.add(faStickyNote, faEnvelope, faPen, faTrashAlt, faPlusCircle, faUserPlus, faUser, faSignInAlt, faSignOutAlt);
  }
}
