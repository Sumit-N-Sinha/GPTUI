import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AppModule } from './app.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'local-gpt-ui';
  messages: { sender: string, text: string, time: Date }[] = [
    { sender: 'bot', text: 'Hello! How can I assist you today?', time: new Date() },
  ];
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({
        sender: 'user',
        text: this.newMessage,
        time: new Date()
      });

      // Capture the message to be sent to the backend
      const messageToSend = this.newMessage;

      // Clear the input field
      this.newMessage = '';

      // Send the user's message to the backend
      fetch('https://gpt-production-da78.up.railway.app/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: messageToSend })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Add the bot's response to the chat
          this.messages.push({
            sender: 'bot',
            text: data,
            time: new Date()
          });
        })


      this.newMessage = '';
    }
  }

  uploadedFile: any;
  uploadedImage: any;

  onUploadd(event: any) {
    this.uploadedFile = event.files[0];
    console.log('File uploaded:', this.uploadedFile);
  }

  myUploader(event: any) {
    this.uploadedFile = event.files[0];
    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes
    const uploadedFile = event.files[0];

    if (uploadedFile.size > maxFileSize) {
      this.messages.push({
        sender: 'bot',
        text: 'File size should be less than 20MB',
        time:new Date() 
      });
      this.removeFile();
    }else{
    const formData = new FormData();
    formData.append('file', this.uploadedFile, this.uploadedFile.name);
    console.log('Custom upload handler:', this.uploadedFile);
    // this.isDisabled = true;
    this.convertToBase64(this.uploadedFile).then((base64Image: string) => {
      this.uploadedImage = base64Image;
    });
  }
  }
  convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
        const errorMessage = `Failed to read file: ${error instanceof Error ? error : 'Unknown error'}`;
        return Promise.reject(new Error(errorMessage));
      };
    });
  }

  removeFile() {
    this.uploadedFile = null;
    this.uploadedImage=null;
  }

  onRemove(event: any) {
    // Optional: Handle file removal from UI
    this.uploadedFile = null;
  }
}
