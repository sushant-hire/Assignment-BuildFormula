import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Swal from "sweetalert2";

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const TaskWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  top: 7rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  font-family: "Poppins", sans-serif;

  @media screen and (min-width: 768px) {
    width: 70%;
  }
`;

const Heading = styled.h1`
  margin-bottom: 1.5rem;
`;
const TodoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const TodoListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 1rem;
  align-items: center;
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

const TodoInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;

  @media screen and (min-width: 480px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TodoInput = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 10px;

  @media screen and (min-width: 480px) {
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const Button = styled.button`
  padding: 8px;
  border-radius: 4px;
  border: none;
  color: #fff;
  background-color: #007bff;

  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #f44336;
  }

  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

function Task() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  const handleNewTodoChange = (event) => setNewTodo(event.target.value);

  const handleAddTodo = () => {
    if (newTodo !== "") {
      const newId = uuidv4();
      setTodos([...todos, { id: newId, text: newTodo, completed: false }]);
      setNewTodo("");
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please add a task in the input!",
      });
    }
  };
  const deleteTodo = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your task has been deleted.",
        });
      }
    });
  };

  const handleEditButtonClick = (todo) => {
    setEditingTodo(todo);
  };

  const handleEditTodoChange = (event) => {
    setEditingTodo((todo) => ({ ...todo, text: event.target.value }));
  };

  const handleSaveButtonClick = () => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === editingTodo.id ? editingTodo : todo))
    );
    setEditingTodo(null);
    Swal.fire({
      icon: "success",
      title: "Changes saved!",
      text: "Your changes have been saved.",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <Container>
      <TaskWrapper>
        <Heading>TaskMaster</Heading>
        <TodoInputWrapper>
          <TodoInput
            type="text"
            value={newTodo}
            onChange={handleNewTodoChange}
            placeholder="Enter a new task"
          />
          <Button onClick={handleAddTodo}>Add Task</Button>
        </TodoInputWrapper>
        {todos.length === 0 ? (
          <p>Add a task to begin!</p>
        ) : (
          <TodoList>
            {todos.map((todo) => (
              <TodoListItem key={todo.id}>
                {editingTodo && editingTodo.id === todo.id ? (
                  <>
                    <TodoInput
                      type="text"
                      value={editingTodo.text}
                      onChange={handleEditTodoChange}
                    />
                    <Button onClick={handleSaveButtonClick}>Save</Button>
                  </>
                ) : (
                  <>
                    {todo.text}

                    <Button onClick={() => handleEditButtonClick(todo)}>
                      Edit
                    </Button>
                    <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
                  </>
                )}
              </TodoListItem>
            ))}
          </TodoList>
        )}
      </TaskWrapper>
    </Container>
  );
}

export default Task;
