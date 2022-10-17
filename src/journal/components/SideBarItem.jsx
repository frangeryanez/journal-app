import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal';
import { 
  Grid, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';


export const SideBarItem = ({ title = '', body, id, date, imageUrls=[] }) => {
  const dispatch = useDispatch();

  const onClickNote = () => dispatch(setActiveNote(
    { title, body, id, date, imageUrls }));

  const newBody = useMemo(() => {
    return body.length > 34
      ? body.substring(0,34) + '...'
      : body;
  },[body]);

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={ onClickNote }>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={ title } />
          <ListItemText secondary={ newBody } />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};