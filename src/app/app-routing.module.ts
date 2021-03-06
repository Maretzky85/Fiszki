import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuestionComponent} from './components/questions/question.component';
import {NewQuestionComponent} from './components/new-question/new-question.component';
import {AdminComponent} from './components/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'known',
    component: QuestionComponent,
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
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
