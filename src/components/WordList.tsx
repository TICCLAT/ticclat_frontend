import * as React from 'react';
import {
  makeStyles,
  IconButton,
  Paper,
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
    marginTop: '80px',
    marginLeft: '80px',
    padding: theme.spacing(3),
    maxWidth: '350px',
  },
  input: {
    display: 'flex',
    alignItems: 'flex-end',
  },
}));

const WordList = () => {
  const [ words, setWords ] = React.useState<string[]>([]);
  const [ wordInputValue, setWordInputValue ] = React.useState<string>('');
  const wordInputRef = React.createRef<HTMLInputElement>();
  const onAdd = (word: string) => {
    const trimmedWord = word.trim();
    if (trimmedWord && !words.includes(trimmedWord)) {
      setWords([...words, trimmedWord]);
      setWordInputValue('');
      wordInputRef.current!.focus();
    }
  };
  const onRemove = (word: string) => {
    setWords(words.filter(w => w !== word));
  };
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography component="h1" variant="h6" color="inherit">
        Word list
      </Typography>
      <div className={classes.input}>
        <TextField
          inputRef={wordInputRef}
          value={wordInputValue}
          label="Add word"
          onChange={e => setWordInputValue(e.target.value)}
          onKeyPress={ev => ev.key === 'Enter' && onAdd(wordInputValue)}
          margin="normal"
        />
        <IconButton
          color="primary"
          onClick={() => onAdd(wordInputValue)}
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
                  onClick={() => onRemove(word)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default WordList;
