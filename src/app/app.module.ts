import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Aggiungi questo import
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './auth.service';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    SearchHistoryComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  exports: [FooterComponent]
})

export class AppModule { }

export class FooterModule { }
