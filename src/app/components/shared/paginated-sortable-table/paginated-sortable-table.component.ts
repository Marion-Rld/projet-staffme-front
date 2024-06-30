import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Team } from './../../../models/team.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginated-sortable-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './paginated-sortable-table.component.html',
  styleUrl: './paginated-sortable-table.component.scss',
})
export class PaginatedSortableTableComponent implements OnInit, AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource = new MatTableDataSource<any>();
  @Input() columnLabels: { [key: string]: string } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router
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

  getTeamNames(teams: Team[]): string {
    return teams.map(team => team.name).join(', ');
  }

  navigateToProject(projectId: string): void {
    this.router.navigate(['/project', projectId]);
  }
}
