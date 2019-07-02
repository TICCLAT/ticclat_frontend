import * as React from 'react';
import {
  makeStyles,
  IconButton,
  TableBody,
  TextField,
  TableRow,
  TableCell,
  Table,
  Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '350px',
  },
  input: {
    display: 'flex',
    alignItems: 'flex-end',
  },
}));

interface IProps {
  onChange?: (words: string[]) => any;
}

const WordList = (props: IProps) => {
  const [ words, setWords ] = React.useState<string[]>([]);
  const [ wordInputValue, setWordInputValue ] = React.useState<string>('');
  const wordInputRef = React.createRef<HTMLInputElement>();
  const handleChange = (w: string[]) => {
    setWords(w);
    if (props.onChange) {
      props.onChange(w);
    }
  };
  const handleAdd = (word: string) => {
    const trimmedWord = word.trim();
    if (trimmedWord && !words.includes(trimmedWord)) {
      handleChange([...words, trimmedWord]);
      setWordInputValue('');
      wordInputRef.current!.focus();
    }
  };
  const handleRemove = (word: string) => {
    handleChange(words.filter(w => w !== word));
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h6" color="inherit">
        Word list
      </Typography>
      <div className={classes.input}>
        <TextField
          inputRef={wordInputRef}
          value={wordInputValue}
          label="Add word"
          onChange={e => setWordInputValue(e.target.value)}
          onKeyPress={ev => ev.key === 'Enter' && handleAdd(wordInputValue)}
          margin="normal"
        />
        <IconButton
          color="primary"
          onClick={() => handleAdd(wordInputValue)}
        >
          <AddIcon />
        </IconButton>
      </div>
      <Table size="small">
        <TableBody>
          {words.map(word => (
            <TableRow key={word}>
              <TableCell>
                {word}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="primary"
                  onClick={() => handleRemove(word)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WordList;
