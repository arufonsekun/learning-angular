import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IndexPageComponent } from './index-page/index-page.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { GgEasyDirective } from './gg-easy.directive';

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    NewTaskComponent,
    GgEasyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewTaskComponent]
})
export class AppModule { }
