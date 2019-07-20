import { Injectable } from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SwipeService {

  private swipeCoords?: [number, number];
  private swipeTime?: number;
  private DURATION = 1000;
  private MIN_LENGTH = 30;

  constructor(private dataService: DataService) { }

  swipe(e: TouchEvent, when: string): void {
    const coords: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoords = coords;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coords[0] - this.swipeCoords[0], coords[1] - this.swipeCoords[1]];
      const duration = time - this.swipeTime;

      if (duration < this.DURATION
        && Math.abs(direction[0]) > this.MIN_LENGTH
        && this.checkHorizontal(direction)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        if (swipe === 'next') {
          this.dataService.next();
        }
        if (swipe === 'previous') {
          // this.dataService.prev();
        }
      }
    }
  }

  private checkHorizontal(direction: number[]): boolean {
    return Math.abs(direction[0]) > Math.abs(direction[1] * 3);
  }
}
