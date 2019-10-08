import * as React from 'react';

export interface IContextProps {
  words: string[];
  addWord: (word: string) => void;
  removeWord: (word: string) => void;
  addImportedWords: (words: string[]) => void;
}

export const defaultValue = {
  // tslint:disable-next-line:no-empty
  addWord: (word: string) => { },
  // tslint:disable-next-line:no-empty
  removeWord: (word: string) => { },
  // tslint:disable-next-line:no-empty
  addImportedWords: (words: string[]) => { },
  words: [],
}

export const ShoppingBagContext = React.createContext<IContextProps>(defaultValue);
export const ShoppingBagContextConsumer = ShoppingBagContext.Consumer;

export const ShoppingBagProvider = (props: { children: JSX.Element[] | JSX.Element }) => {
  const [words, setWords] = React.useState<string[]>([]);

  React.useEffect(() => {
    const storedWords = localStorage.getItem('shoppingBag');
    if (storedWords) {
      setWords(JSON.parse(storedWords));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('shoppingBag', JSON.stringify(words));
  }, [words]);

  const addWord = (word: string) => {
    if (!words.includes(word)) {
      setWords([...words, word]);
    }
  }
  const addImportedWords = (importedWords: string[]) => {
    setWords(importedWords);
  }

  const removeWord = (word: string) => {
    setWords(words.filter(w => w !== word));
  }

  return (
    <ShoppingBagContext.Provider value={{ words, addWord, removeWord, addImportedWords }} >
      {props.children}
    </ShoppingBagContext.Provider>
  )
}

