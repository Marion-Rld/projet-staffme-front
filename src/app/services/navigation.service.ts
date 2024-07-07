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
      default:
        console.error('Unknown item type', itemType);
    }
  }
}
