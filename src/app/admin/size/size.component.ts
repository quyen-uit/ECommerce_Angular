import { Component, ViewChild } from '@angular/core';
import { DynamicColumn } from 'src/app/shared/models/common/dynamicColumn';
import { Pagination } from 'src/app/shared/models/common/pagination';
import { Size } from 'src/app/shared/models/sizes/size';
import { SizePaginationParams } from 'src/app/shared/params/sizePaginationParams';
import { SizeService } from 'src/app/shared/services/size-service';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
})
export class SizeComponent {
  paginationData?: Pagination<Size>;
  columns: DynamicColumn[] = [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      visible: true,
      sortable: true,
      filterable: true,
    },
    {
      key: 'sizeType',
      label: 'Type',
      type: 'options',
      visible: true,
      sortable: true,
      filterable: true,
      options: [{ viewValue: 'Character', value: 'Character' }, { viewValue: 'Number', value: 'Number' }]
    },
    {
      key: 'sortOrder',
      label: 'Order',
      type: 'number',
      visible: true,
      sortable: true,
      filterable: true,
    },
  ];

  constructor(private sizeService: SizeService) { }

  ngOnInit() {
  }

  getAll(params: SizePaginationParams) {
    this.sizeService.getAll(params).subscribe((data) => {
      this.paginationData = data;
    });
  }
}