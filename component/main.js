var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("electron"),
    ipcRenderer = _require.ipcRenderer;

var _require2 = require("googleapis"),
    google = _require2.google;

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
    React.createElement(Account, { name: "Thanwat Yodnil" })
  );
}

function Sidebar_BT(props) {
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

var menu = ["หน้าแรก", "ข้อสอบ", "นักเรียน", "สรุป"];

var Sidebar = function (_React$Component2) {
  _inherits(Sidebar, _React$Component2);

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this2 = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

    _this2.state = {
      menu_list: menu,
      active: menu[0]
    };
    _this2.handleClick = _this2.handleClick.bind(_this2);
    return _this2;
  }

  _createClass(Sidebar, [{
    key: "handleClick",
    value: function handleClick(actived_menu) {
      this.setState({
        active: actived_menu
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        { id: "sidebar" },
        this.state.menu_list.map(function (menu) {
          return React.createElement(Sidebar_BT, {
            key: menu,
            name: menu,
            onClick: _this3.handleClick,
            className: menu == _this3.state.active ? "actived" : "not-active"
          });
        })
      );
    }
  }]);

  return Sidebar;
}(React.Component);

function Content(props) {
  return React.createElement(
    "div",
    { id: "content" },
    React.createElement(Header, { value: "Home" })
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

var SignIn_BT = function (_React$Component3) {
  _inherits(SignIn_BT, _React$Component3);

  function SignIn_BT(props) {
    _classCallCheck(this, SignIn_BT);

    var _this4 = _possibleConstructorReturn(this, (SignIn_BT.__proto__ || Object.getPrototypeOf(SignIn_BT)).call(this, props));

    _this4.state = {
      hovering: false
    };
    return _this4;
  }

  _createClass(SignIn_BT, [{
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement("img", {
        className: "hover_pointer",
        onMouseOver: function onMouseOver() {
          return _this5.setState({ hovering: true });
        },
        onMouseOut: function onMouseOut() {
          return _this5.setState({ hovering: false });
        },
        onClick: function onClick() {
          ipcRenderer.send(_this5.props.signinMethod);
        },
        src: !this.state.hovering ? this.props.src : this.props.srcHover
      });
    }
  }]);

  return SignIn_BT;
}(React.Component);

var Container = function (_React$Component4) {
  _inherits(Container, _React$Component4);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this6 = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this6.state = {
      dialogShown: true,
      dialogContent: React.createElement(
        Dialog,
        null,
        React.createElement(SignIn_BT, {
          src: "google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png",
          srcHover: "google_signin_buttons/web/1x/btn_google_signin_light_pressed_web.png",
          signinMethod: "googleSignin"
        })
      )
    };
    ipcRenderer.on("signInSuccess", function (event) {
      console.log(event);
      _this6.setState({
        dialogShown: false
      });
    });
    return _this6;
  }

  _createClass(Container, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "container" },
        this.state.dialogShown ? this.state.dialogContent : null,
        React.createElement(Sidebar, null),
        React.createElement(Content, null)
      );
    }
  }]);

  return Container;
}(React.Component);

ReactDOM.render(React.createElement(Container, null), document.getElementById("root"));