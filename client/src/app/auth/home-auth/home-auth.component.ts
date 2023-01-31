import { Component } from '@angular/core';
import { UtilityService } from 'src/app/main/utility.service';

@Component({
  selector: 'app-home-auth',
  templateUrl: './home-auth.component.html',
  styleUrls: ['./home-auth.component.scss']
})
export class HomeAuthComponent {
  constructor(public utility: UtilityService) {

  }
}
