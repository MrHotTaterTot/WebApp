import {
    AppBar, Divider, Drawer, FormControlLabel, IconButton, List,
    ListItem, ListItemText, Switch, Toolbar,
    Typography
} from '@material-ui/core';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'preact-router/match';
import { useState } from 'preact/hooks';
import { useLocationCtx } from '../../LocationHistoryContext';
import SearchBar from '../SearchBar/SearchBar';
import './TopBar.css';
import {useWeatherContext} from "../../WeatherDataContext.jsx";
import {blue, lightBlue} from "@material-ui/core/colors";

const BlueSwitch = withStyles({
    switchBase: {
        color: "white",
        "&$checked": {
            color: blue[500],
        },
        "&$checked + $track": {
            backgroundColor: lightBlue[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

const useStyles = makeStyles({
    paper: {
        backgroundColor: '#1e1e1e',
        width: '50vw',
        height: '100vh',
    },
    linkItem: {
        textDecoration: 'none',
        "&:focus, &:hover, &:visited, &:link, &:active": {
            textDecoration: 'none',
        }
    },
    listItem: {
        color: 'white',
        paddingLeft: '2rem',
        '&:hover': {
            backgroundColor: '#2e2e2e',
        },
    },
    navHeading: {
        color: 'white',
        padding: '0 16px',
        marginTop: '1rem',
    },
    switch: {
        marginLeft: '3vw',
    },
})

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
    const handleSearchFromHistory = async (city) => {
        await HistoryCtx.searchCity(city);
        handleDrawerClose();
    }

    const units = WeatherCtx.units.get;

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
                    <div className="switch-container">
                        <FormControlLabel
                            control={
                                <BlueSwitch
                                    checked={units === "°F"}
                                    onChange={() => {
                                        WeatherCtx.units.toggle();
                                    }}
                                    name="unit-switch"
                                />
                            }
                            label={units === "°F" ? "°F" : "°C"}
                            className={classes.switch}
                        />
                    </div>
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
