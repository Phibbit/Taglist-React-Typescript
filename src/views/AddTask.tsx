import { Box, Button, Card, Divider, TextField, Typography, ClickAwayListener, InputAdornment, IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DatePicker from "../components/DatePicker";
import { useState } from "react";
import { Todo } from '../assets/models'

interface AddTaskProps {
    setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
    mobile: boolean;
    todos: Todo[];
    setTodos: ((value: Todo[] | ((val: Todo[]) => Todo[])) => void);
}

const AddTask = ({ setAddTask, mobile, todos, setTodos }: AddTaskProps) => {
    const [tag, setTag] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [todo, setTodo] = useState<Todo>(new Todo());

    const addTag = () => {
        tag && setTodo(todo => {
            return {...todo, tags: [...todo.tags, tag]}
        })
        setTag('')
    }
    return (
        <ClickAwayListener onClickAway={() => setAddTask(false)}>
            <Card
                sx={{
                    position: 'absolute',
                    m: '10%',
                    p: 2,
                    maxWidth: 600,
                    zIndex: 2
                }}>
                <Typography variant="h5" gutterBottom>Add Task</Typography>
                <TextField id="title" label="Title" variant="outlined"
                    onChange={e => {
                        setTodo(todo => {
                            return { ...todo, title: e.target.value };
                        })
                    }} fullWidth />
                <TextField margin='dense' id="description" label="Add a description" variant="outlined"
                    onChange={e => {
                        setTodo(todo => {
                            return { ...todo, description: e.target.value };
                        })
                    }}
                    fullWidth multiline maxRows={8} minRows={8} />
                <Divider sx={{ marginY: 1 }} />
                <Box display={'flex'} flexDirection={mobile ? 'column' : 'row'}>
                    <Box display={'flex'} flexDirection={'column'} flexShrink={0}>
                        <Box sx={{ mb: 2 }}>
                            <DatePicker date={date} setDate={setDate} />
                        </Box>
                        <Box mb={5}>
                            <TextField id="tag" label="Add a tag" value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        addTag()
                                    }
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={addTag}>
                                            <AddCircleOutlineIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }} />
                            {todo.tags.length > 0 &&
                                <Button sx={{ position: 'absolute', left: 0, bottom: -30, fontSize: 12 }}
                                    onClick={() => setTodo(todo => {
                                        return { ...todo, tags: [] };
                                    })}>Clear Tags</Button>}
                        </Box>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Box mb={5}>
                            {todo.tags.length > 0 && todo.tags.map((tag) => {
                                return (
                                    <Card id={tag} onClick={(e) => setTodo(todo => {
                                        return {
                                            ...todo,
                                            tags: todo.tags.filter(tag => tag !== (e.target as HTMLDivElement).id
                                            )
                                        }
                                    })}
                                        sx={{ display: 'inline-block', p: .5, m: .5, cursor: 'pointer' }}>
                                        <Typography id={tag}>{tag}</Typography>
                                    </Card>
                                )
                            })}
                        </Box>
                    </Box>
                    <Button sx={{ position: 'absolute', bottom: 0, right: 0 }}
                        variant="contained"
                        onClick={() => {
                            setTodo(todo => {
                                if (date) todo.dueDate = date;
                                todo.id = Date.now();
                                return todo;
                            })
                            setTodos([...todos, todo])
                            setTodo(new Todo())
                            setAddTask(false)
                        }}>Add</Button>
                </Box>

            </Card>
        </ClickAwayListener>
    )
}

export default AddTask;