import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IndexPageComponent } from './index-page/index-page.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { GgEasyDirective } from './directives/gg-easy.directive';
import { TheresTimeDirective } from './directives/theres-time.directive';
import { DangerDirective } from './directives/danger.directive';
import { FuckedDirective } from './directives/fucked.directive';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from './directives/modal-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    NewTaskComponent,
    GgEasyDirective,
    TheresTimeDirective,
    DangerDirective,
    FuckedDirective,
    ModalFormComponent,
    ModalDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [NewTaskComponent, ModalFormComponent]
})
export class AppModule { }
