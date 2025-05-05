
import { HttpClient } from '@angular/common/http';
import { Component, model, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

interface Model {
  name: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})

export class HomeComponent implements OnInit {
  title = 'local-gpt-ui';
  message: string = '';
  uploadedFile: any;
  uploadedImage: any;
  conversationId = '1234567890';
  previousMessage = '';
  selectedModel: Model = { name: 'gpt-4o', description: 'GPT-4o' };
  messages: { sender: string, text: any, model: Model, files: any, time: Date }[] = [
    { sender: 'bot', text: 'Hello! How can I assist you today?', model: this.selectedModel, files: null, time: new Date() },
  ];
  newMessage: string = '';
  models: Model[] | undefined;
  base64: string | undefined;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.models = [
      { name: 'gpt-4o', description: 'azure' },
      { name: 'gpt-4.1', description: 'openai' },
      { name: 'claude', description: 'amazon' }
    ];
  }

  // sendMessage() {
  // if (this.newMessage.trim() !== '') {
  //   this.messages.push({
  //     sender: 'user',
  //     text: this.newMessage,
  //     files: this.uploadedFile,
  //     time: new Date()
  //   });

  //     // Capture the message to be sent to the backend
  //     const messageToSend = this.newMessage;

  //     // Clear the input field
  //     this.newMessage = '';

  //     // Send the user's message to the backend
  //     // fetch('https://gpt-production-da78.up.railway.app/gpt', {
  //     fetch('http://localhost:5000/gpt/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ message: messageToSend })
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data);
  //         // Add the bot's response to the chat
  //         this.messages.push({
  //           sender: 'bot',
  //           text: data,
  //           files: null,
  //           time: new Date()
  //         });
  //       })


  //     this.newMessage = '';
  //   }
  // }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.messages.push({
        sender: 'user',
        text: this.newMessage,
        model: this.selectedModel,
        files: this.uploadedFile,
        time: new Date()
      });
    }
    const formData = new FormData();
    formData.append('model', this.selectedModel.description);
    formData.append('file', this.uploadedFile);
    formData.append('message', this.newMessage);
    const requestBody = {
      message: this.newMessage,
      model: this.selectedModel.description,
      files: this.uploadedFile,
      // context: {
      //   conversationId: this.conversationId,
      //   previousMessage: this.previousMessage
      // }
    };
    console.log(requestBody);
    this.http.post('http://localhost:5000/gpt', formData)
      .subscribe(response => {
        console.log(response);
        this.previousMessage = this.message; // update previous message
        this.message = ''; // clear input field
        this.newMessage = '';
        this.messages.push({
          sender: 'bot',
          text: response,
          model: this.selectedModel,
          files: null,
          time: new Date()
        });
        this.removeFile(); // clear uploaded file after sending
        this.onRemove({}); // clear uploaded file after sending
      });
  }

  onUploadd(event: any) {
    this.uploadedFile = event.files[0];
    console.log('File uploaded:', this.uploadedFile);
  }

  myUploader(event: any) {
    console.log('File upload event:', event);
    this.uploadedFile = event.files[0];
    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes
    const uploadedFile = event.files[0];
    // this.convertToBase64(uploadedFile).then(base64 => {
    //   this.uploadedFile = base64;
    // });

    if (uploadedFile.size > maxFileSize) {
      this.messages.push({
        sender: 'bot',
        text: 'File size should be less than 20MB',
        model: this.selectedModel,
        files: null,
        time: new Date()
      });
      this.removeFile();
    } else {
      const formData = new FormData();
      formData.append('file', this.uploadedFile, this.uploadedFile.name);
      console.log('Custom upload handler:', this.uploadedFile);
      // this.convertToBase64(this.uploadedFile).then((base64Image: string) => {
      //   this.uploadedImage = base64Image;
      // });
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
    this.uploadedImage = null;
  }

  onRemove(event: any) {
    this.uploadedFile = null;
  }
}
