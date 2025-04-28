import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { BasketComponent } from "./basket/basket.component";
import { RegistrationComponent } from "./registration/registration.component";
import { ProductPageComponent } from "./product-page/product-page.component";


export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "basket", component: BasketComponent },
  { path: "regist", component: RegistrationComponent },
  { path: "product/:id", component: ProductPageComponent }
];
