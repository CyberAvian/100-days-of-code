import './Door.css'

function Door({ number, clickHandler }) {
  return (
    <button id={number} className="door" onClick={clickHandler}>
      Door {number}
    </button>
  )
}

export default Door;
