import { Badge, Card, CardContent, Popover, IconButton } from '@material-ui/core';

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import React from 'react';
import { ShoppingBagContext } from '../../context/ShoppingBag';
import ShoppingBag from './index';

const ShoppingBagIndicator = () => {
  const [shoppingBagVisible, setShoppingBagVisible] = React.useState<boolean>(false);
  const anchorEl = React.useRef<HTMLButtonElement>();
  const shoppingBag = React.useContext(ShoppingBagContext);

  return (
    <>
      <Popover
        open={shoppingBagVisible}
        anchorEl={anchorEl.current}
        onClose={() => setShoppingBagVisible(!shoppingBagVisible)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Card >
          <CardContent>
            <ShoppingBag />
          </CardContent>
        </Card>
      </Popover>
      <IconButton title="Bag Of Words" color="inherit" onClick={() => setShoppingBagVisible(!shoppingBagVisible)} id="cart">
        <Badge
          badgeContent={shoppingBag.words.length}
          color="primary"
          ref={anchorEl}
        >
          <ShoppingBasketIcon />
        </Badge>
      </IconButton>
    </>
  )
}

export default ShoppingBagIndicator;
