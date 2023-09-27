import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  @Input() pageSize?: number;
  @Input() pageCount?: number;
  @Input() pageNumber?: number;
  @Output() pagerChanged = new EventEmitter<number>();

  onPagerChanged(event: any) {
    this.pagerChanged.emit(event.page);
  }
}