import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/Auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  recordarme = false;
  usuario: UsuarioModel = new UsuarioModel();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
    this.usuario.email = 'brayan.salazar25@gmail.com';
    this.usuario.password = '123456';
  }

  onLogin(form: NgForm) {

    if (form.invalid) {
      return;
    }
    console.log(this.usuario);
    console.log('imprimir si el formulario es valido');

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(resp => {
      console.log(resp);
      Swal.close();
      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        title: 'Error al autenticar',
        type: 'error',
        text: err.error.error.message
      });
    });

  }

}
