import './Message.css';

const Message = ({ username, text, sender, showUsername }) => {
  return (
    <div className={`Message ${sender} ${showUsername}`}>
      {/* <h4>{username}</h4> */}
      <p>{text}</p>
    </div>
  )
}


export default Message;
