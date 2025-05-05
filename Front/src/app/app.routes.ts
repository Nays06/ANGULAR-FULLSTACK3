import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { BasketComponent } from "./basket/basket.component";
import { RegistrationComponent } from "./registration/registration.component";
import { ProductPageComponent } from "./product-page/product-page.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { ProfileComponent } from "./profile/profile.component";
import { EditProductComponent } from "./edit-product/edit-product.component";


export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "basket", component: BasketComponent },
  { path: "regist", component: RegistrationComponent },
  { path: "login", component: AuthorizationComponent },
  { path: "profile", component: ProfileComponent },
  { path: "product/:id", component: ProductPageComponent },
  { path: "edit/:id", component: EditProductComponent }
];
