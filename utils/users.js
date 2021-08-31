users=[]

const createUser=(id,username,room)=>{
  const user={
    id,
    username,
    room
  };
  users.push(user);
  return user;
}

const getCurrentUser=(id)=>{
  return users.find(user=>user.id===id);
}

const removeUser=(id)=>{
  const idx=users.findIndex(user=>user.id===id);
  if(idx!=-1){
    return users.splice(idx,1)[0];
  }
}

const getUsersRoom=(room)=>{
  const filteredUsers=users.filter(user=>user.room===room);
  return filteredUsers;
}

module.exports = {createUser, getCurrentUser, getUsersRoom, removeUser};