import { Component, Input } from '@angular/core';
import { IItem } from '../../models/items.model';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item: IItem;
}
