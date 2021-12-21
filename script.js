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
