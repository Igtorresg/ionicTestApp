import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-instructivo2',
  templateUrl: './instructivo2.page.html',
  styleUrls: ['./instructivo2.page.scss'],
})
export class Instructivo2Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  next2(){
    this.router.navigate(['/instructivo3']);
  }
  Prev1(){
    this.router.navigate(['/instructivo1']);
  }
  skip(){
    this.router.navigate(['/register']);
  }
}
