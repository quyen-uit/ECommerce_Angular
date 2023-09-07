import { Component } from '@angular/core';
import { BasketService } from '../basket.service';
import { faMinusCircle, faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;
  faTimes = faTimes;
  constructor(public basketService: BasketService) { }
}
