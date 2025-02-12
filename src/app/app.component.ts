import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule, AvatarModule],
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
}
