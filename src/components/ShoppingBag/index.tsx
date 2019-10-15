import { Chip, Fab, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import UploadIcon from '@material-ui/icons/CloudUpload';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import * as React from 'react';
import { AddShoppingCart as EmptyBag } from '@material-ui/icons/';
import { ShoppingBagContext } from '../../context/ShoppingBag';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  bagContainer: {
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
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
    <div>
      <Container>
        {shoppingBag.words.length > 0 && (
          <>
            <Button onClick={() => shoppingBag.clear()} variant="contained" color="secondary">
              <DeleteIcon />
            </Button>
            <Button onClick={() => shoppingBag.exportToCSV()} variant="contained" color="secondary">
              <DownloadIcon />
            </Button>
          </>
        )}
        <Button onClick={() => shoppingBag.importCSV()} variant="contained" color="secondary">
          <UploadIcon />
        </Button>
      </Container>
      <div className={classes.bagContainer}>
        {content}
      </div>
    </div>
  );
})

export default ShoppingBag;
