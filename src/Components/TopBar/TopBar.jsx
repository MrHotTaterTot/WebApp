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
    function formatDate(date = new Date()) {
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        function ordinalSuffix(day) {
            if (day % 10 === 1 && day !== 11) {
                return day + 'st';
            } else if (day % 10 === 2 && day !== 12) {
                return day + 'nd';
            } else if (day % 10 === 3 && day !== 13) {
                return day + 'rd';
            } else {
                return day + 'th';
            }
        }

        return `${ordinalSuffix(day)} ${monthNames[monthIndex]}`;
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer} style={{marginRight:0}}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 , marginRight: 12}}>
                        {formatDate()}
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
