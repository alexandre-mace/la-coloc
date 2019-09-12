import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function CustomMaterialIconDoneButton(props) {
  const classes = useStyles();

  return (
    <div>
      <IconButton onClick={() => props.onPress()} className={classes.button}>
        <DoneIcon className={classes.icon} fontSize={'large'}/>
      </IconButton>
    </div>
  );
}
