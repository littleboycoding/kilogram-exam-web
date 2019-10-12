const { ipcRenderer } = require("electron");

function Account(props) {
  return (
    <span id="account">
      <span id="account_detail"></span>
    </span>
  );
}

function Header(props) {
  return (
    <div id="header">
      {props.value} <Account name="Thanwat Yodnil" />
    </div>
  );
}

function Sidebar_BT(props) {
  return (
    <div
      className={"sidebar_bt " + props.className}
      onClick={() => props.onClick(props.name)}
    >
       {props.name}
    </div>
  );
}

const menu = ["หน้าแรก", "ข้อสอบ", "นักเรียน", "สรุป"];

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_list: menu,
      active: menu[0]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(actived_menu) {
    this.setState({
      active: actived_menu
    });
  }

  render() {
    return (
      <div id="sidebar">
        {this.state.menu_list.map(menu => (
          <Sidebar_BT
            key={menu}
            name={menu}
            onClick={this.handleClick}
            className={menu == this.state.active ? "actived" : "not-active"}
          />
        ))}
      </div>
    );
  }
}

function Content(props) {
  return (
    <div id="content">
      <Header value="Home" />
    </div>
  );
}

function Dialog(props) {
  return (
    <div className="dialogContainer">
      <div className="dialog">{props.children}</div>
    </div>
  );
}

class SignIn_BT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false
    };
  }

  render() {
    return (
      <img
        className="hover_pointer"
        onMouseOver={() => this.setState({ hovering: true })}
        onMouseOut={() => this.setState({ hovering: false })}
        onClick={() => {
          ipcRenderer.send(this.props.signinMethod);
        }}
        src={!this.state.hovering ? this.props.src : this.props.srcHover}
      />
    );
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogShown: true,
      dialogContent: (
        <Dialog>
          <SignIn_BT
            src="google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png"
            srcHover="google_signin_buttons/web/1x/btn_google_signin_light_pressed_web.png"
            signinMethod="googleSignin"
          />
        </Dialog>
      )
    };
    this.signInSuccess = this.signInSuccess.bind(this);
    ipcRenderer.once("signInSuccess", (event, code) => {
      this.signInSuccess(code);
    });
  }

  signInSuccess(code) {
    this.setState({
      dialogShown: false
    });
  }

  render() {
    return (
      <div id="container">
        {this.state.dialogShown ? this.state.dialogContent : null}
        <Sidebar />
        <Content />
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById("root"));
