import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
  // Ruta para la página de administración
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AdminGuard]
  },

  
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: '',
    redirectTo: 'comienzo',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'comienzo',
    loadChildren: () => import('./comienzo/comienzo.module').then(m => m.ComienzoPageModule)
  },
  {
    path: 'instructivo1',
    loadChildren: () => import('./instructivo1/instructivo1.module').then(m => m.Instructivo1PageModule)
  },
  {
    path: 'instructivo2',
    loadChildren: () => import('./instructivo2/instructivo2.module').then(m => m.Instructivo2PageModule)
  },
  {
    path: 'instructivo3',
    loadChildren: () => import('./instructivo3/instructivo3.module').then(m => m.Instructivo3PageModule)
  },
  {
    path: 'categoriacerveza',
    loadChildren: () => import('./categoriacerveza/categoriacerveza.module').then(m => m.CategoriacervezaPageModule)
  },
  {
    path: 'cerveza',
    loadChildren: () => import('./cerveza/cerveza.module').then(m => m.CervezaPageModule)
  },
  {
    path: 'sucursales',
    loadChildren: () => import('./sucursales/sucursales.module').then(m => m.SucursalesPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then(m => m.CarritoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'categoriavino',
    loadChildren: () => import('./categoriavino/categoriavino.module').then(m => m.CategoriavinoPageModule)
  },
  {
    path: 'vino',
    loadChildren: () => import('./vino/vino.module').then(m => m.VinoPageModule)
  },
  {
    path: 'ron',
    loadChildren: () => import('./ron/ron.module').then(m => m.RonPageModule)
  },
  {
    path: 'categoriaron',
    loadChildren: () => import('./categoriaron/categoriaron.module').then(m => m.CategoriaronPageModule)
  },
  {
    path: 'whisky',
    loadChildren: () => import('./whisky/whisky.module').then(m => m.WhiskyPageModule)
  },
  {
    path: 'categoriawhisky',
    loadChildren: () => import('./categoriawhisky/categoriawhisky.module').then(m => m.CategoriawhiskyPageModule)
  },

  // Ruta para páginas no encontradas (Error 404)
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
