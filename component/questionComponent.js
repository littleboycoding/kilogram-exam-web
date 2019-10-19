var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("../drive"),
    driveGet = _require.driveGet;

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
      this.setState({ loading: true });
      //this.props.handleDialog.close(<QuestionEdit value={this.state.value} />);
      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

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
                return _this2.props.handleDialog.close();
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

var QuestionPage = function (_React$Component2) {
  _inherits(QuestionPage, _React$Component2);

  function QuestionPage(props) {
    _classCallCheck(this, QuestionPage);

    var _this3 = _possibleConstructorReturn(this, (QuestionPage.__proto__ || Object.getPrototypeOf(QuestionPage)).call(this, props));

    _this3.state = {
      data: ""
    };
    return _this3;
  }

  _createClass(QuestionPage, [{
    key: "fetchData",
    value: function fetchData() {
      var _this4 = this;

      driveGet("question.json").then(function (res) {
        _this4.setState({ data: res });
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchData();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          {
            style: { display: "inline-block" },
            className: "Button Primary",
            onClick: function onClick() {
              return _this5.props.handleDialog.open(React.createElement(CreateNewQuestion, { handleDialog: _this5.props.handleDialog }));
            }
          },
          "\uF719 \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E02\u0E49\u0E2D\u0E2A\u0E2D\u0E1A\u0E43\u0E2B\u0E21\u0E48"
        ),
        React.createElement(QuestionListPage, {
          data: this.state.data,
          handleDialog: this.props.handleDialog
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
        { className: "Button Danger", style: { width: "50px" } },
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

var QuestionEditPage = function (_React$Component3) {
  _inherits(QuestionEditPage, _React$Component3);

  function QuestionEditPage(props) {
    _classCallCheck(this, QuestionEditPage);

    var _this6 = _possibleConstructorReturn(this, (QuestionEditPage.__proto__ || Object.getPrototypeOf(QuestionEditPage)).call(this, props));

    _this6.state = {
      data: _this6.props.data[_this6.props.title]
    };

    _this6.handleAnswerChange = _this6.handleAnswerChange.bind(_this6);
    _this6.handleTitleChange = _this6.handleTitleChange.bind(_this6);
    _this6.handleTab = _this6.handleTab.bind(_this6);
    _this6.addQuestion = _this6.addQuestion.bind(_this6);
    return _this6;
  }

  _createClass(QuestionEditPage, [{
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
      var _this7 = this;

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
              style: { marginTop: "-5px", borderRadius: 2 },
              className: "Button Primary"
            },
            "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01"
          ),
          React.createElement(
            "div",
            {
              onClick: function onClick() {
                if (_this7.props.data[_this7.props.title] != _this7.state.data) {
                  _this7.props.handleDialog.open(React.createElement(UnsaveExitConfirm, { handleDialog: _this7.props.handleDialog }));
                } else {
                  _this7.props.handleDialog.close(React.createElement(QuestionPage, { handleDialog: _this7.props.handleDialog }));
                }
              },
              style: { marginRight: 8, marginTop: "-5px", borderRadius: 2 },
              className: "Button Danger"
            },
            "\u0E22\u0E49\u0E2D\u0E19\u0E01\u0E25\u0E31\u0E1A"
          )
        ),
        examName.map(function (question_no) {
          var question = _this7.state.data[question_no];
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
              React.createElement("input", {
                className: "questionTitleInput",
                value: question["title"],
                onChange: function onChange() {
                  return _this7.handleTitleChange(question_no, event);
                },
                autoFocus: true,
                placeholder: "\u0E04\u0E33\u0E16\u0E32\u0E21..."
              }),
              React.createElement(
                "div",
                { className: "Button Danger OperateButton" },
                React.createElement(
                  "span",
                  null,
                  "\uF1F8"
                )
              )
            ),
            React.createElement(EditAnswer, {
              question: question,
              question_no: question_no,
              handleTab: _this7.handleTab,
              handleChange: _this7.handleAnswerChange
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
  }]);

  return QuestionEditPage;
}(React.Component);

function EditAnswer(props) {
  console.log(props.question);
  return React.createElement(
    "ol",
    { className: "questionAnswer" },
    Object.keys(props.question["answer"]).map(function (choice) {
      return React.createElement(
        "li",
        { key: choice },
        React.createElement("input", {
          style: { width: "calc(100% - 50px)" },
          onChange: function onChange() {
            return props.handleChange(props.question_no, choice, event);
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
          { className: "Button OperateButton CorrectButton" },
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