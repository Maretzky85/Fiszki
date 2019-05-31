import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { NewQuestionComponent } from './new-question/new-question.component';

const routes: Routes = [
  {
    path: 'home',
    component: QuestionComponent
  },
  {
    path: 'newQuestion',
    component: NewQuestionComponent
  },
  {
    path: 'courses',
    component: QuestionComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
