var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("electron"),
    ipcRenderer = _require.ipcRenderer;

var _require2 = require("googleapis"),
    google = _require2.google;

var _require3 = require("./drive"),
    driveGet = _require3.driveGet;

var Account = function (_React$Component) {
  _inherits(Account, _React$Component);

  function Account(props) {
    _classCallCheck(this, Account);

    var _this = _possibleConstructorReturn(this, (Account.__proto__ || Object.getPrototypeOf(Account)).call(this, props));

    _this.state = {
      userImage: null,
      displayName: null,
      email: null
    };
    ipcRenderer.on("userInfo", function (event, res) {
      _this.setState({
        userImage: res.data.photos[0].url,
        displayName: res.data.names[0].displayName,
        email: res.data.emailAddresses[0].value
      });
    });
    return _this;
  }

  _createClass(Account, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "span",
        { id: "account" },
        React.createElement("img", {
          style: { height: "20px", borderRadius: "50%" },
          align: "center",
          src: this.state.userImage
        }),
        React.createElement(
          "span",
          { id: "account_detail" },
          " ",
          this.state.displayName
        )
      );
    }
  }]);

  return Account;
}(React.Component);

function Header(props) {
  return React.createElement(
    "div",
    { id: "header" },
    props.value,
    " ",
    React.createElement(Account, null)
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
    "\uF015 ",
    props.name
  );
}

function Sidebar(props) {
  return React.createElement(
    "div",
    { id: "sidebar" },
    props.menuList.map(function (menu) {
      return React.createElement(Sidebar_Button, {
        key: menu,
        name: menu,
        onClick: function onClick() {
          return props.onClick(menu);
        },
        className: menu == props.activePage ? "actived" : "not-active"
      });
    })
  );
}

function Content(props) {
  return React.createElement(
    "div",
    { id: "content" },
    React.createElement(Header, { value: props.activePage })
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

var SignIn_Button = function (_React$Component2) {
  _inherits(SignIn_Button, _React$Component2);

  function SignIn_Button(props) {
    _classCallCheck(this, SignIn_Button);

    var _this2 = _possibleConstructorReturn(this, (SignIn_Button.__proto__ || Object.getPrototypeOf(SignIn_Button)).call(this, props));

    _this2.state = {
      hovering: false
    };
    return _this2;
  }

  _createClass(SignIn_Button, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement("img", {
        className: "hover_pointer",
        onMouseOver: function onMouseOver() {
          return _this3.setState({ hovering: true });
        },
        onMouseOut: function onMouseOut() {
          return _this3.setState({ hovering: false });
        },
        onClick: function onClick() {
          ipcRenderer.send(_this3.props.signinMethod);
        },
        src: !this.state.hovering ? this.props.src : this.props.srcHover
      });
    }
  }]);

  return SignIn_Button;
}(React.Component);

var menu = ["หน้าแรก", "ข้อสอบ", "นักเรียน", "สรุป"];

var Container = function (_React$Component3) {
  _inherits(Container, _React$Component3);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this4 = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this4.state = {
      menuList: menu,
      activePage: null,
      dialogShown: true,
      dialogContent: React.createElement(
        Dialog,
        null,
        React.createElement(SignIn_Button, {
          src: "google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png",
          srcHover: "google_signin_buttons/web/1x/btn_google_signin_light_pressed_web.png",
          signinMethod: "googleSignin"
        })
      )
    };
    ipcRenderer.on("signInSuccess", function (event) {
      _this4.setState({
        dialogShown: false,
        activePage: _this4.state.menuList[0]
      });
    });
    _this4.handleClick = _this4.handleClick.bind(_this4);
    return _this4;
  }

  _createClass(Container, [{
    key: "handleClick",
    value: function handleClick(activeNum) {
      this.setState({
        activePage: activeNum
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "container" },
        this.state.dialogShown ? this.state.dialogContent : null,
        React.createElement(Sidebar, {
          activePage: this.state.activePage,
          onClick: this.handleClick,
          menuList: this.state.menuList
        }),
        React.createElement(Content, { activePage: this.state.activePage })
      );
    }
  }]);

  return Container;
}(React.Component);

ReactDOM.render(React.createElement(Container, null), document.getElementById("root"));