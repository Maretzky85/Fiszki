import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuestionComponent} from './components/questions/question.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {QuestionItemComponent} from './components/questions/question-item/question-item.component';
import {AnswerItemComponent} from './components/answer-item/answer-item.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarTopComponent} from './components/navbar-top/navbar-top.component';
import {NewQuestionComponent} from './components/new-question/new-question.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule} from 'ngx-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterLoginComponent} from './components/register-login/register-login.component';
import {InterceptorService} from './services/interceptor.service';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {WINDOW_PROVIDERS} from './services/window.service';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionItemComponent,
    AnswerItemComponent,
    NavbarTopComponent,
    NewQuestionComponent,
    RegisterLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ButtonsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LoadingBarModule
  ],
  providers: [
    WINDOW_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [RegisterLoginComponent]
})
export class AppModule {
}
