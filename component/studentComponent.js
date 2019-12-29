var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { driveGet, driveUpdate } from "../drive.js";

export var StudentPage = function (_React$Component) {
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
          "div",
          {
            onClick: function onClick() {
              _this3.props.handleDialog.open(React.createElement(CreateStudent, {
                handleDialog: _this3.props.handleDialog,
                body: _this3.state.body
              }));
            },
            style: { marginBottom: "10px", display: "inline-block" },
            className: "Button Primary"
          },
          "\uF50F \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19\u0E43\u0E2B\u0E21\u0E48"
        ),
        React.createElement(
          "table",
          { className: "studentList" },
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              { style: { width: "15%" } },
              "รหัสประจำตัว"
            ),
            React.createElement(
              "th",
              { style: { width: "15%" } },
              "ระดับชั้น"
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
        null,
        props.body[key].room
      ),
      React.createElement(
        "td",
        { style: { position: "relative", height: "35px" } },
        props.body[key].name,
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

    _this7.state = { id: "", name: "", room: "", loading: false };
    _this7.handleChange = _this7.handleChange.bind(_this7);
    _this7.handleSubmit = _this7.handleSubmit.bind(_this7);
    _this7.handleDelete = _this7.handleDelete.bind(_this7);
    _this7.handleXLSX = _this7.handleXLSX.bind(_this7);
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

      if (this.data[this.state.id] == undefined) {
        this.setState({ loading: true });

        this.data[this.state.id] = {
          name: this.state.name,
          room: this.state.room
        };

        console.log(this.data);

        driveUpdate("student.json", this.data).then(function (res) {
          return _this8.props.handleDialog.close(React.createElement(StudentPage, { handleDialog: _this8.props.handleDialog }));
        });
      } else {
        this.props.handleDialog.open(React.createElement(
          "div",
          { style: { fontSize: 18, marginBottom: 15 } },
          "\u0E21\u0E35\u0E23\u0E2B\u0E31\u0E2A\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19\u0E19\u0E35\u0E49\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E43\u0E0A\u0E49\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E2D\u0E37\u0E48\u0E19",
          React.createElement("br", null),
          React.createElement("br", null),
          React.createElement(
            "button",
            {
              className: "Button",
              onClick: function onClick() {
                return _this8.props.handleDialog.close();
              }
            },
            "\u0E15\u0E01\u0E25\u0E07"
          )
        ));
      }
      event.preventDefault();
    }
  }, {
    key: "handleDelete",
    value: function handleDelete() {
      this.setState({ loading: true });
    }
  }, {
    key: "handleXLSX",
    value: function handleXLSX() {
      var _this9 = this;

      var file = document.getElementById("XLSX");
      file.click();
      file.onchange = function (e) {
        var input = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, { type: "array" });

          _this9.props.handleDialog.open(React.createElement(TableXLSX, {
            body: _this9.props.body,
            workbook: workbook,
            handleDialog: _this9.props.handleDialog
          }));
        };
        reader.readAsArrayBuffer(input);
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this10 = this;

      if (!this.state.loading) {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { style: { fontSize: 20, marginBottom: 15 } },
            "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19\u0E43\u0E2B\u0E21\u0E48",
            React.createElement("br", null),
            React.createElement(
              "button",
              { onClick: this.handleXLSX, className: "Button Secondary" },
              "\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01\u0E44\u0E1F\u0E25\u0E4C XLSX"
            ),
            React.createElement("input", {
              style: { display: "none" },
              accept: ".xlsx",
              type: "file",
              required: true,
              id: "XLSX"
            })
          ),
          React.createElement(
            "form",
            { onSubmit: this.handleSubmit },
            React.createElement("input", {
              type: "text",
              maxLength: "10",
              pattern: "^[0-9]*$",
              title: "\u0E23\u0E2B\u0E31\u0E2A\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E1E\u0E35\u0E22\u0E07\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19",
              required: "true",
              placeholder: "\u0E23\u0E2B\u0E31\u0E2A\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27",
              style: {
                padding: "5px",
                border: "1px solid #CCC",
                marginBottom: "5px"
              },
              value: this.state.id,
              onChange: function onChange(e) {
                return _this10.handleChange(e, "id");
              }
            }),
            React.createElement("br", null),
            React.createElement("input", {
              required: "true",
              type: "list",
              list: "roomList",
              placeholder: "\u0E01\u0E25\u0E38\u0E48\u0E21",
              style: {
                padding: "5px",
                border: "1px solid #CCC",
                marginBottom: "5px"
              },
              value: this.state.room,
              onChange: function onChange(e) {
                return _this10.handleChange(e, "room");
              }
            }),
            React.createElement(
              "datalist",
              { id: "roomList" },
              React.createElement(DistinctList, { body: this.props.body })
            ),
            React.createElement("br", null),
            React.createElement("input", {
              required: "true",
              type: "text",
              placeholder: "\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25",
              style: {
                padding: "5px",
                border: "1px solid #CCC",
                marginBottom: "5px"
              },
              value: this.state.name,
              onChange: function onChange(e) {
                return _this10.handleChange(e, "name");
              }
            }),
            React.createElement("br", null),
            React.createElement("input", {
              onClick: function onClick() {
                return _this10.props.handleDialog.close();
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

var TableXLSX = function (_React$Component4) {
  _inherits(TableXLSX, _React$Component4);

  function TableXLSX(props) {
    _classCallCheck(this, TableXLSX);

    var _this11 = _possibleConstructorReturn(this, (TableXLSX.__proto__ || Object.getPrototypeOf(TableXLSX)).call(this, props));

    _this11.column = ["รหัสประจำตัว", "ชื่อ-นามสกุล", "กลุ่ม"];
    _this11.state = {
      sheet: _this11.props.workbook.SheetNames[0],
      column: [null, null, null]
    };
    _this11.handleSheetChange = _this11.handleSheetChange.bind(_this11);
    _this11.handleClick = _this11.handleClick.bind(_this11);
    _this11.handleSubmit = _this11.handleSubmit.bind(_this11);
    return _this11;
  }

  _createClass(TableXLSX, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this12 = this;

      if (this.state.column.every(function (every) {
        return every != null;
      })) {
        var sheet = this.props.workbook.Sheets[this.state.sheet];
        var body = Object.assign({}, this.props.body);
        var data = [];
        this.state.column.forEach(function (column) {
          data.push(Object.keys(sheet).filter(function (filter) {
            return filter.replace(/[0-9]/g, "") == column;
          }));
        });
        for (var i = 1; i < data[0].length; i++) {
          if (sheet[data[0][i]].w.length <= 10 && sheet[data[0][i]].w.search(/[a-zA-Z]/g) == -1) {
            Object.assign(body, _defineProperty({}, sheet[data[0][i]].w, {
              name: sheet[data[1][i]].w,
              room: sheet[data[2][i]].w
            }));
          }
        }

        console.log(body);
        this.props.handleDialog.open(React.createElement(
          "div",
          { style: { fontSize: 20, marginBottom: 15 } },
          "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E2A\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \uFC70"
        ));
        driveUpdate("student.json", body).then(function (res) {
          return _this12.props.handleDialog.close(React.createElement(StudentPage, { handleDialog: _this12.props.handleDialog }));
        });
      }
      event.preventDefault();
    }
  }, {
    key: "handleSheetChange",
    value: function handleSheetChange(event) {
      this.setState({
        sheet: event.target.value,
        column: [null, null, null]
      });
    }
  }, {
    key: "handleBackground",
    value: function handleBackground(e, color, locked) {
      if (e.target.id != "xlsx_table") {
        var xlsx_table = document.getElementById("xlsx_table");
        var xlsx_column = e.target.id.substring(11).replace(/[0-9]/g, "");
        var tr = xlsx_table.children[0].children;
        for (var i = 0; i < tr.length; i++) {
          var td = tr[i].children;
          for (var x = 0; x < td.length; x++) {
            if (td[x].style.backgroundColor != "rgb(221, 221, 221)") {
              if (td[x].id.substring(11).replace(/[0-9]/g, "") == xlsx_column) {
                td[x].style.backgroundColor = color;
              }
            }
          }
        }
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.id != "xlsx_table" && this.state.column.some(function (some) {
        return some == null;
      })) {
        var xlsx_column = event.target.id.substring(11).replace(/[0-9]/g, "");
        if (!this.state.column.some(function (some) {
          return some == xlsx_column;
        })) {
          var column = this.state.column;
          column[column.findIndex(function (find) {
            return find == null;
          })] = xlsx_column;
          this.setState({
            column: column
          });
          this.handleBackground(event, "#DDD", true);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this13 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "select",
          {
            onChange: this.handleSheetChange,
            className: "Input",
            style: {
              width: "100%",
              backgroundColor: "white",
              marginBottom: "10px"
            }
          },
          this.props.workbook.SheetNames.map(function (map) {
            return React.createElement(
              "option",
              null,
              map
            );
          })
        ),
        React.createElement("div", {
          onClick: this.handleClick,
          onMouseOver: function onMouseOver() {
            return _this13.handleBackground(event, "#CCC", false);
          },
          onMouseOut: function onMouseOut() {
            return _this13.handleBackground(event, "#FFF", false);
          },
          className: "xlsx_table_container",
          dangerouslySetInnerHTML: {
            __html: XLSX.utils.sheet_to_html(this.props.workbook.Sheets[this.state.sheet], {
              id: "xlsx_table"
            })
          }
        }),
        React.createElement("br", null),
        this.state.column.some(function (some) {
          return some == null;
        }) ? React.createElement(
          "span",
          null,
          "กรุณาเลือกคอลัมน์ - " + this.column[this.state.column.findIndex(function (find) {
            return find == null;
          })],
          React.createElement("br", null),
          React.createElement("br", null)
        ) : "",
        React.createElement(
          "button",
          {
            onClick: function onClick() {
              return _this13.props.handleDialog.close();
            },
            className: "Button"
          },
          "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"
        ),
        React.createElement(
          "button",
          {
            style: { marginLeft: "10px" },
            onClick: this.handleSubmit,
            className: (this.state.column.every(function (every) {
              return every != null;
            }) ? "" : "Disabled") + " Button Primary"
          },
          "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01"
        )
      );
    }
  }]);

  return TableXLSX;
}(React.Component);

function DistinctList(props) {
  var body = Object.keys(props.body).map(function (map) {
    return props.body[map].room;
  });
  var distinctBody = [].concat(_toConsumableArray(new Set(body)));
  return distinctBody.map(function (map) {
    return React.createElement(
      "option",
      { key: map },
      map
    );
  });
}