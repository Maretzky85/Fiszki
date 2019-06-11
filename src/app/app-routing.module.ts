import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuestionComponent} from './components/questions/question.component';
import {NewQuestionComponent} from './components/new-question/new-question.component';

const routes: Routes = [
  {
    path: 'home',
    component: QuestionComponent
  },
  {
    path: 'questions/:id',
    component: QuestionComponent
  },
  {
    path: 'newQuestion',
    component: NewQuestionComponent
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
export class AppRoutingModule {
}
