import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeScreenComponent } from '../home-screen/home-screen.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
