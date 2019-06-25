import { MatPaginatorIntl } from '@angular/material';

export class CustomPaginatorIntl extends MatPaginatorIntl{
    itemsPerPageLabel = 'oldalankénti sorok száma';
    nextPageLabel = 'következő oldal';
    previousPageLabel = 'előző oldal';
    firstPageLabel = 'első oldal';
    lastPageLabel = 'utolsó oldal';
}
