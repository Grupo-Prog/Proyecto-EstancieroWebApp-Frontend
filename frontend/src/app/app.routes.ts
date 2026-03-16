import { Routes } from '@angular/router';
import { Start } from './pages/start/start';
import { Login } from './pages/login/login';
import { CreateUser } from './pages/create-user/create-user';
import { UpdateUser } from './pages/update-user/update-user';
import { Menu } from './pages/menu/menu';
import { Configuration } from './pages/configuration/configuration';
import { Load } from './pages/load/load';
import { Lobby } from './pages/lobby/lobby';
import { Board } from './pages/board/board';
import { TestPage } from './pages/test/test-page/test-page';

export const routes: Routes = [
  { path: '', component: Start },
  { path: 'login', component: Login },
  { path: 'create-user', component: CreateUser },
  { path: 'update-user', component: UpdateUser },
  { path: 'menu', component: Menu },
  { path: 'configuration', component: Configuration },
  { path: 'load', component: Load },
  { path: 'lobby', component: Lobby },
  { path: 'board', component: Board },
  { path: 'test', component: TestPage },
];
