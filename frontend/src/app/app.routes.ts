import { Routes } from "@angular/router";
import { Login } from "./login/login";
import { Register } from "./register/register";
import { Home } from "./home/home";
import { ForgotPage } from "./forgot-page/forgot-page";
import { ResetPage } from "./reset-page/reset-page";
import { Dashboard } from "./admin/dashboard/dashboard";
import { ManageContact } from "./admin/manage-contact/manage-contact";
import { ContactList } from "./admin/contact-list/contact-list";
import { Pnf } from "./pnf/pnf";
import { Sidebar } from "./admin/sidebar/sidebar";
import { AuthGuard } from "./guards/auth-guard";

export const routes: Routes = [

  { path: "", redirectTo: "login", pathMatch: "full" },

  { path: "login", component: Login },
  { path: "register", component: Register },

  { path: "home", component: Home, canActivate: [AuthGuard] },

  { path: 'forgot-password', component: ForgotPage },
  { path: 'reset-password/:token', component: ResetPage },

  // ========================================  ADMIN  =========================================
  {
    path: "admin",
    component: Sidebar,
    canActivate: [AuthGuard], 
    children: [
      { path: "dashboard", component: Dashboard },
      { path: "manage-contact", component: ManageContact },
      { path: "contact-list", component: ContactList },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },

  { path: "**", component: Pnf }

];