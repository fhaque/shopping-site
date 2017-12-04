import { Routes } from '@angular/router';

import { WelcomeInfoComponent } from './components/welcome-info/welcome-info.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchHistoryComponent } from './components/search-history/search-history.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { DealsPageComponent } from './components/deals-page/deals-page.component';
import { LoginRouteGuard } from './services/login-route.guard';

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
    },
    {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
    },
    {
        path: 'deals',
        component: DealsPageComponent,
        canActivate: [ LoginRouteGuard ],
    }
];