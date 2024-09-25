// import original module declarations
import "styled-components";
import type { Colors } from "./colors";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors;
  }
}
