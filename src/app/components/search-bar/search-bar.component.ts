import { Component }  from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {
  debounceTime, distinctUntilChanged
}                     from 'rxjs/operators';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  readonly searchTerm$: Subject<string>;
  searchTermForSubmit:  string;


  constructor() { 
    this.searchTerm$ = new Subject<string>();
    this.searchTerm$.pipe(debounceTime(300), distinctUntilChanged());
  }

  handleKeyUp(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }

  handleSubmit(searchTerm: string) {
    console.log('from submit', searchTerm);
  }
}
