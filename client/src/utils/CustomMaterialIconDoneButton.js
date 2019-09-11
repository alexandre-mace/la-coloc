import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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
        <CheckCircleOutlineIcon className={classes.icon} color={'disabled'} fontSize={'large'}/>
      </IconButton>
    </div>
  );
}
