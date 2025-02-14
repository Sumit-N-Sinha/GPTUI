import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { AvatarModule } from "primeng/avatar";
import { ButtonModule } from "primeng/button";
import { InputTextareaModule } from "primeng/inputtextarea";
import { AppComponent } from "./app.component";
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterOutlet,
        AvatarModule,
        ButtonModule,
        InputTextareaModule,
        FileUploadModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterOutlet,
        AvatarModule,
        ButtonModule,
        InputTextareaModule,
        FileUploadModule
    ],
    bootstrap: [
        
    ]
})
export class AppModule { }