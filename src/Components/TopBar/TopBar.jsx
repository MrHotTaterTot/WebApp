import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Divider
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useLocationCtx } from '../../LocationHistoryContext';
import SearchBar from '../SearchBar/SearchBar';
import './TopBar.css';



function TopBar() {

    const HistoryCtx = useLocationCtx()

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    async function handleSearchFromHistory(city) {
        handleDrawerClose();
        await HistoryCtx.searchCity(city);
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Top Bar
                    </Typography>
                    <SearchBar onSearch={async (city) => {
                        await HistoryCtx.searchCity(city)
                    }} />
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                <Paper style={{ width: 300 }}>
                    <List>
                        <Typography variant="h6" className="divider-label">
                            Web Pages
                        </Typography>
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
                    <Divider />
                    <Typography variant="h6" className="divider-label">
                        Search History
                    </Typography>

                    {HistoryCtx.history.get().map((city, index) => (
                        <ListItem button onClick={() => handleSearchFromHistory(city)}>
                            <ListItemText primary={city} />
                        </ListItem>
                    ))}
                </Paper>
            </Drawer>
        </>
    );
}

export default TopBar;
