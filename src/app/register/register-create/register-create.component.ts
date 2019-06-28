import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-register-create',
  templateUrl: './register-create.component.html',
  styleUrls: ['./register-create.component.css']
})
export class RegisterCreateComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['Vizsgálat', 'Karbantartás', 'Javítás', 'Üzembehelyezés'];
}
