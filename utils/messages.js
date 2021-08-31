const moment=require('moment');
const format = (username, message)=>{
  return {
    username,
    message,
    time: moment().format('h:mm a')
  };
}

module.exports=format