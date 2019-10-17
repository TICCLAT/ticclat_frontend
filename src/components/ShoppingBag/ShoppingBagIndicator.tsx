import { makeStyles, createStyles, Badge, Card, CardContent, Popover, IconButton, CardHeader, Button } from '@material-ui/core';
import { SystemUpdate as ExportIcon } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/DeleteSweep'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import React from 'react';
import { ShoppingBagContext } from '../../context/ShoppingBag';
import ShoppingBag from './index';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerRoot: {
      paddingBottom: 0
    },
    header: {
      fontSize: 20
    }
  }),
);
const ShoppingBagIndicator = () => {
  const classes = useStyles();
  const [shoppingBagVisible, setShoppingBagVisible] = React.useState<boolean>(false);
  const anchorEl = React.useRef<HTMLButtonElement>();
  const shoppingBag = React.useContext(ShoppingBagContext);

  let csvContent = "data:text/csv;charset=utf-8,"
  const exportToCSV = () => {
    const data = shoppingBag.words.join('\n');
    csvContent += data;
    const url = encodeURI(csvContent);
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // If browser supports HTML5 download attribute
      link.setAttribute('href', url);
      link.setAttribute('download', 'BagOfWords');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
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
          {shoppingBag.words.length > 0 ?

            <CardHeader
              action={
                <>
                  <IconButton aria-label="export" title="Export To CSV" onClick={exportToCSV}>
                    <ExportIcon />
                  </IconButton>
                  <IconButton aria-label="clear" title="Clear All Words" onClick={shoppingBag.removeAllWords}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
              title="Bag Of Words"
              classes={{ root: classes.headerRoot, title: classes.header }}
            />
            : null}
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
