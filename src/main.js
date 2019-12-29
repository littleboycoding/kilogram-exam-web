import { QuestionPage } from "./questionComponent.js";
import { StudentPage } from "./studentComponent.js";
import { ResultPage } from "./resultComponent.js";
import { SettingPage } from "./settingComponent.js";

function Account(props) {
  return (
    <span
      onClick={() =>
        props.handleDialog.open(
          <LogoutDialog handleDialog={props.handleDialog} />
        )
      }
      className="profileArea"
      id="account"
    >
      <img
        style={{ height: "20px", borderRadius: "50%" }}
        align="center"
        src={props.userInfo.img}
      />
      <span id="account_detail"> {props.userInfo.name}</span>
    </span>
  );
}

function Logout(dialog) {
  dialog.open(<div>กำลังออกจากระบบ...</div>);
  gapi.auth2.getAuthInstance().signOut();
  location.reload();
}

function LogoutDialog(props) {
  return (
    <div>
      <div style={{ fontSize: 20, marginBottom: 15 }}>ต้องการออกจากระบบ ?</div>
      <input
        onClick={() => props.handleDialog.close()}
        type="button"
        style={{ marginRight: "10px" }}
        className="Button"
        value="ยกเลิก"
      />
      <input
        onClick={() => Logout(props.handleDialog)}
        type="button"
        className="Button Danger"
        value="ยืนยัน"
      />
    </div>
  );
}

function Header(props) {
  return (
    <div id="header">
      {props.value}{" "}
      <Account userInfo={props.userInfo} handleDialog={props.handleDialog} />
    </div>
  );
}

function Sidebar_Button(props) {
  return (
    <div
      className={"sidebar_bt " + props.className}
      onClick={() => props.onClick(props.name)}
    >
      {props.name}
    </div>
  );
}

function Sidebar(props) {
  function eachPageButton(menuList, props) {
    let menu = [];
    for (const key of Object.keys(menuList)) {
      menu.push(
        <Sidebar_Button
          key={key}
          name={key}
          onClick={() => props.onClick(key, props.menuList[key]["page"])}
          className={key == props.activePage ? "actived" : "not-active"}
        />
      );
    }
    return menu;
  }

  return <div id="sidebar">{eachPageButton(props.menuList, props)}</div>;
}

function ContentContainer(props) {
  return (
    <div id="content_container">
      <Header
        userInfo={props.userInfo}
        handleDialog={props.handleDialog}
        value={props.activePage}
      />
      <div className="content">{props.pageContent}</div>
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

function SignIn_Button() {
  return <div id="signin-button" className="g-signin2"></div>;
}

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.handleDialog = {
      open: msg => {
        this.setState({ dialogShown: true, dialogContent: msg });
      },
      close: res => {
        this.setState({
          dialogShown: false,
          pageContent: res ? null : this.state.pageContent
        });
        this.setState({
          pageContent: res ? res : this.state.pageContent
        });
      }
    };

    this.menu = {
      " ข้อสอบ": {
        page: <QuestionPage handleDialog={this.handleDialog} />
      },
      " นักเรียน": { page: <StudentPage handleDialog={this.handleDialog} /> },
      " สรุป": { page: <ResultPage handleDialog={this.handleDialog} /> },
      "煉 กระดาษคำตอบ": {
        page: <SettingPage handleDialog={this.handleDialog} />
      }
    };

    this.state = {
      menuList: this.menu,
      activePage: null,
      pageContent: null,
      dialogShown: true,
      dialogContent: <SignIn_Button />,
      userInfo: { name: "", email: "", img: "" }
    };

    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: "AIzaSyDN1w4HgvGe0ytbOUJ6T10i5ymjW9j0qE0",
          clientId:
            "613633799370-oq1j8j8te4nlb01hd2srbsqhg8vmnh8d.apps.googleusercontent.com",
          scope:
            "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appfolder https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
            "https://people.googleapis.com/$discovery/rest?version=v1"
          ]
        })
        .then(() => {
          gapi.auth2.getAuthInstance().isSignedIn.listen(this.isSignIn);
          let profile = gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getBasicProfile();
          this.setState({
            userInfo: {
              name: profile.getName(),
              email: profile.getEmail(),
              img: profile.getImageUrl()
            }
          });
          gapi.auth2.getAuthInstance().attachClickHandler(
            "signin-button",
            {},
            user => {
              console.log(user);
            },
            error => {
              console.log(error);
            }
          );
          this.isSignIn(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    });

    this.isSignIn = state => {
      if (state) {
        this.setState({
          activePage: Object.keys(this.menu)[0],
          pageContent: this.menu[Object.keys(this.menu)[0]]["page"],
          dialogShown: false
        });
        let profile = gapi.auth2
          .getAuthInstance()
          .currentUser.get()
          .getBasicProfile();
        this.setState({
          userInfo: {
            name: profile.getName(),
            email: profile.getEmail(),
            img: profile.getImageUrl()
          }
        });
      } else {
        //location.reload();
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleDialog.open = this.handleDialog.open.bind(this);
    this.handleDialog.close = this.handleDialog.close.bind(this);
  }

  onSignIn(google) {
    this.setState({
      dialogShown: false
    });
    this.handleClick(
      Object.keys(this.menu)[0],
      this.menu[Object.keys(this.menu)[0]]["page"]
    );
  }

  handleClick(activeNum, page) {
    this.setState({
      activePage: activeNum,
      pageContent: page
    });
  }

  render() {
    return (
      <div id="container">
        {this.state.dialogShown ? (
          <Dialog>{this.state.dialogContent}</Dialog>
        ) : null}
        <Sidebar
          activePage={this.state.activePage}
          menuList={this.state.menuList}
          onClick={this.handleClick}
        />
        <ContentContainer
          handleDialog={this.handleDialog}
          activePage={this.state.activePage}
          pageContent={this.state.pageContent}
          menuList={this.state.menuList}
          userInfo={this.state.userInfo}
        />
      </div>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById("root"));
