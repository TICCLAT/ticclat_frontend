import { Chip} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import * as React from 'react';

import { ShoppingBagContext } from '../../context/ShoppingBag';

const ShoppingBag = () => {
  const shoppingBag = React.useContext(ShoppingBagContext);
  const words = shoppingBag.words.map(word => (
    <Chip
      key={word}
      color="primary"
      label={word}
      onDelete={() => shoppingBag.removeWord(word)}
      deleteIcon={<DeleteIcon />}
    />
  ));

  return (
    <div>
      {words}
    </div>
  );
}

export default ShoppingBag;
