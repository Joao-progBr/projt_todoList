;(function(){
    "use strict"

    //armazenar o DOM em variaveis
    const itemInput = document.getElementById('item-input')
    const todoAddForm = document.getElementById('todo-add')
    const ul = document.getElementById('todo-list')
    const lis = ul.getElementsByTagName('li')

    let arrTasks = getSavedData()

    // function addEventLi(li){
    //     li.addEventListener('click', function(){
    //         console.log(li)
    //     })
    // }

    function getSavedData(){
        let tasksData = localStorage.getItem('tasks')
        tasksData = JSON.parse(tasksData)
        return tasksData && tasksData.length ? tasksData : [
            {
                name: 'Task 1 ',
                createAt: Date.now(),
                completed: false, 
            }
        ]
    }

    function setNewData(){
        localStorage.setItem('tasks', JSON.stringify(arrTasks))
    }

    setNewData()

    function generateLiTask(obj){
        const li = document.createElement("li")
        const p = document.createElement("p")
        const checkButton = document.createElement('button')
        const editButton = document.createElement('i')
        const deleteButton = document.createElement('i')

        li.className = "todo-item"

        checkButton.className = 'button-check'
        checkButton.innerHTML = `<i class="fas fa-check ${obj.completed ? "" : "displayNone"}" data-action="checkButton"></i>`
        checkButton.setAttribute('data-action', 'checkButton')
        li.appendChild(checkButton)

        p.className = "task-name"
        p.textContent = obj.name
        li.appendChild(p)

        editButton.className = 'fas fa-edit'
        editButton.setAttribute('data-action', 'editButton')
        li.appendChild(editButton)

        const containerEdit = document.createElement('div')
        containerEdit.className = 'editContainer'
        const inputEdit = document.createElement('input')
        inputEdit.setAttribute('type', 'text')
        inputEdit.className = 'editInput'
        inputEdit.value = obj.name
        containerEdit.appendChild(inputEdit)

        const containerEditButton = document.createElement('button')
        containerEditButton.className = 'editButton'
        containerEditButton.textContent = 'Edit'
        containerEditButton.setAttribute('data-action', 'containerEditButton')
        containerEdit.appendChild(containerEditButton)
        
        const containerCancelButton = document.createElement('button')
        containerCancelButton.className = 'cancelButton'
        containerCancelButton.textContent = 'Cancel'
        containerCancelButton.setAttribute('data-action', 'containerCancelButton')
        containerEdit.appendChild(containerCancelButton)

        li.appendChild(containerEdit)


        // deleteButton.classList.add('fas','fa-trash-alt')
        deleteButton.className = 'fas fa-trash-alt'
        deleteButton.setAttribute('data-action', 'deleteButton')
        li.appendChild(deleteButton)

        // addEventLi(li)

        return li
    }

    function renderTasks(){
        ul.innerHTML = ""
        arrTasks.forEach(task => {
            ul.appendChild(generateLiTask(task))
        })
    }

    function addTask(task){
        arrTasks.push({
            name: task,
            createAt: Date.now(),
            completed: false, 
        })
        setNewData()
    }

    function clickedUl(e){
        const dataAction = e.target.getAttribute('data-action')
        if(!dataAction) return

        let currentLi = e.target
        while(currentLi.nodeName !== 'LI'){
            currentLi = currentLi.parentElement
        }
        const currentLiIndex = [...lis].indexOf(currentLi)


        const actions = {
            editButton: function(){
                const editContainer = currentLi.querySelector('.editContainer');

                [...ul.querySelectorAll('.editContainer')].forEach(container => {
                    console.log(container)
                    container.style.display = 'none'
                })
                editContainer.style.display = 'flex';
            },
            deleteButton: function(){
                arrTasks.splice(currentLiIndex, 1)
                renderTasks()
                setNewData()
            },
            containerEditButton: function(){
                const val = currentLi.querySelector('.editInput').value
                arrTasks[currentLiIndex].name = val
                renderTasks()
                setNewData()
            },
            containerCancelButton: function(){
                currentLi.querySelector('.editContainer').removeAttribute('style')
            },
            checkButton: function(){
                arrTasks[currentLiIndex].completed = !arrTasks[currentLiIndex].completed
                if(arrTasks[currentLiIndex].completed){
                    currentLi.querySelector('.fa-check').classList.remove('displayNone')
                }else{
                    currentLi.querySelector('.fa-check').classList.add('displayNone')
                }
                setNewData()
                renderTasks()
            }
        }

        if(actions[dataAction]){
            actions[dataAction]()
        }
    }
    
    todoAddForm.addEventListener('submit', function(e){
        e.preventDefault()
        console.log(itemInput.value)
        addTask(itemInput.value)
        renderTasks()
        itemInput.value = ""
        itemInput.focus()
    })

    ul.addEventListener('click', clickedUl)

    renderTasks()

})()