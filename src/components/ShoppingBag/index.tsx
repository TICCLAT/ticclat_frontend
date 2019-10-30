import { Chip, Fab, makeStyles } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React, { useRef } from 'react';
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

  // ref to file upload input
  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;


  // File Upload handle to read csv and add content to shopping bag
  const handleFileUpload = (event: any) => {
    const reader = new FileReader();
    const file = event.target.files[0]
    reader.onload = ((uploadedFile: any) => {
      return (e: any) => {
        // csv content to array of strings
        const data = e.target.result.split('\n');
        shoppingBag.addImportedWords(data);
      }
    })(file)
    reader.readAsText(file)
  }

  const words = shoppingBag.words.map((word, index) => (
    <Chip
      key={index}
      color="primary"
      label={word}
      onDelete={() => shoppingBag.removeWord(word)}
      deleteIcon={<DeleteIcon />}
      className={classes.item}
      onClick={() => {
        props.history.push({
          pathname: '/overview',
          search: '?searching=' + word.toLowerCase(), // For Case Insensitive
        })
        localStorage.setItem('searchValue', word.toLowerCase())   // For Case Insensitive
        /* For Case Sensitive
        props.history.push({
          pathname: '/overview',
          search: '?searching=' + word,
        })
        localStorage.setItem('searchValue', word)*/
      }
      }
    />
  ))
  const emptyBagMessage = (
    <>
      <span>Your bag of words is empty</span>
      <input type="file" id="file" ref={fileRef} style={{ display: "none" }} onChange={handleFileUpload} />
      <Fab size='medium'><EmptyBag color='primary' onClick={() => fileRef.current.click()} /></Fab>
      <span>Click on button to import some words!</span>
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
