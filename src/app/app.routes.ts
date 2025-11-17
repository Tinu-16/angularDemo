import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { Login } from './auth/login/login';
import { SearchResult } from './feature/search-result/search-result';
import { Dashboard } from './feature/admin/dashboard/dashboard';
import { HotelList } from './feature/admin/dashboard/hotel-list/hotel-list';
import { HotelDetails } from './feature/admin/hotel-details/hotel-details';
import { AddHotel } from './feature/admin/dashboard/add-hotel/add-hotel';
import { RoomForm } from './feature/admin/dashboard/room-form/room-form';
import { EmployeeList } from './feature/admin/dashboard/employee-list/employee-list';
import { EmployeeForm } from './feature/admin/dashboard/employee-form/employee-form';
import { RoomTypeList } from './feature/admin/dashboard/room-type-list/room-type-list';
import { RoomTypeForm } from './feature/admin/dashboard/room-type-form/room-type-form';

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
            { path: 'edit-hotel/:id', component: AddHotel },
            { path: 'hotel-details/:hotelId/add-room', component: RoomForm },
            { path: 'edit-room/:hotelId/:roomId', component: RoomForm },
            { path: 'employee-list', component: EmployeeList },
            { path: 'add-employee', component: EmployeeForm },
            { path: 'edit-employee/:id', component: EmployeeForm },
            { path: 'room-type', component: RoomTypeList },
            { path: 'add-roomType', component: RoomTypeForm },
            { path: 'edit-roomType/:id', component: RoomTypeForm }
        ]
    },
    
    
];
