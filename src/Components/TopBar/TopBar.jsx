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
import {useWeatherContext} from "../../WeatherDataContext.jsx";


const NavConfig = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Surfing',
        path: '/surfing',
    },
    {
        name: 'Sailing',
        path: '/sailing',
    },
    {
        name: 'Jet Skiing',
        path: '/jetskiing',
    },
    {
        name: 'Swimming',
        path: '/swimming',
    },

]
function TopBar() {
    const WeatherCtx = useWeatherContext();
    const HistoryCtx = useLocationCtx();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const classes = useStyles();

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const units = "metric";

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                        style={{ marginRight: 0 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1, marginRight: 12 }}>
                    </Typography>
                    <SearchBar
                        onSearch={async (city) => {
                            await HistoryCtx.searchCity(city);
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={units === "imperial"}
                                onChange={() => {
                                    WeatherCtx.units.toggle()
                                }
                                }
                                name="unit-switch"
                                color="secondary"
                            />
                        }
                        label={units === "imperial" ? "°F" : "°C"}
                    />
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerClose}
                classes={{ paper: classes.paper }} // Add this line
            >
                <Typography
                    variant="h6"
                    className="divider-label typography-margin" // Add the typography-margin class
                    classes={{
                        root: classes.navHeading,
                    }}
                >
                    Web Pages
                </Typography>

                {NavConfig.map((item, index) => {
                    return (
                        <Link
                            href={item.path}
                            key={item.path}
                            style={{ textDecoration: "none" }}
                            classes={{
                                root: classes.linkItem,
                            }}
                        >
                            <ListItem
                                button
                                onClick={handleDrawerClose}
                                classes={{
                                    root: classes.listItem,
                                }}
                            >
                                <ListItemText primary={item.name} />
                            </ListItem>
                        </Link>
                    );
                })}

                <Divider />
                <Typography
                    variant="h6"
                    className="divider-label typography-margin" // Add the typography-margin class
                    classes={{
                        root: classes.navHeading,
                    }}
                >
                    Search History
                </Typography>

                {HistoryCtx.history.get().map((city, index) => (
                    <ListItem
                        button
                        onClick={() => handleSearchFromHistory(city)}
                        key={city}
                        classes={{
                            root: classes.listItem,
                        }}
                    >
                        <ListItemText primary={city} />
                    </ListItem>
                ))}
            </Drawer>
        </>
    );
}


export default TopBar;
