import { Component, OnInit, Input } from '@angular/core';
import { Productgysz } from 'src/app/_interface/product-gysz';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { UserSite } from 'src/app/_interface/user-site';
import { Observable } from 'rxjs';

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
  public site$: Observable<UserSite[]>;
  chosenSite = {name: 'Célállomás'};

  prod: Productgysz[];
  product: Productgysz[];
  
  

  constructor(private userService: UserService,
              private router: Router,) { }

  ngOnInit() {
    this.userService.getSites(this.user);
    this.site$ = this.userService.sites$;

    // specProduct where site === 'Kiadásra váró'
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
    // specProduct where site === 'Célállomás'
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
  delOperantee(gysz, i) {
    if (confirm('A kiválasztott termék leselejtezésre kerül!')) {
      this.userService.delOperantee(gysz, this.user);
      this.products = this.products.splice(i, 1);
    }
        
  }
  onOpStart(item) {
    this.router.navigate(['/user/print'],
        {queryParams: {type: item.type, length: item.length, descreption: item.descreption,
        capacity: item.capacity, manufacturer: item.manufacturer, gysz: item.gysz, fid: item.fid , user: this.user}});
  }

  onSite(site) {
    console.log(site);
    this.chosenSite = site;
  }

}
