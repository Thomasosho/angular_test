import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { BidListComponent } from './components/bid-list/bid-list.component';
import { CreateBidComponent } from './components/create-bid/create-bid.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'projects', component: ProjectListComponent, canActivate: [authGuard] },
  { path: 'projects/:id', component: ProjectDetailsComponent, canActivate: [authGuard] },
  { path: 'bids', component: BidListComponent, canActivate: [authGuard] },
  { path: 'create-bid', component: CreateBidComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: '**', redirectTo: '/projects' }
];