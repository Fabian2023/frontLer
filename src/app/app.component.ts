import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule],
})
export class AppComponent implements OnInit {
  users: Array<{ nombre: string; correo: string; edad: number }> = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    const apiUrl = 'http://localhost:3000/api/data';

    this.http
      .get<{
        message: string;
        usuarios: Array<{ nombre: string; correo: string; edad: number }>;
      }>(apiUrl)
      .subscribe({
        next: (response) => {
          this.users = response.usuarios;
        },
        error: (err) => {
          console.error('Error al realizar la petición:', err);
        },
      });
  }
}
