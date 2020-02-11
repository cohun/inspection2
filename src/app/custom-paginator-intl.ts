import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from "@angular/core";

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl{
    itemsPerPageLabel = 'oldalankénti sorok száma';
    nextPageLabel = 'következő oldal';
    previousPageLabel = 'előző oldal';
    firstPageLabel = 'első oldal';
    lastPageLabel = 'utolsó oldal';
}
