import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-irs',
  templateUrl: './irs.component.html',
  styleUrls: ['./irs.component.css']
})
export class IrsComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  new = [
    {
      type: 'irs 10',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '1000 kg',
      manufacturer: 'Gutman',
      gysz: '1531'
    },
    {
      type: 'irs 20',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '2000 kg',
      manufacturer: 'Gutman',
      gysz: '1550'
    },
    {
      type: 'irs 30',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '3000 kg',
      manufacturer: 'Gutman',
      gysz: '1585'
    },
    {
      type: 'irs 40',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '4000 kg',
      manufacturer: 'Gutman',
      gysz: '1590'
    },
  ]

  moved = [
    {
        type: 'irs 100',
        length: '1/2 m',
        descreption: 'körkötél',
        capacity: '10000 kg',
        manufacturer: 'Gutman',
        gysz: '1990'
    }
  ];

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

  onCancel() {
    this.location.back();
  }

}
