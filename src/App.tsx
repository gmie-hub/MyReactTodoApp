import React from 'react';
import './App.css';
import { Container } from '@mui/system';
import { Modal, Button, TextField } from '@mui/material';
import { cardDto } from './@types/props';
import CustomCard from './components/customCard';

const App : React.FC = () => {
  const [todo, setTodo] = React.useState<cardDto>({
    name: "",
    description: ""
  });
  const [allTodo, setAllTodo] = React.useState<cardDto[]>([]);
  const [show, setShow] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [isEdit, setIsEdit] = React.useState(false);

  const handleTodo = (type: "add" | "delete" | "update", ind?: object) => {
    if(type === "add") {
      allTodo.push(todo);
      setTodo({
        name: "",
        description: ""
      });
      setShow(false);
      setAllTodo(allTodo);
    }
    if(type === "delete"){
      let data = [...allTodo];
      data.splice(index, 1);
      console.log(data);
      setAllTodo(data);
    }
    if (type === "update"){
      let updateData = {...ind, name: todo.name, description: todo.description};
      setTodo(updateData);

     let updateTodo = allTodo.map(ind => {
      if (allTodo.indexOf(ind) === index){
        return {...ind, name: todo.name, description: todo.description}
      }
      return ind;
     })

      setAllTodo(updateTodo);
      setIsEdit(false);
      setShow(false);
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {xs: 300, md: 400},
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container component={"section"}>
      <Button
        sx={{marginTop: 9, m: "auto", width: "20%", display: "block"}}
        variant="contained"
        onClick={() => setShow(!show)}
      >
        Add Todo
      </Button>
      <Modal open={show} onClose={() => setShow(!show)}>
        <Container sx={style}>
          <TextField
            label ="name"
            value={todo.name}
            onChange={(name) => {
              setTodo({
                ...todo,
                name: name.target.value,
              });
            }}
            fullWidth
            sx={{display: "block"}}
          />
          <TextField
            label ="description"
            value={todo.description}
            onChange={(description) => {
              setTodo({
                ...todo,
                description: description.target.value,
              });
            }}
            fullWidth
            sx={{marginTop: 2 ,display: "block"}}
          />
          <Button
            variant="contained"
            onClick={() => isEdit ? handleTodo("update") : handleTodo("add")}
            sx={{ marginTop: 2, display: "block", float: "right"}}
          >
            {isEdit ? "Edit" : "Add"}
          </Button>
        </Container>
      </Modal>
      {allTodo.map(({ description, name }, ind) => {
        return (
          <React.Fragment key={ind}>
            <CustomCard
              name={name}
              description={description}
              deleteHandler={() => handleTodo("delete")}
              edit={() => {
                let current = allTodo[index];
                setTodo(current);
                setShow(true);
                setIndex(index);
                setIsEdit(true);
              }}
            />
          </React.Fragment>
        );
      })}
    </Container>
  )
}

export default App;
