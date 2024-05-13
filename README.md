# MUI Sidebar

Lightweight Sidebar for React MUI Applications.

## Installation

```
npm i @kenbekov/mui-sidebar
```
It's supposed that your project already has installed React MUI as dependency. Current version of Sidebar is for React MUI 4.0.

## Usage

Declare `<SidbarContext/>` in the root of your Application:

```tsx
import { ThemeProvider } from '@material-ui/styles';
import { SidebarContext } from '@kentbekov/mui-sidebar'

const App = () => {
    
    ...
    
    return (
        <ThemeProvider theme={theme}>
            <SidbarContext id='default'/>
            ...     
        </ThemeProvider>
    )
}
```

After that you can use the Sidebar in components. A simple use case may look like:

```tsx
import { useSidebar } from '@kentbekov/mui-sidebar'

export const Component = () => {
    
    const {showSidebar, closeSidebar} = useSidebar();
    
    const content = (
        <>
            <div>
                /* ...Sidebar Content... */
            </div>
            <Button onClick={() => closeSidebar()}>
                Close Sidebar
            </Button>
        </>
    );
    
    return (
        <div>
            <Button onClick={() => showSidebar(content)}>
                Show Sidebar
            </Button>
        </div>    
    )
}
```
## Documentation

More detailed documentation is here: https://kenbekov.dev/
