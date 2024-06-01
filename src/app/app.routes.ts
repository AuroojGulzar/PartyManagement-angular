import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PartyListComponent } from './components/party-list/party-list.component';


export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:"full"},
    {path:'login',component:LoginComponent},
    {path:"party",component:PartyListComponent}
];
