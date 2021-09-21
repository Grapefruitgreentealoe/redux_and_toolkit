import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import ToDo from "./ToDo";

function Home({ toDos,addToDo }) {
    //toDos from the props
    //직접 dispatch나 action Creators를 처리할 필요 없이 
    //mapStateToProps와 mapDispatchToProps로 나눠서 props로 보냄
    const [text, setText] = useState("");
    const onChange = (e) => {
        setText(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        addToDo(text);
        setText("");
        
    }
    return (
        <>
            <h1>Todo</h1>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} value={text}/>
                <button>Add</button>
            </form>
            <ul>
                {toDos.map(
                    toDo => (<ToDo {...toDo} key={toDo.id}/>)
                )}
            </ul>
        </>
    );

}

function mapStateToProps(state) {
    return ({toDos: state});
}

function mapDistachToProps(dispatch) {
    return ({
        addToDo: text => dispatch(actionCreators.addToDo(text))
    })
}
//props로 함수들을 전달

export default connect(mapStateToProps,mapDistachToProps)(Home);
//connect는 getCurrentState에서 리턴되는 props를
//Home 으로 보내는 props에 추가될 수 있도록 한다.