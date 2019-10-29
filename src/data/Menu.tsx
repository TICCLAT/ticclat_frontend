import React from 'react';
import ChartIcon from '@material-ui/icons/BarChart';
import InfoIcon from '@material-ui/icons/Info';
import GlossaryIcon from '@material-ui/icons/LibraryBooks';
import TutorialIcon from '@material-ui/icons/Assignment';
const Menu = [
    {
        name: 'Overview',
        icon: <ChartIcon />
    },
    {
        name: 'About',
        icon: <InfoIcon />
    },
    {
        name: 'Glossary',
        icon: <GlossaryIcon />
    },

    {
        name: 'Tutorial',
        icon: <TutorialIcon />
    }


]


export default Menu;
