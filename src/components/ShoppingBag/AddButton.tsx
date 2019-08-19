import * as React from 'react';
import { Chip } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import ReactDOM from 'react-dom';
// import { ShoppingBagContext } from '../../context/ShoppingBag';

const AddButton = (props: { word: string, index: number, shoppingBag: any }) => {
  // const shoppingBag = React.useContext(ShoppingBagContext);
  const { word, shoppingBag } = props;
  const isInBag = shoppingBag.words.includes(word);
  const animate = (parent: Element, target: any, type: string) => {
    // Get the cart and cart's position
    const cart = document.getElementById('cart');
    const cartleft = cart!.offsetLeft;
    const carttop = cart!.offsetTop;

    // Get clicked elements position
    const left = parent.getBoundingClientRect().left;
    const top = parent.getBoundingClientRect().top;
    // Clone the item to move
    const itemClone = target.cloneNode(true);

    if (type === "add") {
      itemClone.style = 'z-index: 1111; width: 100px;opacity:0.8; position:fixed; top:'
        + top + 'px;left:' + left +
        'px;transition: left 2s, top 2s, width 2s, opacity 2s cubic-bezier(1, 1, 1, 1)';
    }
    else {
      itemClone.style = 'z-index: 1111; width: 100px;opacity:0.8; position:fixed; top:'
        + carttop + 'px;left:' + cartleft +
        'px;transition: left 2s, top 2s, width 2s, opacity 2s cubic-bezier(1, 1, 1, 1)';
    }

    // Append the cloned element to document
    const rechange = document.body.appendChild(itemClone);
    // Move cloned element to cart
    setTimeout(() => {
      if (type === "add") {
        itemClone.style.left = cartleft + 'px';
        itemClone.style.top = carttop + 'px';
        itemClone.style.opacity = '0';
      }
      else {
        itemClone.style.left = left + 'px';
        itemClone.style.top = top + 'px';
        itemClone.style.opacity = '0';
      }

    }, 200);
    setTimeout(() => {
      rechange.parentNode.removeChild(rechange);
    }, 2000);

  }
  const handleClick = (event: any) => {
    const parent = ReactDOM.findDOMNode(event.target.parentElement) as Element
    const target = event.target.parentElement;

    if (isInBag) {
      animate(parent, target, "delete")
      shoppingBag.removeWord(word)
    } else {
      animate(parent, target, "add")
      shoppingBag.addWord(word)
    }

  }
  const handleDelete = (event: any) => {
    const parent = ReactDOM.findDOMNode(event.target.parentElement.parentElement) as Element
    const target = parent.children[0];
    if (event.target.parentElement.id === 'delete') {
      animate(parent, target, "delete")
      shoppingBag.removeWord(word)
    }
    else {
      animate(parent, target, "add")
      shoppingBag.addWord(word)
    }
  }
  return (
    <Chip
      id={"item" + props.index}
      title={isInBag ? "Remove from Bag" : "Add To Bag"}
      color={isInBag ? "primary" : "default"}
      label={word}
      onDelete={handleDelete}
      onClick={handleClick}
      deleteIcon={isInBag ? <DeleteIcon id="delete" /> : <AddIcon id="add" />}
    />
  );
}

export default AddButton;
