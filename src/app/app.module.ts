import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AvatarModule } from "primeng/avatar";
import { ButtonModule } from "primeng/button";
import { InputTextareaModule } from "primeng/inputtextarea";
import { AppComponent } from "./app.component";
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { RouterOutlet } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        AppComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterOutlet,
        AvatarModule,
        ButtonModule,
        InputTextareaModule,
        FileUploadModule,
        DropdownModule,
        HttpClientModule
    ],
    exports: [
        AppComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterOutlet,
        AvatarModule,
        ButtonModule,
        InputTextareaModule,
        FileUploadModule,
        DropdownModule,
        HttpClientModule
    ],
    bootstrap: [
        AppComponent
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        // Add any services here if needed
    ]
})
export class AppModule { }