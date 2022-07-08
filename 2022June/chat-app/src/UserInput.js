import './UserInput.css';

function UserInput({ keyDownHandler, clickHandler }) {
  return (
    <div className='UserInput'>
      <form action=''>
        <div  id="messageBox"
              aria-label="messageBox"
              contentEditable="true"
              data-text="Type here..."
              onKeyDown={keyDownHandler}></div>
        <button type="submit" 
                aria-label="messageSend" 
                id='messageSend'
                onClick={clickHandler}>Send</button>
      </form>
    </div>
  );
}

export default UserInput;
