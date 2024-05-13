import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    muiSidebar: {
        position: 'absolute',
        right: '-100%',
        height: '100%',
        transition: 'right 0.5s ease',
    },
    muiSidebarRoot: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
    }
}));
