import mimobot from "../Assets/mimobot_icon.png";


function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
      </div>
      <div className="navbar-center">
      <img src={mimobot} className="w-15 h-15"/>
        <a className="btn btn-ghost text-2xl font-medium text-center">MIMO CHATBOT</a>
      </div>
      <div className="navbar-end">
      </div>
    </div>
  );
}

export default Navbar;
