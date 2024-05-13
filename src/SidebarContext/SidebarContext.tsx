import React, { useEffect, useState } from 'react';
import { SidebarStateManager } from '../state/sidebar-state-manager';
import { Sidebar } from '../Sidebar/Sidebar';
import { SidebarContextState, SidebarState, SidebarStateEvent } from '../state/types';

const sidebarContextSymbol = Symbol('__sidebar-context-state');

interface SidebarContextProps {
    id: string;
}

export const SidebarContext: React.FC<SidebarContextProps> = (props) => {
    const {id = 'default'} = props;
    const [state, setState] = useState<SidebarState | null>(null);
    const [isOpen, setOpen] = useState(false);

    const sidebarStateManager = getSidebarStateManager(id);

    const onSidebarStateChange = (event: SidebarStateEvent) => {
        const isSidebarVisible = event.state.slots.length > 0;
        if (isSidebarVisible) {
            setState(event.state);
            setOpen(true);
        } else {
            setOpen(false);
        }
    }

    useEffect(() => {
        if (sidebarStateManager) {
            sidebarStateManager.addListener(onSidebarStateChange);

            return () => {
                sidebarStateManager.removeListener(onSidebarStateChange);
            }
        }
    }, []);

    return (
        <>
            {state && (
                <Sidebar
                    open={isOpen}
                    state={state}
                    onBackdropClick={() => sidebarStateManager.closeSidebar()}
                />
            )}
        </>
    )
}

export const getSidebarStateManager = (id: string = 'default') => {
    const global: {[sidebarContextSymbol]: SidebarContextState} = window as any;

    if(!global[sidebarContextSymbol]) {
        global[sidebarContextSymbol] = {
            sidebarStates: {},
        } as SidebarContextState;
    }

    const sidebarContextState = global[sidebarContextSymbol];

    if(!sidebarContextState.sidebarStates[id]) {
        sidebarContextState.sidebarStates[id] = new SidebarStateManager(id);
    }

    return sidebarContextState.sidebarStates[id];
}
