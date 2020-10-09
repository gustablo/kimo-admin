import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  opened = true;

  options: FormGroup;

  constructor(fb: FormBuilder, private router: Router) {
    this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 0
    });
  }

  ngOnInit(): void {
  }

  navigateTo(path) {
    this.router.navigate([`dashboard/${path}`])
  }

}
