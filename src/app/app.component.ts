import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(private http:HttpClient){

  }

  ngAfterViewInit(): void {
    this.http.get('http://192.168.1.69/calcular/9').subscribe({
      next:(response:any)=>
    {
   console.log(response)
    }
  })   
  }
  title = 'ANG-3d';


 
  }
