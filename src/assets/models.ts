export class Todo {    
    id: number;
    isDone: boolean;
    title: string;
    description: string;
    dueDate?: Date;
    tags: string[];    
    
    constructor(title='Untitled', description='No Description', tags=[]){
        this.id = Date.now();
        this.isDone = false;
        this.title = title
        this.description = description
        this.tags = tags
    }
}

export class Tag {
    tag: string[];//can be a tag or group of tags.  Need to include logical AND / OR / NOT
    todoIds: number[];
    color: string;

    constructor({tag, color}: Tag) {
        this.tag = tag;
        this.todoIds = [];
        this.color = color;
    }
    set setIds({todoIds}: Tag) {
        this.todoIds = [...this.todoIds, ...todoIds]
    }
    
    get getIds() {
        return this.todoIds;
    }
}

export interface globalState {
	todos: Todo[];
	tags: Tag[];
	taskAdd: boolean;
    selectedTodos: number[];
    selectedTags: string[];


};

export interface Action {
	type: string;
	todo?: Todo;
	tag?: Tag;
};