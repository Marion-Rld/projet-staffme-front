import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-paginated-sortable-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
  ],
  templateUrl: './paginated-sortable-table.component.html',
  styleUrls: ['./paginated-sortable-table.component.scss'],
})
export class PaginatedSortableTableComponent implements OnInit, AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource = new MatTableDataSource<any>();
  @Input() columnLabels: { [key: string]: string } = {};
  @Input() itemType: string = '';
  @Output() rowAction = new EventEmitter<{ type: string; element: any }>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isDateColumn(column: string): boolean {
    return column.includes('Date');
  }

  getColumnLabel(column: string): string {
    return this.columnLabels[column] || column;
  }

  getTeamNames(teams: any[]): string {
    return teams.map((team) => team.name).join(', ');
  }

  handleEdit(element: any): void {
    this.rowAction.emit({ type: 'edit', element });
  }

  handleDelete(element: any): void {
    this.rowAction.emit({ type: 'delete', element });
  }

  onRowClick(element: any): void {
    console.log(this.itemType);
    this.navigationService.navigateTo(element, this.itemType);
  }
}
