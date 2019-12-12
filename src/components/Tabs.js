import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import treeData from './../helpers/treeData';
import constants from './../constants/constants';
import Generations from './Generations';
import VerticalTree from './verticalTree';

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
            {value === index && <Box p={3}>{children}</Box>}
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
        backgroundColor: theme.palette.background.paper
    },
}));

export default function FullWidthTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const [generationData, setTreeData] = useState([]);

    const [getVertData, setVertData] = useState([]);

    useEffect(() => {
        if (!generationData.length) {
            treeData(constants.dataUrl.gen1, setTreeData);
        }
    }, [])

    useEffect(() => {
        if (!getVertData.length) {
            treeData(constants.dataUrl.gen1, setVertData);
        }
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                <Tab label="Horizontal" {...a11yProps(0)} />
                <Tab label="Veritical" {...a11yProps(1)} />
                <Tab label="Others" {...a11yProps(2)} />
            </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    
                    <Generations data={generationData} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                <VerticalTree data={generationData} />
        </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Item Three
        </TabPanel>
            </SwipeableViews>
        </div>
    );
}