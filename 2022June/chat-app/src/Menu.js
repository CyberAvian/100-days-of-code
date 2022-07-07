import "./Menu.css";

function Menu({ userName }) {
  return (
    <div className="Menu">
      <p>Welcome, {userName}</p>
      <button type="button" id="exit" aria-label="exit">Exit Chat</button>
    </div>
  );
}

export default Menu;
