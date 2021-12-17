let svg = `
<svg class="x" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
                                <path d="M6 6L14 14" stroke="#C4C4C4"/>
                                <path d="M6 14L14 6" stroke="#C4C4C4"/>
                            </svg>
`
class Lol {
    constructor() {
        this.inputs = document.querySelectorAll('.insertField');
    }

    createNewInput() {
        const div = document.createElement('div');
        div.classList.add('insertField');
        div.id = `input${this.inputs.length + 1}`;
        const input = document.createElement('input');
        input.classList.add('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', `input${this.inputs.length + 1}`);

        const deleteDiv = document.createElement('div');
        deleteDiv.classList.add('delete');
        deleteDiv.innerHTML = svg;


        div.append(input);
        div.append(deleteDiv);
        document.querySelector('.task__inner').append(div);
        this.refreshInputs();
    }

    refreshInputs() {
        this.inputs = document.querySelectorAll('.insertField');
    }

    deleteItem(id) {
        if (this.inputs.length > 1) {
            this.inputs.forEach(item => {
                if (id === item.id) {
                    item.remove();
                    this.refreshInputs();
                }
            })
        }
    }
}
const lel = new Lol();


function addDelete() {
    document.querySelectorAll('.delete').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            lel.deleteItem(item.parentElement.id);
        })
    })
}
addDelete();
document.querySelector('.add-button').addEventListener('click', function (e) {
    e.preventDefault();
    
    const inputs = document.querySelectorAll('.input')
    inputs.forEach(item => {
        if (item.value !== '') {
            lel.createNewInput();
            addDelete();
        }
    }) 
})