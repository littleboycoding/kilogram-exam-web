var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { QuestionPage } from "./questionComponent.js";
import { StudentPage } from "./studentComponent.js";
import { ResultPage } from "./resultComponent.js";

function Account(props) {
  return React.createElement(
    "span",
    {
      onClick: function onClick() {
        return props.handleDialog.open(React.createElement(LogoutDialog, { handleDialog: props.handleDialog }));
      },
      className: "profileArea",
      id: "account"
    },
    React.createElement("img", {
      style: { height: "20px", borderRadius: "50%" },
      align: "center",
      src: props.userInfo.img
    }),
    React.createElement(
      "span",
      { id: "account_detail" },
      " ",
      props.userInfo.name
    )
  );
}

function Logout(dialog) {
  dialog.open(React.createElement(
    "div",
    null,
    "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A..."
  ));
  gapi.auth2.getAuthInstance().signOut();
  location.reload();
}

function LogoutDialog(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { style: { fontSize: 20, marginBottom: 15 } },
      "\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A ?"
    ),
    React.createElement("input", {
      onClick: function onClick() {
        return props.handleDialog.close();
      },
      type: "button",
      style: { marginRight: "10px" },
      className: "Button",
      value: "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"
    }),
    React.createElement("input", {
      onClick: function onClick() {
        return Logout(props.handleDialog);
      },
      type: "button",
      className: "Button Danger",
      value: "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19"
    })
  );
}

function Header(props) {
  return React.createElement(
    "div",
    { id: "header" },
    props.value,
    " ",
    React.createElement(Account, { userInfo: props.userInfo, handleDialog: props.handleDialog })
  );
}

function Sidebar_Button(props) {
  return React.createElement(
    "div",
    {
      className: "sidebar_bt " + props.className,
      onClick: function onClick() {
        return props.onClick(props.name);
      }
    },
    props.name
  );
}

function Sidebar(props) {
  function eachPageButton(menuList, props) {
    var menu = [];

    var _loop = function _loop(key) {
      menu.push(React.createElement(Sidebar_Button, {
        key: key,
        name: key,
        onClick: function onClick() {
          return props.onClick(key, props.menuList[key]["page"]);
        },
        className: key == props.activePage ? "actived" : "not-active"
      }));
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(menuList)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        _loop(key);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return menu;
  }

  return React.createElement(
    "div",
    { id: "sidebar" },
    eachPageButton(props.menuList, props)
  );
}

function ContentContainer(props) {
  return React.createElement(
    "div",
    { id: "content_container" },
    React.createElement(Header, {
      userInfo: props.userInfo,
      handleDialog: props.handleDialog,
      value: props.activePage
    }),
    React.createElement(
      "div",
      { className: "content" },
      props.pageContent
    )
  );
}

function Dialog(props) {
  return React.createElement(
    "div",
    { className: "dialogContainer" },
    React.createElement(
      "div",
      { className: "dialog" },
      props.children
    )
  );
}

function SignIn_Button() {
  return React.createElement("div", { id: "signin-button", className: "g-signin2" });
}

var Container = function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this.handleDialog = {
      open: function open(msg) {
        _this.setState({ dialogShown: true, dialogContent: msg });
      },
      close: function close(res) {
        _this.setState({
          dialogShown: false,
          pageContent: res ? null : _this.state.pageContent
        });
        _this.setState({
          pageContent: res ? res : _this.state.pageContent
        });
      }
    };

    _this.menu = {
      "ﴕ ข้อสอบ": {
        page: React.createElement(QuestionPage, { handleDialog: _this.handleDialog })
      },
      " นักเรียน": { page: React.createElement(StudentPage, { handleDialog: _this.handleDialog }) },
      " สรุป": { page: React.createElement(ResultPage, { handleDialog: _this.handleDialog }) }
    };

    _this.state = {
      menuList: _this.menu,
      activePage: null,
      pageContent: null,
      dialogShown: true,
      dialogContent: React.createElement(SignIn_Button, null),
      userInfo: { name: "", email: "", img: "" }
    };

    gapi.load("client:auth2", function () {
      gapi.client.init({
        apiKey: "AIzaSyDN1w4HgvGe0ytbOUJ6T10i5ymjW9j0qE0",
        clientId: "613633799370-oq1j8j8te4nlb01hd2srbsqhg8vmnh8d.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appfolder https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest", "https://people.googleapis.com/$discovery/rest?version=v1"]
      }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(_this.isSignIn);
        var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        _this.setState({
          userInfo: {
            name: profile.getName(),
            email: profile.getEmail(),
            img: profile.getImageUrl()
          }
        });
        gapi.auth2.getAuthInstance().attachClickHandler("signin-button", {}, function (user) {
          console.log(user);
        }, function (error) {
          console.log(error);
        });
        _this.isSignIn(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    });

    _this.isSignIn = function (state) {
      if (state) {
        _this.setState({
          activePage: Object.keys(_this.menu)[0],
          pageContent: _this.menu[Object.keys(_this.menu)[0]]["page"],
          dialogShown: false
        });
        var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        _this.setState({
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

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleDialog.open = _this.handleDialog.open.bind(_this);
    _this.handleDialog.close = _this.handleDialog.close.bind(_this);
    return _this;
  }

  _createClass(Container, [{
    key: "onSignIn",
    value: function onSignIn(google) {
      this.setState({
        dialogShown: false
      });
      this.handleClick(Object.keys(this.menu)[0], this.menu[Object.keys(this.menu)[0]]["page"]);
    }
  }, {
    key: "handleClick",
    value: function handleClick(activeNum, page) {
      this.setState({
        activePage: activeNum,
        pageContent: page
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "container" },
        this.state.dialogShown ? React.createElement(
          Dialog,
          null,
          this.state.dialogContent
        ) : null,
        React.createElement(Sidebar, {
          activePage: this.state.activePage,
          menuList: this.state.menuList,
          onClick: this.handleClick
        }),
        React.createElement(ContentContainer, {
          handleDialog: this.handleDialog,
          activePage: this.state.activePage,
          pageContent: this.state.pageContent,
          menuList: this.state.menuList,
          userInfo: this.state.userInfo
        })
      );
    }
  }]);

  return Container;
}(React.Component);

ReactDOM.render(React.createElement(Container, null), document.getElementById("root"));