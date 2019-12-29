var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var SettingPage = function (_React$Component) {
  _inherits(SettingPage, _React$Component);

  function SettingPage(props) {
    _classCallCheck(this, SettingPage);

    var _this = _possibleConstructorReturn(this, (SettingPage.__proto__ || Object.getPrototypeOf(SettingPage)).call(this, props));

    _this.state = {
      title: "",
      info: "",
      image: ""
    };

    _this.handlePrint = _this.handlePrint.bind(_this);
    _this.handleFile = _this.handleFile.bind(_this);
    return _this;
  }

  _createClass(SettingPage, [{
    key: "handleInput",
    value: function handleInput(event, name) {
      this.setState(_defineProperty({}, name, event.target.value));
    }
  }, {
    key: "handleFile",
    value: function handleFile(event) {
      var _this2 = this;

      var file = event.target.files[0];
      console.log(file);

      var reader = new FileReader();

      reader.onload = function (file) {
        _this2.setState({
          image: file.target.result
        });
      };

      reader.readAsDataURL(file);
    }
  }, {
    key: "handlePrint",
    value: function handlePrint() {
      var print = window.open("sheet.html?title=" + this.state.title + "&image=" + this.state.image, "");
      /*
      setTimeout(() => {
        print.document.getElementById("title").innerHTML = this.state.title;
        print.eval("print()");
      }, 1000);
      */
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          "\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E01\u0E23\u0E30\u0E14\u0E32\u0E29\u0E04\u0E33\u0E15\u0E2D\u0E1A"
        ),
        "ชื่อหัวกระดาษ",
        React.createElement("br", null),
        React.createElement("input", {
          onChange: function onChange() {
            return _this3.handleInput(event, "title");
          },
          className: "Input",
          type: "text",
          placeholder: "\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E31\u0E27\u0E01\u0E23\u0E30\u0E14\u0E32\u0E29",
          value: this.state.title,
          style: { width: 200, padding: 10 }
        }),
        " ",
        React.createElement("input", {
          type: "file",
          id: "file",
          onInput: this.handleFile,
          style: { display: "none" }
        }),
        React.createElement("br", null),
        React.createElement("br", null),
        "รูปภาพโลโก้",
        React.createElement("br", null),
        React.createElement(
          "div",
          { style: { display: "inline-block", position: "relative" } },
          React.createElement(
            "span",
            {
              style: {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
              }
            },
            "\uF1C5"
          ),
          React.createElement("img", {
            onClick: function onClick() {
              return document.getElementById("file").click();
            },
            src: this.state.image ? this.state.image : null,
            className: "imgLogo",
            style: {
              width: 200,
              height: 200,
              objectFit: "contain"
            }
          })
        ),
        " ",
        React.createElement("input", {
          onClick: function onClick() {
            return _this3.props.handleDialog.open(React.createElement(
              "div",
              null,
              React.createElement(
                "h3",
                null,
                "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E08\u0E33\u0E19\u0E27\u0E19\u0E02\u0E49\u0E2D"
              ),
              React.createElement(
                "button",
                {
                  style: { width: "100px" },
                  onClick: function onClick() {
                    return window.open("sheet.html?title=" + _this3.state.title + "&image=" + _this3.state.image, "");
                  },
                  className: "Button Primary"
                },
                "100 \u0E02\u0E49\u0E2D"
              ),
              " ",
              React.createElement(
                "button",
                {
                  style: { width: "100px" },
                  onClick: function onClick() {
                    return window.open("../sheet2.html?title=" + _this3.state.title, "");
                  },
                  className: "Button Primary"
                },
                "50 \u0E02\u0E49\u0E2D"
              ),
              React.createElement("br", null),
              React.createElement("br", null),
              React.createElement("input", {
                className: "Button",
                onClick: function onClick() {
                  return _this3.props.handleDialog.close();
                },
                value: "\u0E22\u0E49\u0E2D\u0E19\u0E01\u0E25\u0E31\u0E1A",
                type: "button"
              })
            ));
          },
          className: "Button Primary",
          type: "submit",
          value: "\u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E01\u0E23\u0E30\u0E14\u0E32\u0E29",
          style: { padding: 10 }
        })
      );
    }
  }]);

  return SettingPage;
}(React.Component);