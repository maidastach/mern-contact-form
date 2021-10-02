const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const isNotEmpty = (value) => 
{
    if
    (
      value.length > 2 
      && value !== '' 
      && value !== null 
      && value !== undefined
    )
      return true;
    else
      return false;
};

export const messageHasLength = (mess) => 
{
  if(mess.length > 10)
    return true;
  else 
    return false;
};

export const numberCheck = (num) => 
{
  if(num.length < 7)
    return false;
  for(let n of num)
  {
    if(isNaN(Number(n)))
      return false;
  }
  return true;
};


export const validateEmail = (mail) => 
{
  if(emailRegExp.test(mail.toLowerCase()))
    return true
  else
    return false
};