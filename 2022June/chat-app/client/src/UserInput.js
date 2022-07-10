import './UserInput.css';

function UserInput({ clickHandler, keyPressHandler }) {
  return (
    <div className='UserInput'>
      <form id='messageForm' name='messageForm'>
        <div    id="messageBox"
                aria-label="messageBox"
                contentEditable="true"
                data-text="Type here..."
                onKeyPress={keyPressHandler}></div>
        <button type="submit" 
                aria-label="messageSend" 
                id='messageSend'
                onClick={clickHandler}>Send</button>
      </form>
    </div>
  );
}

export default UserInput;
