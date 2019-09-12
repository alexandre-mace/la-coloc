import React, {useState, useContext} from 'react';
import Layout from "../components/block/Layout";
import {List} from "../components/task";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Total from "../components/task/Total";
import BalanceList from "../components/task/BalanceList";
import {AppContext} from '../utils/AppContext'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'white',
        width: '100vw',
    },
    tabs: {
        boxShadow : '0 2px 6px -6px #292727'

    },
    tab: {
        textTransform: 'initial'
    },
}));

export default function HomePage(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [customContext, setCustomContext] = useState(undefined)
    const [isHidden, setIsHidden] = React.useState(false);
    const [addClass, setAddClass] = React.useState(false);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function handleChangeIndex(index) {
        setValue(index);
    }

    function toggle() {
        setAddClass(!addClass);
    }

    const show = () =>{
        setIsHidden(true)
        setAddClass('R')
    }
    const hide = () =>{
        setIsHidden(false)
        setAddClass("")
    }
    return (
        <>
            <Layout>
                <AppContext.Consumer>
                    {(context) => (
                        <div className={classes.root}>
                            <AppBar position="static" color="default" className={classes.tabs}>
                                <Tabs
                                    value={context.tabValue}
                                    onChange={context.handleChange}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab className={classes.tab} label="Tâches" {...a11yProps(0)} />
                                    <Tab className={classes.tab}  label="Équilibre" {...a11yProps(1)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={context.tabValue}
                                onChangeIndex={context.handleChangeIndex}
                            >
                                <TabPanel value={context.tabValue} index={0} dir={theme.direction}>
                                    <List {...props}/>
                                </TabPanel>
                                <TabPanel value={context.tabValue} index={1} dir={theme.direction}>
                                    <BalanceList {...props}/>
                                </TabPanel>
                            </SwipeableViews>
                        </div>
                    )}
                </AppContext.Consumer>
            </Layout>
            <div className={isHidden ? 'smoothTransition inFront' : 'inFront'}>
                { this.state.isHidden ? <Create show={() => this.show()} hide={() => this.hide()} {...this.props} /> : null }
            </div>
            { this.state.isHidden ? <button onClick={this.hide} className="hideBackground"></button> : null }
            <div className="addTask" onClick={this.show}>+</div>
        </>
    );
}
