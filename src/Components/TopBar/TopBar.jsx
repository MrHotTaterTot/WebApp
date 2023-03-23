import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { AppBar, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useLocationCtx } from '../../LocationHistoryContext';
import SearchBar from '../SearchBar/SearchBar';



function TopBar() {

    const HistoryCtx = useLocationCtx()

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Top Bar
                    </Typography>
                    <SearchBar onSearch={(city) => {
                        HistoryCtx.history.set(prevState => [...prevState, city])
                    }} />
                    <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                <Paper style={{ width: 300 }}>
                    <List>
                        <Link activeClassName="active" href="/">
                            <ListItem button onClick={handleDrawerClose}>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        <Link activeClassName="active" href="/surfing">
                            <ListItem button onClick={handleDrawerClose}>
                                <ListItemText primary="Surfing" />
                            </ListItem>
                        </Link>
                        <Link activeClassName="active" href="/sailing">
                            <ListItem button onClick={handleDrawerClose}>
                                <ListItemText primary="Sailing" />
                            </ListItem>
                        </Link>
                        <Link activeClassName="active" href="/jetskiing">
                            <ListItem button onClick={handleDrawerClose}>
                                <ListItemText primary="Jet Skiing" />
                            </ListItem>
                        </Link>
                        <Link activeClassName="active" href="/swimming">
                            <ListItem button onClick={handleDrawerClose}>
                                <ListItemText primary="Swimming" />
                            </ListItem>
                        </Link>
                    </List>
                    {HistoryCtx.history.get().map((city, index) => (
                        <ListItem button onClick={handleDrawerClose}>
                            <ListItemText primary={city} />
                        </ListItem>
                    )

                    )}
                </Paper>
            </Drawer>
        </>
    );
}

export default TopBar;
