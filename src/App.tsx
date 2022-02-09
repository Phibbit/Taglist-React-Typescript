import React, { useReducer, useState } from 'react';
import { Button, Box, Tooltip, useMediaQuery, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from "./components/SideBar";
import AddTask from "./views/AddTask";
import { useTheme } from "@mui/system";
import { useLocalSorage } from "./assets/customHooks";
import { Tag, Todo, globalState, Action } from "./assets/models";
import ListView from "./views/ListView";


const App = () => {

	const reducer = (state: globalState, action: Action) => {

		try {

			switch (action.type) {
				case 'Add Todo': (() => {
					const newState: globalState = { ...state };
					newState.taskAdd = false;
					if (action.tag) {
						newState.tags = [...state.tags, action.tag]
						window.localStorage.setItem('tags', JSON.stringify(newState.tags))
					}
					if (action.todo) {
						newState.todos = [...state.todos, action.todo]
						window.localStorage.setItem('todos', JSON.stringify(newState.todos))
						return newState
					} else {
						throw new Error("No Todo Defined!");
					}
				})();
					break;
				case 'Edit Todo':;
					break;
				case 'Delete Todo':;
					break;
				case 'Mark Done':;
					break;
				case 'Create Tag':;
					break;
				case 'Delete Tag':;
					break;
				case 'Todo Selected':;
					break;
				case 'Tag Selected':;
					break;
				default:
					break;
			}
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}

	const initialState: globalState = {
		todos: (() => {
			const todos = window.localStorage.getItem('todos');
			return todos ? JSON.parse(todos) : [];
		})(),
		tags: (() => {
			const tags = window.localStorage.getItem('tags');
			return tags ? JSON.parse(tags) : [];
		})(),
		taskAdd: false,
		selectedTodos: [],
		selectedTags: [],
	}

	// const [state, dispatch] = useReducer(reducer, initialState)  //implement this to replace local state
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down('md'))
	const [taskAdd, setAddTask] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [todos, setTodos] = useLocalSorage<Todo[]>('todos', []);

	const handleDrawerToggle = () => {
		setDrawerOpen((drawerOpen) => !drawerOpen)
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<IconButton
				aria-label="open drawer"
				onClick={handleDrawerToggle}
				sx={{ position: 'fixed' }}
			>
				<MenuIcon fontSize="large" />
			</IconButton>
			<SideBar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
			<Box flexGrow={2}>
				{taskAdd && <AddTask
					setAddTask={setAddTask}
					mobile={mobile}
					todos={todos}
					setTodos={setTodos} />}
				<ListView todos={todos} />
			</Box>
			<Box sx={{
				position: 'fixed',
				bottom: '10%',
				right: '10%'
			}}>
				<Tooltip title='Add a task' placement='top-start'>
					<Button variant='contained'
						onClick={() => setAddTask(addTask => !addTask)}
						sx={{
							height: 70,
							width: 70,
							borderRadius: 50,
						}}
					>
						{taskAdd ? <ClearIcon fontSize="large" />
							: <AddIcon fontSize="large" />}
					</Button>
				</Tooltip>
			</Box>
		</Box>
	)
}

export default App;