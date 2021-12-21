window.addEventListener('load', () => {
    init();
});

let svg;
let counter;

function init() {
    svg = `
    <svg class="x" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
    <path d="M6 6L14 14" stroke="#C4C4C4"/>
    <path d="M6 14L14 6" stroke="#C4C4C4"/>
    </svg>
    `
    const task = new TaskList();

    counter = 1;
    document.querySelector('.add-button').addEventListener('click', function (e) {
        e.preventDefault();
        const inputs = document.querySelectorAll('.input');

        if (inputs[inputs.length - 1].value !== '') {
            ++counter;
            task.createNewInput();
            if (document.querySelector('.alert-inner').classList.contains('have')) {
                document.querySelector('.alert').remove();
                document.querySelector('.alert-inner').classList.remove('have')
            }

        } else {
            let message = document.createElement('p');
            message.classList.add('alert');
            message.innerHTML = 'сначала введите задачу';
            if (!document.querySelector('.alert-inner').classList.contains('have')) {
                document.querySelector('.alert-inner').append(message);
                document.querySelector('.alert-inner').classList.add('have');
            }
        }
    })
    const btnSort = document.querySelector('.sort');
    btnSort.addEventListener('click', () => {
        btnSort.classList.toggle('down');
        btnSort.classList.toggle('up');
        task.sortTask(
            btnSort.classList.contains('down') ? 'down' : 'up'
        );
    })
}


class TaskList {
    constructor() {
        this.taskList = [];
        this.createNewInput();
    }

    createNewInput() {
        const div = document.createElement('div');
        div.classList.add('insertField');
        div.id = `input${counter}`;
        const input = document.createElement('input');
        input.classList.add('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', `input${counter}`);

        const deleteDiv = document.createElement('div');
        deleteDiv.classList.add('delete');
        deleteDiv.innerHTML = svg;

        div.append(input);
        div.append(deleteDiv);
        document.querySelector('.task__inner').append(div);
        this.taskList.push(div)
        deleteDiv.addEventListener('click', () => {
            this.deleteTask(div)
        })
        div.draggable = true;
        const eventListener = e => this.dadEventListener(e);
        div.addEventListener('dragstart', eventListener);
        div.addEventListener('dragend', eventListener);
        div.addEventListener('dragenter', eventListener);
    }

    dadEventListener(e) {
        switch(e.type) {
            case 'dragstart':
                this.draggableTask = e.currentTarget;
                break;
            case 'dragenter':
                if (e.currentTarget !== this.draggableTask &&
                    e.currentTarget.classList.contains('insertField')
                    ) {
                        this.changeTask(this.draggableTask, e.currentTarget);
                    }
                break;
            case 'dragend':
                this.draggableTask = null;
                break;
        }
    }

    changeTask(task1, task2) {
        const children = [...document.querySelector('.task__inner').children];
        
        const index1 = children.findIndex(item => item === task1);
        const index2 = children.findIndex(item => item === task2);
        console.log(index1, index2)

        if (index1 < index2) {
            document.querySelector('.task__inner').insertBefore(task2, task1);
        } else {
            document.querySelector('.task__inner').insertBefore(task1, task2);
        }
    }

    deleteTask(task) {
        if (this.taskList.length > 1) {
            task.remove();
            const index = this.taskList.indexOf(task);
            this.taskList.splice(index, 1);
        } else {
            const input = task.querySelector('input');
            input.value = "";
            
        }
    }

    sortTask(sortStatus) {
        this.taskList.sort((a, b) => {
            // if (a.querySelector('input').value > b.querySelector('input').value) {
            //     return (sortStatus === 'down') ? 1 : -1;
            // } else if (a.querySelector('input').value < b.querySelector('input').value) {
            //     return (sortStatus === 'up') ? 1 : -1;
            // }
            if (sortStatus === 'down') {
                return a.querySelector('input').value.localeCompare(b.querySelector('input').value)
            } else {
               return b.querySelector('input').value.localeCompare(a.querySelector('input').value)
            }
        })
        this.taskList.forEach(task => {
            document.querySelector('.task__inner').append(task)
        })
    }
}
