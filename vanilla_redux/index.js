//actions must be object
//action은 modifier(reducer)과 소통하는 방법이다.
//변화를 감지하고싶다면 store를 subscribe하면 된다.
//countStore.getState()하면 상태 가져옴.
//acction을 변수로 쓰게되면 자바스크립트에서 감지하도록하기때문에 변수안에 넣어주는게 좋다.
//const store = createStore(reducer);

form.addEventLister("submit", onSubmit)

import { useLayoutEffect } from "react";
import store, { add } from "../redux_toolkit/src/store";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";


const reducer = (state = [], action) =>{
    switch (action.type) {
        case ADD_TODO:
            return [{ text: action.text, id: Date.now() }, ...state]
        //state를 뒤로 두면 최근것이 위로 간다.
        //새로운 state를 create하고, 그 새로운 state를 return하는 걸 잊지마
        case DELETE_TODO:
            return state.filter(toDo => toDo.id !== action.id);
        default:
            return state;
    }
}
const onSubmit = e=>{
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    dispatchaddToDo(toDo);
}


//mutate state는 쓰지말자

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));


//액션만 리턴하는 것
const addToDo = (text) => {
    return {
        type: ADD_TODO, text
    }
}
const deleteToDo = () => {
    return {
        type: DELETE_TODO, id
    }
}
const paintTodos = () => {
    const toDos = store.getState()
    ul.innerText=""
    toDos.forEach(toDo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.innerText = "DEL";
        btn.addEventListener("click",dispatchdeleteToDo)
        li.id = toDo.li;
        li.innerText = toDo.text;
        li.appendChild(btn);
        ul.appendChild(li);
    })
}


store.subscribe(paintTodos)



const dispatchaddToDo = (text) => {
    store.dispatch(addToDo(text))
}

const dispatchdeleteToDo = (e) => {
    const id = e.target.parentNode.id
    store.dispatch(deleteToDo(id));
}