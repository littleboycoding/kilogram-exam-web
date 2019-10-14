const { ipcRenderer } = require("electron");
const { google } = require("googleapis");
const { driveGet } = require("./drive");

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userImage: null,
      displayName: null,
      email: null
    };
    ipcRenderer.on("userInfo", (event, res) => {
      this.setState({
        userImage: res.data.photos[0].url,
        displayName: res.data.names[0].displayName,
        email: res.data.emailAddresses[0].value
      });
    });
  }

  render() {
    return (
      <span id="account">
        <img
          style={{ height: "20px", borderRadius: "50%" }}
          align="center"
          src={this.state.userImage}
        />
        <span id="account_detail"> {this.state.displayName}</span>
      </span>
    );
  }
}

function Header(props) {
  return (
    <div id="header">
      {props.value} <Account />
    </div>
  );
}

function Sidebar_Button(props) {
  return (
    <div
      className={"sidebar_bt " + props.className}
      onClick={() => props.onClick(props.name)}
    >
       {props.name}
    </div>
  );
}

function Sidebar(props) {
  return (
    <div id="sidebar">
      {props.menuList.map(menu => (
        <Sidebar_Button
          key={menu}
          name={menu}
          onClick={() => props.onClick(menu)}
          className={menu == props.activePage ? "actived" : "not-active"}
        />
      ))}
    </div>
  );
}

function Content(props) {
  return (
    <div id="content">
      <Header value={props.activePage} />
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

class SignIn_Button extends React.Component {
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

const menu = ["หน้าแรก", "ข้อสอบ", "นักเรียน", "สรุป"];
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: menu,
      activePage: null,
      dialogShown: true,
      dialogContent: (
        <Dialog>
          <SignIn_Button
            src="google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png"
            srcHover="google_signin_buttons/web/1x/btn_google_signin_light_pressed_web.png"
            signinMethod="googleSignin"
          />
        </Dialog>
      )
    };
    ipcRenderer.on("signInSuccess", event => {
      this.setState({
        dialogShown: false,
        activePage: this.state.menuList[0]
      });
    });
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(activeNum) {
    this.setState({
      activePage: activeNum
    });
  }

  render() {
    return (
      <div id="container">
        {this.state.dialogShown ? this.state.dialogContent : null}
        <Sidebar
          activePage={this.state.activePage}
          onClick={this.handleClick}
          menuList={this.state.menuList}
        />
        <Content activePage={this.state.activePage} />
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById("root"));
