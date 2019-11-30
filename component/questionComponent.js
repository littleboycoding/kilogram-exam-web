var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("../drive"),
    driveGet = _require.driveGet,
    driveUpdate = _require.driveUpdate;

var CreateNewQuestion = function (_React$Component) {
  _inherits(CreateNewQuestion, _React$Component);

  function CreateNewQuestion(props) {
    _classCallCheck(this, CreateNewQuestion);

    var _this = _possibleConstructorReturn(this, (CreateNewQuestion.__proto__ || Object.getPrototypeOf(CreateNewQuestion)).call(this, props));

    _this.state = {
      value: "ข้อสอบใหม่",
      loading: false
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.data = Object.assign({}, _this.props.body);
    return _this;
  }

  _createClass(CreateNewQuestion, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this2 = this;

      this.setState({ loading: true });

      this.data[this.state.value] = {};

      console.log(this.data);

      driveUpdate("question.json", this.data).then(function (res) {
        _this2.props.handleDialog.close(React.createElement(QuestionPage, { handleDialog: _this2.props.handleDialog }));
      });

      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (!this.state.loading) {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { style: { fontSize: 20, marginBottom: 15 } },
            "\u0E15\u0E31\u0E49\u0E07\u0E0A\u0E37\u0E48\u0E2D\u0E02\u0E49\u0E2D\u0E2A\u0E2D\u0E1A\u0E43\u0E2B\u0E21\u0E48"
          ),
          React.createElement(
            "form",
            { onSubmit: this.handleSubmit },
            React.createElement("input", {
              className: "Input",
              type: "text",
              placeholder: "\u0E0A\u0E37\u0E48\u0E2D\u0E02\u0E49\u0E2D\u0E2A\u0E2D\u0E1A",
              value: this.state.value,
              required: true,
              onChange: this.handleChange
            }),
            React.createElement("br", null),
            React.createElement("input", {
              className: "Button",
              type: "button",
              value: "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01",
              style: { margin: 15, marginBottom: 0 },
              onClick: function onClick() {
                return _this3.props.handleDialog.close();
              }
            }),
            React.createElement("input", {
              className: "Button Primary",
              style: { margin: 15, marginBottom: 0 },
              type: "submit",
              value: "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19"
            })
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

  return CreateNewQuestion;
}(React.Component);

var QuestionDelete = function (_React$Component2) {
  _inherits(QuestionDelete, _React$Component2);

  function QuestionDelete(props) {
    _classCallCheck(this, QuestionDelete);

    var _this4 = _possibleConstructorReturn(this, (QuestionDelete.__proto__ || Object.getPrototypeOf(QuestionDelete)).call(this, props));

    _this4.state = {
      loading: false
    };

    _this4.data = Object.assign({}, _this4.props.body);
    _this4.deleteProc = _this4.deleteProc.bind(_this4);
    return _this4;
  }

  _createClass(QuestionDelete, [{
    key: "deleteProc",
    value: function deleteProc() {
      var _this5 = this;

      delete this.data[this.props.title];

      this.setState({ loading: true });

      this.props.handleUpdate(this.data);

      driveUpdate("question.json", this.data).then(function (res) {
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
          "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E25\u0E1A\u0E02\u0E49\u0E2D\u0E2A\u0E2D\u0E1A"
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

  return QuestionDelete;
}(React.Component);

var QuestionPage = function (_React$Component3) {
  _inherits(QuestionPage, _React$Component3);

  function QuestionPage(props) {
    _classCallCheck(this, QuestionPage);

    var _this7 = _possibleConstructorReturn(this, (QuestionPage.__proto__ || Object.getPrototypeOf(QuestionPage)).call(this, props));

    _this7.state = {
      data: ""
    };

    _this7.handleUpdate = _this7.handleUpdate.bind(_this7);
    return _this7;
  }

  _createClass(QuestionPage, [{
    key: "fetchData",
    value: function fetchData() {
      var _this8 = this;

      driveGet("question.json").then(function (res) {
        _this8.setState({ data: res });
      });
    }
  }, {
    key: "handleUpdate",
    value: function handleUpdate(res) {
      this.setState({ data: res });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchData();
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          {
            style: { display: "inline-block" },
            className: "Button Primary",
            onClick: function onClick() {
              return _this9.props.handleDialog.open(React.createElement(CreateNewQuestion, {
                handleDialog: _this9.props.handleDialog,
                body: _this9.state.data
              }));
            }
          },
          "\uF719 \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E02\u0E49\u0E2D\u0E2A\u0E2D\u0E1A\u0E43\u0E2B\u0E21\u0E48"
        ),
        React.createElement(QuestionListPage, {
          data: this.state.data,
          handleDialog: this.props.handleDialog,
          handleUpdate: this.handleUpdate
        })
      );
    }
  }]);

  return QuestionPage;
}(React.Component);

function QuestionListPage(props) {
  var result = [];

  var _loop = function _loop(key) {
    result.push(React.createElement(
      "div",
      { key: key, className: "dataBorder" },
      React.createElement(
        "div",
        { className: "questionTitle" },
        "\uFAF3 ",
        key
      ),
      React.createElement(
        "div",
        { className: "questionTotal" },
        "\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ",
        Object.keys(props.data[key]).length,
        " \u0E02\u0E49\u0E2D"
      ),
      React.createElement(
        "div",
        { className: "questionTotal" },
        "\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E21\u0E37\u0E48\u0E2D 10 \u0E01\u0E23\u0E01\u0E0F\u0E32\u0E04\u0E21 2562"
      ),
      React.createElement(
        "div",
        {
          onClick: function onClick() {
            return props.handleDialog.open(React.createElement(QuestionDelete, {
              handleDialog: props.handleDialog,
              body: props.data,
              title: key,
              handleUpdate: props.handleUpdate
            }));
          },
          className: "Button Danger",
          style: { width: "50px" }
        },
        "\u0E25\u0E1A"
      ),
      React.createElement(
        "div",
        {
          style: {
            width: "calc(100% / 2 - 25px)",
            borderLeft: "1px solid #CCC"
          },
          className: "Button"
        },
        "\uF044 \u0E1E\u0E34\u0E21\u0E1E\u0E4C"
      ),
      React.createElement(
        "div",
        {
          onClick: function onClick() {
            return props.handleDialog.close(React.createElement(QuestionEditPage, {
              data: props.data,
              title: key,
              handleDialog: props.handleDialog
            }));
          },
          className: "Button",
          style: {
            width: "calc(100% / 2 - 25px)"
          }
        },
        "\uF02F \u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
      ),
      React.createElement("br", { style: { clear: "both" } })
    ));
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(props.data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

  return result;
}

var QuestionEditPage = function (_React$Component4) {
  _inherits(QuestionEditPage, _React$Component4);

  function QuestionEditPage(props) {
    _classCallCheck(this, QuestionEditPage);

    var _this10 = _possibleConstructorReturn(this, (QuestionEditPage.__proto__ || Object.getPrototypeOf(QuestionEditPage)).call(this, props));

    _this10.state = {
      data: _this10.props.data[_this10.props.title]
    };

    _this10.data = Object.assign({}, _this10.props.data);
    _this10.handleAnswerChange = _this10.handleAnswerChange.bind(_this10);
    _this10.handleTitleChange = _this10.handleTitleChange.bind(_this10);
    _this10.handleTab = _this10.handleTab.bind(_this10);
    _this10.addQuestion = _this10.addQuestion.bind(_this10);
    _this10.handleCorrect = _this10.handleCorrect.bind(_this10);
    _this10.handleDeleteQuestion = _this10.handleDeleteQuestion.bind(_this10);
    _this10.handleSubmit = _this10.handleSubmit.bind(_this10);
    return _this10;
  }

  _createClass(QuestionEditPage, [{
    key: "handleSubmit",
    value: function handleSubmit() {
      var _this11 = this;

      this.props.handleDialog.open(React.createElement(
        "div",
        { style: { fontSize: 20, marginBottom: 15 } },
        "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E2A\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \uFC70"
      ));
      Object.defineProperty(this.data, this.props.title, {
        value: Object.assign({}, this.state.data),
        writable: true
      });
      driveUpdate("question.json", this.data).then(function (res) {
        _this11.props.handleDialog.close(React.createElement(QuestionPage, { handleDialog: _this11.props.handleDialog }));
      });
    }
  }, {
    key: "handleDeleteQuestion",
    value: function handleDeleteQuestion(question_no) {
      var thisQuestion = Object.assign({}, this.state.data);
      for (i = question_no; i <= Object.keys(thisQuestion).length - 1; i++) {
        console.log(i, Object.keys(thisQuestion)[i]);
        Object.defineProperty(thisQuestion, i, Object.getOwnPropertyDescriptor(thisQuestion, Object.keys(thisQuestion)[i]));
      }
      var lastData = Object.keys(thisQuestion)[Object.keys(thisQuestion).length - 1];
      delete thisQuestion[lastData];
      this.setState({
        data: thisQuestion
      });
    }
  }, {
    key: "handleCorrect",
    value: function handleCorrect(question_no, choice) {
      var thisQuestion = Object.assign({}, this.state.data);
      thisQuestion[question_no]["correct"] = choice;
      this.setState({
        data: thisQuestion
      });
    }
  }, {
    key: "handleTab",
    value: function handleTab(question_no, choice, event) {
      if (event.key === "Tab" && Object.keys(this.state.data).length == question_no && choice == 4) {
        event.preventDefault();
        this.addQuestion();
      }
    }
  }, {
    key: "addQuestion",
    value: function addQuestion() {
      this.setState(function (state, props) {
        var data = Object.assign(state.data, _defineProperty({}, Object.keys(state.data).length + 1, {
          answer: { 1: "", 2: "", 3: "", 4: "" },
          correct: null,
          title: "New Question"
        }));
        return {
          data: data
        };
      });
    }
  }, {
    key: "handleAnswerChange",
    value: function handleAnswerChange(question_no, choice, event) {
      var thisQuestion = Object.assign({}, this.state.data);
      thisQuestion[question_no]["answer"][choice] = event.target.value;
      this.setState({
        data: thisQuestion
      });
    }
  }, {
    key: "handleTitleChange",
    value: function handleTitleChange(question_no, event) {
      var thisQuestion = Object.assign({}, this.state.data);
      thisQuestion[question_no]["title"] = event.target.value;
      this.setState({
        data: thisQuestion
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this12 = this;

      var examName = Object.keys(this.state.data);
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          {
            className: "dataBorder",
            style: { marginTop: 0, backgroundColor: "white", padding: 10 }
          },
          "\u0E02\u0E49\u0E2D\u0E2A\u0E2D\u0E1A ",
          this.props.title,
          " \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ",
          examName.length,
          " \u0E02\u0E49\u0E2D",
          React.createElement(
            "div",
            {
              onClick: this.handleSubmit,
              style: { marginTop: "-5px", borderRadius: 2 },
              className: "Button Primary"
            },
            "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01"
          ),
          React.createElement(
            "div",
            {
              onClick: function onClick() {
                if (_this12.props.data[_this12.props.title] != _this12.state.data) {
                  _this12.props.handleDialog.open(React.createElement(UnsaveExitConfirm, { handleDialog: _this12.props.handleDialog }));
                } else {
                  _this12.props.handleDialog.close(React.createElement(QuestionPage, { handleDialog: _this12.props.handleDialog }));
                }
              },
              style: { marginRight: 8, marginTop: "-5px", borderRadius: 2 },
              className: "Button Danger"
            },
            "\u0E22\u0E49\u0E2D\u0E19\u0E01\u0E25\u0E31\u0E1A"
          )
        ),
        examName.map(function (question_no) {
          var question = _this12.state.data[question_no];
          return React.createElement(
            "div",
            { className: "dataBorder", key: question_no },
            React.createElement(
              "div",
              { className: "questionTitle" },
              React.createElement(
                "div",
                { style: { width: 33, display: "inline-block" } },
                question_no,
                ".",
                " "
              ),
              React.createElement("textarea", {
                className: "questionTitleInput",
                onChange: function onChange() {
                  QuestionEditPage.resizeTextarea(event);
                  _this12.handleTitleChange(question_no, event);
                },
                onFocus: function onFocus() {
                  QuestionEditPage.resizeTextarea(event);
                },
                value: question["title"],
                autoFocus: true,
                placeholder: "\u0E04\u0E33\u0E16\u0E32\u0E21..."
              }),
              React.createElement(
                "div",
                {
                  onClick: function onClick() {
                    return _this12.handleDeleteQuestion(question_no);
                  },
                  className: "Button Danger OperateButton"
                },
                React.createElement(
                  "span",
                  null,
                  "\uF1F8"
                )
              )
            ),
            React.createElement(EditAnswer, {
              handleCorrect: _this12.handleCorrect,
              question: question,
              question_no: question_no,
              handleTab: _this12.handleTab,
              handleChange: _this12.handleAnswerChange
            })
          );
        }),
        React.createElement(
          "div",
          { onClick: this.addQuestion, id: "addGuide" },
          "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E33\u0E16\u0E32\u0E21 \u0E42\u0E14\u0E22\u0E01\u0E32\u0E23\u0E01\u0E14 Tab \u0E2B\u0E23\u0E37\u0E2D \u0E04\u0E25\u0E34\u0E4A\u0E01\u0E17\u0E35\u0E48\u0E19\u0E35\u0E48"
        )
      );
    }
  }], [{
    key: "resizeTextarea",
    value: function resizeTextarea(event) {
      event.target.style.height = "";
      event.target.style.height = event.target.scrollHeight + "px";
    }
  }]);

  return QuestionEditPage;
}(React.Component);

function EditAnswer(props) {
  return React.createElement(
    "ol",
    { className: "questionAnswer" },
    Object.keys(props.question["answer"]).map(function (choice) {
      return React.createElement(
        "li",
        { key: choice },
        React.createElement("textarea", {
          style: { width: "calc(100% - 50px)" },
          onChange: function onChange() {
            QuestionEditPage.resizeTextarea(event);
            props.handleChange(props.question_no, choice, event);
          },
          onFocus: function onFocus() {
            QuestionEditPage.resizeTextarea(event);
          },
          className: "questionInput",
          type: "text",
          value: props.question["answer"][choice],
          onKeyDown: function onKeyDown() {
            return props.handleTab(props.question_no, choice, event);
          },
          placeholder: "คำตอบข้อ " + props.question_no
        }),
        choice == props.question["correct"] ? React.createElement(
          "div",
          { className: "Button OperateButton CorrectButton Corrected" },
          React.createElement(
            "span",
            null,
            "\uF00C"
          )
        ) : React.createElement(
          "div",
          {
            onClick: function onClick() {
              props.handleCorrect(props.question_no, choice);
            },
            className: "Button OperateButton CorrectButton"
          },
          React.createElement(
            "span",
            null,
            "\uF10C"
          )
        )
      );
    })
  );
}

function UnsaveExitConfirm(props) {
  return React.createElement(
    "span",
    null,
    "\u0E21\u0E35\u0E01\u0E32\u0E23\u0E41\u0E01\u0E49\u0E44\u0E02\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01",
    React.createElement("br", null),
    React.createElement(
      "b",
      null,
      "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E17\u0E35\u0E48\u0E08\u0E30\u0E25\u0E30\u0E17\u0E34\u0E49\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 ?"
    ),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement("input", {
      className: "Button",
      type: "button",
      value: "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01",
      onClick: function onClick() {
        return props.handleDialog.close();
      }
    }),
    " ",
    React.createElement("input", {
      className: "Button Danger",
      type: "button",
      value: "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19",
      onClick: function onClick() {
        return props.handleDialog.close(React.createElement(QuestionPage, { handleDialog: props.handleDialog }));
      }
    })
  );
}

module.exports.QuestionPage = QuestionPage;