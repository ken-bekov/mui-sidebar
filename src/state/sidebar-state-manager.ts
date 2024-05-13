import { ReactNode } from 'react';
import {
    CloseSidebarOptions, ShowSidebarOptions, SidebarEventListener, SidebarSlot,
    SidebarState
} from './types';

export class SidebarStateManager {

    id: string = '';

    state: SidebarState = {
        slots: [],
    };

    private eventListeners = new Set<SidebarEventListener>();

    private notifyStateChanged() {
        this.eventListeners.forEach(listener => listener({state: this.state}));
    }

    private findOrCreateSlot(index: number) {
        const slot = this.state.slots.find(slot => slot.index === index);
        if (slot) {
            return slot;
        }

        const newSlot: SidebarSlot = {
            index,
            layouts: [],
        }

        this.state.slots.push(newSlot);
        return newSlot;
    }

    private replaceAllSlots(content: ReactNode, slotIndex: number) {
        this.state.slots = [
            {
                index: slotIndex,
                layouts: [{content}]
            }
        ]
    }

    constructor(id: string = 'default') {
        this.id = id;
    }

    addListener(listener: SidebarEventListener) {
        this.eventListeners.add(listener);
    }

    removeListener(listener: SidebarEventListener) {
        this.eventListeners.delete(listener);
    }

    showSidebar(content: ReactNode, options?: ShowSidebarOptions) {
        this.state = {...this.state};

        if (!options?.slotIndex) {
            this.replaceAllSlots(content, 0);
            this.notifyStateChanged();
            return;
        }

        const slot = this.findOrCreateSlot(options.slotIndex);

        if (!options.onTopOfLayers) {
            slot.layouts = [{content}];
            this.notifyStateChanged();
            return;
        }

        slot.layouts.push({content});
        this.notifyStateChanged();
    }

    closeSidebar(options?: CloseSidebarOptions) {

        if (!options?.slotIndex) {
            this.state = {slots: []};
            this.notifyStateChanged();
            return;
        }

        const slotIndexInArray = this.state.slots.findIndex(slot => slot.index === options.slotIndex);

        if (slotIndexInArray === -1) {
            return;
        }

        this.state = {...this.state};
        const slot = this.state.slots[slotIndexInArray];

        if (options.onlyTopmostLayout && slot.layouts.length > 1) {
            slot.layouts = slot.layouts.slice(0, -1);
            this.notifyStateChanged();
            return;
        }

        this.state.slots.splice(slotIndexInArray, 1);
        this.notifyStateChanged();
    }
}
