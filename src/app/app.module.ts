import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Aggiungi questo import
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { SearchHistoryComponent } from './search-history/search-history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    SearchHistoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule // Aggiungi HttpClientModule agli imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
