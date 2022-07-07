import './UserInput.css';

function UserInput() {
  return (
    <div className='UserInput'>
      <form action=''>
        {/* <input type='text' aria-label="messageEntry" name='messageEntry' id='messageEntry' placeholder='Begin typing...' /> */}
        {/* <textarea name="messageEntry" id="messageEntry" cols="30" rows="10" wrap="physical" autofocus></textarea> */}
        <div id="messageEntry" autocomplete="off" spellcheck="true" aria-label="Message" contentEditable="true" data-text="Type here..."></div>
        <button type="submit" aria-label="messageSend" id='messageSend'>Send</button>
      </form>
    </div>
  );
}

export default UserInput;
