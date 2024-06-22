import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedSortableTableComponent } from './paginated-sortable-table.component';

describe('PaginatedSortableTableComponent', () => {
  let component: PaginatedSortableTableComponent;
  let fixture: ComponentFixture<PaginatedSortableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatedSortableTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginatedSortableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
