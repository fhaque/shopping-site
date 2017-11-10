import { Routes } from '@angular/router';

import { WelcomeInfoComponent } from './components/welcome-info/welcome-info.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchHistoryComponent } from './components/search-history/search-history.component';

export const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: WelcomeInfoComponent,
    },
    {
        path: 'search',
        component: SearchResultsComponent,
    },
    {
        path: 'search-history',
        component: SearchHistoryComponent,
    }
];