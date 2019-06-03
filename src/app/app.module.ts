import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionItemComponent } from './question-item/question-item.component';
import { AnswerItemComponent } from './answer-item/answer-item.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { NewQuestionComponent } from './new-question/new-question.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule} from 'ngx-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionItemComponent,
    AnswerItemComponent,
    NavbarTopComponent,
    NewQuestionComponent,
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
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
