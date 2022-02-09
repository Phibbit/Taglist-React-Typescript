import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Todo } from '../assets/models';

interface ListViewProps {
    todos: Todo[];
}
const ListView = ({ todos }: ListViewProps) => {
    return (
        <List>
            {todos.map(todo => {
                return (
                    <>
                        <ListItem>
                            <ListItemText primary={todo.title} secondary={todo.description}/>
                        </ListItem>
                        <Divider />
                    </>
                )
            })}
        </List >
    );
};

export default ListView;