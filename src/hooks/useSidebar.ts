import { getSidebarStateManager } from '../SidebarContext/SidebarContext';
import { ReactNode } from 'react';
import { CloseSidebarOptions, ShowSidebarOptions } from '../state/types';

export const useSidebar = (sidebarId: string = 'default') => {
    const stateManager = getSidebarStateManager(sidebarId);

    return {
        showSidebar: (content: ReactNode, options?: ShowSidebarOptions) => stateManager.showSidebar(content, options),
        closeSidebar: (options?: CloseSidebarOptions) => stateManager.closeSidebar(options),
    }
}
