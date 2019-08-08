import { Chip, Fab, makeStyles } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import * as React from 'react';
import { AddShoppingCart as EmptyBag } from '@material-ui/icons/';
import { ShoppingBagContext } from '../../context/ShoppingBag';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  bagContainer: {
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  item: {
    marginBottom: 10
  }
}));
const ShoppingBag = withRouter((props) => {
  const classes = useStyles()
  const shoppingBag = React.useContext(ShoppingBagContext);
  const words = shoppingBag.words.map(word => (
    <Chip
      key={word}
      color="primary"
      label={word}
      onDelete={() => shoppingBag.removeWord(word)}
      deleteIcon={<DeleteIcon />}
      className={classes.item}
      onClick={() => props.history.push({
        pathname: '/overview',
        search: '?searching=' + word,
      })}
    />
  ))
  const emptyBagMessage = (
    <>
      <span>Your bag of words is empty</span>
      <Fab size='medium'><EmptyBag color='primary' /></Fab>
      <span>Add some words!</span>
    </>
  )
  const content = shoppingBag.words.length > 0 ? words : emptyBagMessage;

  return (
    <div className={classes.bagContainer}>
      {content}
    </div>
  );
})

export default ShoppingBag;
