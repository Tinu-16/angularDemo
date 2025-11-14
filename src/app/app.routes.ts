import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { Login } from './auth/login/login';
import { SearchResult } from './feature/search-result/search-result';
import { HotelDetails } from './feature/hotel-details/hotel-details';
import { Dashboard } from './feature/admin/dashboard/dashboard';
import { HotelList } from './feature/admin/dashboard/hotel-list/hotel-list';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'search-results',
        component: SearchResult
    },
    { 
        path: 'hotel/:id', component: HotelDetails 
    },
    { 
        path: 'dashboard', component: Dashboard 
    },
    { 
        path: 'dashboard/hotel-list', component:HotelList
    }
    
];
