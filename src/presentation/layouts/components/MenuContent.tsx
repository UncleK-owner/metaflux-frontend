import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate, useLocation } from 'react-router-dom';
import path from 'path';
import { RouterPath } from '@presentation/routes/RouterPath';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: RouterPath.DASHBOARD_INDEX },
  { text: 'Analytics', icon: <AnalyticsRoundedIcon />, path: '/app/analytics' },
  { text: 'Clients', icon: <PeopleRoundedIcon />, path: '/app/clients' },
  { text: 'Address', icon: <AssignmentRoundedIcon />, path: RouterPath.ADDRESS_INDEX },
  { text: 'Maps', icon: <MapIcon />, path: '/app/maps' },
  { text: 'Recipients', icon: <PeopleRoundedIcon />, path: RouterPath.ADDRESS_RECIPIENTS },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/app/settings' },
  { text: 'About', icon: <InfoRoundedIcon />, path: '/app/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, path: '/app/feedback' },
];

export default function MenuContent() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={() => { navigate(item.path || ''); }}>

            <ListItemButton selected={location.pathname === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={() => {
            navigate(item.path || '');
          }}>
            <ListItemButton selected={location.pathname === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
