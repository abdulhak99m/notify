   // const newTodos = [todo, ...todos];

    // setTodos(newTodos);
};
//where it's changed

  // const updateTodo = (todoId, newValue,dbId,data) => {
  //   if (!newValue.text || /^\s*$/.test(newValue.text)) {
  //     return;
  //   }
  //   let date = new Date();
  //   db.child(`todos/${dbId}`).set(
  //       {...data,newValue},err => {
  //           if(err)
  //           console.log(err)
  //       }
  //   )
    
  //   setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  // };

  const updateTodo = (todoId, newValue,dbId,data,user,uId) => {
    console.log(user,uId)
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    let date = new Date();
    let text = newValue.text
    db.child(`todos/${dbId}`).set(
        {...data,text},err => {
            if(err)
            console.log(err)
        }
    )

    if(user && uId){

    db.child(`todos/${uId}`).set(
      {...user,text},err => {
          if(err)
          console.log(err)
      }
  )
    }