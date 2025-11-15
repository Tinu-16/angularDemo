import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { Login } from './auth/login/login';
import { SearchResult } from './feature/search-result/search-result';
import { Dashboard } from './feature/admin/dashboard/dashboard';
import { HotelList } from './feature/admin/dashboard/hotel-list/hotel-list';
import { HotelDetails } from './feature/admin/hotel-details/hotel-details';
import { AddHotel } from './feature/admin/dashboard/add-hotel/add-hotel';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home',component: Home},
    { path: 'login',component: Login},
    { path: 'search-results',component: SearchResult},
    { path: 'hotel/:id', component: HotelDetails },
    { 
        path: 'dashboard', component: Dashboard , children:[
            {path: 'hotel-list', component:HotelList},
            {path: 'hotel/hotelid', component:HotelList},
            {path: 'hotel-details/:id', component: HotelDetails},
            {path: 'add-hotel', component: AddHotel},
            {path: 'add-hotel', component: AddHotel},
        ]
    },
    
    
];
