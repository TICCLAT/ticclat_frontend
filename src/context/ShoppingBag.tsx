import * as React from 'react';
import { downloadStringAsFile, loadTextFileAsString } from '../utils';

export interface IContextProps {
  words: string[];
  addWord: (word: string) => void;
  removeWord: (word: string) => void;
  clear: () => void;
  exportToCSV: () => void;
  importCSV: () => void;
}

export const defaultValue = {
  addWord: (word: string) => null,
  removeWord: (word: string) => null,
  clear: () => null,
  words: [],
  exportToCSV: () => null,
  importCSV: () => null,
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

  const removeWord = (word: string) => {
    setWords(words.filter(w => w !== word));
  }

  const clear = () => {
    setWords([]);
  }

  const exportToCSV = () => {
    const filename = `ticclat_bow_${(new Date()).toISOString()}.csv`;
    const exportString = words.join('\n');
    downloadStringAsFile(exportString, filename);
  }

  const importCSV = async () => {
    const result = await loadTextFileAsString();
    const newWords = result.split('\n');
    setWords(newWords);
  }

  return (
    <ShoppingBagContext.Provider value={{ words, addWord, removeWord, clear, exportToCSV, importCSV }} >
      {props.children}
    </ShoppingBagContext.Provider>
  )
}

