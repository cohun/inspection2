import { Component, OnInit, Input } from '@angular/core';
import { Productgysz } from 'src/app/_interface/product-gysz';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Sit } from 'src/app/_interface/chosenSit';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent implements OnInit {
  @Input() user: string;
  @Input() group: string;
  @Input() descreption: string;
  @Input() products: Productgysz[];
  @Input() chosenSite: Sit
  prod: Productgysz[];
  product: Productgysz[];


  constructor() { }

  ngOnInit() {
    this.prod = [
      {
        gysz: '1531',
        fid: '',
        group: 'körkötelek',
        type: 'irs 10',
        length: '1/2 m',
        descreption: 'körkötél',
        capacity: '1000 kg',
        manufacturer: 'Gutman'
      },
      {
        gysz: '1550',
        fid: '',
        group: 'körkötelek',
        type: 'irs 20',
        length: '1/2 m',
        descreption: 'körkötél',
        capacity: '2000 kg',
        manufacturer: 'Gutman'
      },
      {
        gysz: '1585',
        fid: '',
        group: 'körkötelek',
        type: 'irs 30',
        length: '1/2 m',
        descreption: 'körkötél',
        capacity: '3000 kg',
        manufacturer: 'Gutman'
      },
      {
        gysz: '1590',
        fid: '',
        group: 'körkötelek',
        type: 'irs 40',
        length: '1/2 m',
        descreption: 'körkötél',
        capacity: '4000 kg',
        manufacturer: 'Gutman'
      }
    ];
    this.product = [
      {
        gysz: 'BA 25300',
        fid: '',
        group: 'körkötelek',
        type: 'irs 10',
        length: '1/2 m',
        descreption: 'körkötél',
        capacity: '1000 kg',
        manufacturer: 'Gutman'
  }
]
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

}
