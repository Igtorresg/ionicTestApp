import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-instructivo3',
  templateUrl: './instructivo3.page.html',
  styleUrls: ['./instructivo3.page.scss'],
})
export class Instructivo3Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  irahora(){
    this.router.navigate(['/register']);
  }
  prev2(){
    this.router.navigate(['/instructivo2']);
  }
  
}
