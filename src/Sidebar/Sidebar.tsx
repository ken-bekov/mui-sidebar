import React, { CSSProperties, useEffect, useRef } from 'react';
import { Backdrop } from '@material-ui/core';
import { useStyles } from './Sidebar.styles';
import { clsx } from 'clsx';
import { SidebarSlot, SidebarState } from '../state/types';

interface SidebarProps {
    state: SidebarState;
    onBackdropClick: () => void;
    rootClassName?: string;
    rootStyle?: CSSProperties;
    open: boolean;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
    const {
        state,
        onBackdropClick,
        rootStyle,
        rootClassName,
        open,
    } = props;

    const classes = useStyles();
    const sidebarRef = useRef<HTMLDivElement>(null);

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    }

    const renderSlot = (slot: SidebarSlot) => {
        const content = slot.layouts?.[slot.layouts.length - 1].content;
        return (
            <div key={slot.index}>
                {typeof content === 'function' ? content() : content}
            </div>
        )
    }

    useEffect(() => {
        if (sidebarRef.current) {
            open
                ? (sidebarRef.current.style.right = '0')
                : (sidebarRef.current.style.right = '-100%');
        }
    }, [open])

    return (
        <Backdrop
            open={open}
            style={{zIndex: 100}}
            onClick={onBackdropClick}
        >
            <div className={classes.muiSidebar} ref={sidebarRef}>
                <div
                    className={clsx(classes.muiSidebarRoot, rootClassName)}
                    style={rootStyle}
                    onClick={handleClick}
                >
                    {state.slots.map(renderSlot)}
                </div>
            </div>
        </Backdrop>
    )
}
