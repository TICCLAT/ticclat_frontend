import * as React from 'react';
import { Chip } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

import { ShoppingBagContext } from '../../context/ShoppingBag';

const AddButton = (props: { word: string }) => {
  const shoppingBag = React.useContext(ShoppingBagContext);
  const { word } = props;
  const isInBag = shoppingBag.words.includes(word);
  const handleClick = () => {
    if (isInBag) {
      shoppingBag.removeWord(word)
    } else {
      shoppingBag.addWord(word)
    }
  }
  return (
    <Chip
        color={isInBag ? "primary" : "default"}
        label={word}
        onDelete={handleClick}
        onClick={handleClick}
        deleteIcon={isInBag ? <DeleteIcon /> : <AddIcon />}
    />
  );
}

export default AddButton;
