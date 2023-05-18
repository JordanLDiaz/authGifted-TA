import { AboutController } from "./controllers/AboutController.js";
import { GiftsController } from "./controllers/GiftsController.js";
import { HomeController } from "./controllers/HomeController.js";

export const router = [
  {
    path: '',
    controller: [HomeController, GiftsController]
  },
  {
    path: '#/about',
    controller: AboutController
  }
]