// import original module declarations
import 'styled-components'
import type { Colors } from './colors'
import { Breakpoints } from './breakpoints'

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        colors: Colors
        breakpoints: Breakpoints
    }
}
