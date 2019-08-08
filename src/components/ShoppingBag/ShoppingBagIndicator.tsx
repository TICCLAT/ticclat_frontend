import { Badge, Card, CardContent, Popover } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import React from 'react';
import { ShoppingBagContext } from '../../context/ShoppingBag';
import ShoppingBag from './index';

const ShoppingBagIndicator = () => {
  const [ shoppingBagVisible, setShoppingBagVisible ] = React.useState<boolean>(false);
  const anchorEl = React.useRef<HTMLButtonElement>();
  const shoppingBag = React.useContext(ShoppingBagContext);

  return (
    <>
      <Popover
        open={shoppingBagVisible}
        anchorEl={anchorEl.current}
        onClose={() => setShoppingBagVisible(!shoppingBagVisible)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Card>
          <CardContent>
            <ShoppingBag/>
          </CardContent>
        </Card>
      </Popover>
      <Badge
        badgeContent={shoppingBag.words.length}
        color="primary"
        ref={anchorEl}
        onClick={() => setShoppingBagVisible(!shoppingBagVisible)}
      >
        <ShoppingBasketIcon />
      </Badge>
    </>
  )
}

export default ShoppingBagIndicator;
