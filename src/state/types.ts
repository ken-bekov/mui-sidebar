import { ReactNode } from 'react';
import { SidebarStateManager } from './sidebar-state-manager';

export interface SidebarSlotLayout {
    content: ReactNode;
}

export interface SidebarSlot {
    index: number;
    layouts: SidebarSlotLayout[];
}

export interface SidebarState {
    slots: SidebarSlot[];
}

export interface SidebarStateEvent {
    state: SidebarState;
}

export interface SidebarEventListener {
    (event: SidebarStateEvent): void;
}

export interface SidebarContextState {
    sidebarStates: Record<string, SidebarStateManager>;
}

export interface ShowSidebarOptions {
    slotIndex: number;
    onTopOfLayers?: boolean;
}

export interface CloseSidebarOptions {
    slotIndex: number;
    onlyTopmostLayout?: boolean;
}
