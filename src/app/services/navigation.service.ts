import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateTo(item: any, itemType: string): void {
    const id = item._id;
    if (!id) {
      console.error('Item ID is undefined', item);
      return;
    }

    switch (itemType) {
      case 'project':
        this.router.navigate(['/projects', id]);
        break;
      case 'team':
        this.router.navigate(['/teams', id]);
        break;
      case 'user':
        this.router.navigate(['/users', id]);
        break;
      default:
        console.error('Unknown item type', itemType);
    }
  }
}
