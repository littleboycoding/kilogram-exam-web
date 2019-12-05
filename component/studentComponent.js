var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("../drive"),
    driveGet = _require.driveGet,
    driveUpdate = _require.driveUpdate;

var StudentPage = function (_React$Component) {
  _inherits(StudentPage, _React$Component);

  function StudentPage(props) {
    _classCallCheck(this, StudentPage);

    var _this = _possibleConstructorReturn(this, (StudentPage.__proto__ || Object.getPrototypeOf(StudentPage)).call(this, props));

    _this.state = {
      body: {}
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleUpdate = _this.handleUpdate.bind(_this);
    return _this;
  }

  _createClass(StudentPage, [{
    key: "fetchData",
    value: function fetchData() {
      var _this2 = this;

      this.props.handleDialog.open(React.createElement(
        "div",
        { style: { fontSize: 20, marginBottom: 15 } },
        "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14 \uFC70"
      ));
      driveGet("student.json").then(function (res) {
        _this2.setState({ body: res });
        _this2.props.handleDialog.close();
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchData();
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ id: event.target.value });
    }
  }, {
    key: "handleUpdate",
    value: function handleUpdate(res) {
      this.setState({ body: res });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          {
            onClick: function onClick() {
              _this3.props.handleDialog.open(React.createElement(CreateStudent, {
                handleDialog: _this3.props.handleDialog,
                body: _this3.state.body
              }));
            },
            style: { marginBottom: "10px" },
            className: "Primary Button"
          },
          "เพิ่มนักเรียนใหม่"
        ),
        React.createElement(
          "table",
          { className: "studentList" },
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              { style: { width: "30%" } },
              "รหัสประจำตัว"
            ),
            React.createElement(
              "th",
              { style: { width: "70%" } },
              "ชื่อ-นามสกุล"
            )
          ),
          React.createElement(StudentList, {
            body: this.state.body,
            handleDialog: this.props.handleDialog,
            handleUpdate: this.handleUpdate
          })
        )
      );
    }
  }]);

  return StudentPage;
}(React.Component);

function StudentList(props) {
  var list = [];

  var _loop = function _loop(key) {
    list.push(React.createElement(
      "tr",
      { key: key },
      React.createElement(
        "td",
        null,
        key
      ),
      React.createElement(
        "td",
        { style: { position: "relative", height: "35px" } },
        props.body[key],
        React.createElement("input", {
          onClick: function onClick() {
            return props.handleDialog.open(React.createElement(StudentDelete, {
              id: key,
              body: props.body,
              handleDialog: props.handleDialog,
              handleUpdate: props.handleUpdate
            }));
          },
          value: "\u0E25\u0E1A",
          type: "button",
          style: {
            position: "absolute",
            right: "0",
            top: 0,
            fontWeight: "bold"
          },
          className: "Button Danger"
        })
      )
    ));
  };

  for (var key in props.body) {
    _loop(key);
  }
  return list;
}

var StudentDelete = function (_React$Component2) {
  _inherits(StudentDelete, _React$Component2);

  function StudentDelete(props) {
    _classCallCheck(this, StudentDelete);

    var _this4 = _possibleConstructorReturn(this, (StudentDelete.__proto__ || Object.getPrototypeOf(StudentDelete)).call(this, props));

    _this4.state = {
      loading: false
    };

    _this4.deleteProc = _this4.deleteProc.bind(_this4);
    return _this4;
  }

  _createClass(StudentDelete, [{
    key: "deleteProc",
    value: function deleteProc() {
      var _this5 = this;

      var result = Object.assign({}, this.props.body);
      this.setState({ loading: true });
      delete result[this.props.id];

      this.props.handleUpdate(result);
      driveUpdate("student.json", result).then(function (res) {
        _this5.props.handleDialog.close();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return !this.state.loading ? React.createElement(
        "div",
        null,
        React.createElement(
          "span",
          null,
          "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E25\u0E1A\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A"
        ),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(
          "button",
          {
            onClick: function onClick() {
              return _this6.props.handleDialog.close();
            },
            style: { marginRight: "10px" },
            className: "Button"
          },
          "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"
        ),
        React.createElement(
          "button",
          { onClick: this.deleteProc, className: "Button Danger" },
          "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19"
        )
      ) : React.createElement(
        "div",
        { style: { fontSize: 20, marginBottom: 15 } },
        "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E2A\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \uFC70"
      );
    }
  }]);

  return StudentDelete;
}(React.Component);

var CreateStudent = function (_React$Component3) {
  _inherits(CreateStudent, _React$Component3);

  function CreateStudent(props) {
    _classCallCheck(this, CreateStudent);

    var _this7 = _possibleConstructorReturn(this, (CreateStudent.__proto__ || Object.getPrototypeOf(CreateStudent)).call(this, props));

    _this7.state = { id: "", name: "", loading: false };
    _this7.handleChange = _this7.handleChange.bind(_this7);
    _this7.handleSubmit = _this7.handleSubmit.bind(_this7);
    _this7.handleDelete = _this7.handleDelete.bind(_this7);
    _this7.data = Object.assign({}, _this7.props.body);
    return _this7;
  }

  _createClass(CreateStudent, [{
    key: "handleChange",
    value: function handleChange(event, type) {
      this.setState(_defineProperty({}, type, event.target.value));
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this8 = this;

      this.setState({ loading: true });

      this.data[this.state.id] = this.state.name;

      console.log(this.data);

      driveUpdate("student.json", this.data).then(function (res) {
        return _this8.props.handleDialog.close(React.createElement(StudentPage, { handleDialog: _this8.props.handleDialog }));
      });

      event.preventDefault();
    }
  }, {
    key: "handleDelete",
    value: function handleDelete() {
      this.setState({ loading: true });
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      if (!this.state.loading) {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { style: { fontSize: 20, marginBottom: 15 } },
            "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19\u0E43\u0E2B\u0E21\u0E48"
          ),
          React.createElement(
            "form",
            { onSubmit: this.handleSubmit },
            React.createElement("input", {
              type: "text",
              maxlength: "10",
              required: "true",
              placeholder: "\u0E23\u0E2B\u0E31\u0E2A\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27",
              style: {
                padding: "5px",
                border: "1px solid #CCC",
                marginBottom: "5px"
              },
              value: this.state.id,
              onChange: function onChange(e) {
                return _this9.handleChange(e, "id");
              }
            }),
            React.createElement("br", null),
            React.createElement("input", {
              required: "true",
              type: "text",
              placeholder: "\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25",
              style: {
                padding: "5px",
                border: "1px solid #CCC"
              },
              value: this.state.name,
              onChange: function onChange(e) {
                return _this9.handleChange(e, "name");
              }
            }),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("input", {
              onClick: function onClick() {
                return _this9.props.handleDialog.close();
              },
              type: "button",
              value: "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01",
              className: "Button",
              style: { marginRight: "5px" }
            }),
            React.createElement("input", { type: "submit", value: "\u0E15\u0E01\u0E25\u0E07", className: "Button Primary" })
          )
        );
      } else {
        return React.createElement(
          "div",
          { style: { fontSize: 20, marginBottom: 15 } },
          "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E2A\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \uFC70"
        );
      }
    }
  }]);

  return CreateStudent;
}(React.Component);

module.exports.StudentPage = StudentPage;