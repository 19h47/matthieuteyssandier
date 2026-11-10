import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

/** Same curves as the `--ease-*` tokens in `stylesheets/theme.css`. */
export const EASE_OUT = CustomEase.create("ease-out", "0.23, 1, 0.32, 1");
export const EASE_IN_OUT = CustomEase.create("ease-in-out", "0.77, 0, 0.175, 1");
