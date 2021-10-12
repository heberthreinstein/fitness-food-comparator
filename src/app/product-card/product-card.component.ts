import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product: any | undefined;

}
