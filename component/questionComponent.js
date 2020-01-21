var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { driveGet, driveUpdate } from "../drive.js";
var markName = { 1: "ก", 2: "ข", 3: "ค", 4: "ง", 5: "จ" };

var CreateNewQuestion = function (_React$Component) {
  _inherits(CreateNewQuestion, _React$Component);

  function CreateNewQuestion(props) {
    _classCallCheck(this, CreateNewQuestion);

    var _this = _possibleConstructorReturn(this, (CreateNewQuestion.__proto__ || Object.getPrototypeOf(CreateNewQuestion)).call(this, props));

    _this.state = {
      value: "",
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

      if (this.data[this.state.value] == undefined) {
        this.setState({ loading: true });

        this.data[this.state.value] = {};

        driveUpdate("question.json", this.data).then(function (res) {
          _this2.props.handleDialog.close(React.createElement(QuestionPage, { handleDialog: _this2.props.handleDialog }));
        });
      } else {
        this.props.handleDialog.open(React.createElement(
          "div",
          { style: { fontSize: 18, marginBottom: 15 } },
          "\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E2A\u0E2D\u0E1A\u0E0A\u0E37\u0E48\u0E2D\u0E19\u0E35\u0E49\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27 \u0E42\u0E1B\u0E23\u0E14\u0E43\u0E0A\u0E49\u0E0A\u0E37\u0E48\u0E2D\u0E2D\u0E37\u0E48\u0E19",
          React.createElement("br", null),
          React.createElement("br", null),
          React.createElement(
            "button",
            {
              className: "Button",
              onClick: function onClick() {
                return _this2.props.handleDialog.close();
              }
            },
            "\u0E15\u0E01\u0E25\u0E07"
          )
        ));
      }

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
              required: "true",
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
        driveGet("result.json").then(function (res) {
          console.log(res, _this5.props.title);
          var finalResult = res;
          if (finalResult != false && finalResult[_this5.props.title] && Object.keys(finalResult).length > 0) {
            delete finalResult[_this5.props.title];
            driveUpdate("result.json", finalResult).then(function (res) {
              _this5.props.handleDialog.close();
            });
          } else {
            _this5.props.handleDialog.close();
          }
        });
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

export var QuestionPage = function (_React$Component3) {
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

      this.props.handleDialog.open(React.createElement(
        "div",
        { style: { fontSize: 20, marginBottom: 15 } },
        "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14 \uFC70"
      ));

      driveGet("question.json").then(function (res) {
        _this8.setState({ data: res });
        _this8.props.handleDialog.close();
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
          onClick: function onClick() {
            return questionPrint(props.data[key]);
          },
          style: {
            width: "calc(100% / 2 - 25px)",
            borderLeft: "1px solid #CCC"
          },
          className: "Button"
        },
        "\uF02F \u0E1E\u0E34\u0E21\u0E1E\u0E4C"
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
        "\uF044 \u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
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
    _this10.addFile = _this10.addFile.bind(_this10);
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
      for (var i = question_no; i <= Object.keys(thisQuestion).length - 1; i++) {
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
      if (event.key === "Tab" && Object.keys(this.state.data).length == question_no && choice == 5) {
        event.preventDefault();
        this.addQuestion();
      }
    }
  }, {
    key: "addQuestion",
    value: function addQuestion() {
      this.setState(function (state, props) {
        var data = Object.assign(state.data, _defineProperty({}, Object.keys(state.data).length + 1, {
          answer: { 1: "", 2: "", 3: "", 4: "", 5: "" },
          correct: null,
          title: "New Question",
          choice_img: { 1: "", 2: "", 3: "", 4: "", 5: "" },
          question_img: ""
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
    key: "addFile",
    value: function addFile(event, question_no, choice) {
      var _this12 = this;

      var reader = new FileReader();
      reader.onload = function (e) {
        var thisQuestion = Object.assign({}, _this12.state.data);
        if (choice) {
          thisQuestion[question_no]["choice_img"][choice] = e.target.result;
        } else {
          thisQuestion[question_no]["question_img"] = e.target.result;
        }
        _this12.setState({
          data: thisQuestion
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }, {
    key: "render",
    value: function render() {
      var _this13 = this;

      var examName = Object.keys(this.state.data);
      return React.createElement(
        "div",
        null,
        React.createElement("input", {
          type: "file",
          id: "image",
          accept: "image/*",
          style: { display: "none" }
        }),
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
                if (_this13.props.data[_this13.props.title] != _this13.state.data) {
                  _this13.props.handleDialog.open(React.createElement(UnsaveExitConfirm, { handleDialog: _this13.props.handleDialog }));
                } else {
                  _this13.props.handleDialog.close(React.createElement(QuestionPage, { handleDialog: _this13.props.handleDialog }));
                }
              },
              style: { marginRight: 8, marginTop: "-5px", borderRadius: 2 },
              className: "Button Danger"
            },
            "\u0E22\u0E49\u0E2D\u0E19\u0E01\u0E25\u0E31\u0E1A"
          )
        ),
        examName.map(function (question_no) {
          var question = _this13.state.data[question_no];
          return React.createElement(
            "div",
            { className: "dataBorder", key: question_no },
            React.createElement(
              "div",
              { className: "questionTitle", style: { position: "relative" } },
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
                  _this13.handleTitleChange(question_no, event);
                },
                onFocus: function onFocus() {
                  QuestionEditPage.resizeTextarea(event);
                },
                value: question["title"],
                autoFocus: true,
                placeholder: "\u0E04\u0E33\u0E16\u0E32\u0E21..."
              }),
              React.createElement("input", {
                type: "file",
                id: "questionImg" + question_no,
                onInput: function onInput() {
                  return _this13.addFile(event, question_no);
                },
                style: { display: "none" }
              }),
              React.createElement(
                "div",
                {
                  onClick: function onClick() {
                    if (question["question_img"] == "") {
                      document.getElementById("questionImg" + question_no).click();
                    } else {
                      var thisQuestion = Object.assign({}, _this13.state.data);
                      thisQuestion[question_no]["question_img"] = "";
                      _this13.setState({
                        data: thisQuestion
                      });
                    }
                  },
                  className: "Button AddImage",
                  style: { right: "60px" }
                },
                React.createElement("img", {
                  style: {
                    position: "absolute",
                    right: "0",
                    top: "0",
                    width: "41px",
                    height: "41px",
                    objectFit: "contain",
                    display: question["question_img"] != "" ? "block" : "none"
                  },
                  src: question["question_img"]
                }),
                React.createElement(
                  "span",
                  null,
                  "\uF1C5"
                )
              ),
              React.createElement(
                "div",
                {
                  onClick: function onClick() {
                    return _this13.handleDeleteQuestion(question_no);
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
              handleCorrect: _this13.handleCorrect,
              question: question,
              question_no: question_no,
              handleTab: _this13.handleTab,
              handleChange: _this13.handleAnswerChange,
              addFile: _this13.addFile,
              data: _this13.state.data,
              removeImg: _this13.setState.bind(_this13)
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
        { style: { position: "relative" }, key: choice },
        React.createElement("input", {
          type: "file",
          onInput: function onInput() {
            return props.addFile(event, props.question_no, choice);
          },
          style: { display: "none" },
          id: "file" + props.question_no + choice,
          accept: "image/*"
        }),
        React.createElement("textarea", {
          style: { width: "calc(100% - 90px)" },
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
        React.createElement(
          "div",
          {
            onClick: function onClick() {
              if (props.data[props.question_no]["choice_img"][choice] == "") {
                document.getElementById("file" + props.question_no + choice).click();
              } else {
                var thisQuestion = Object.assign({}, props.data);
                thisQuestion[props.question_no]["choice_img"][choice] = "";
                props.removeImg({
                  data: thisQuestion
                });
              }
            },
            className: "Button AddImage"
          },
          React.createElement("img", {
            id: "img" + props.question_no + choice,
            style: {
              position: "absolute",
              right: "0",
              top: "0",
              width: "41px",
              height: "41px",
              objectFit: "contain",
              display: props.question["choice_img"][choice] != "" ? "block" : "none"
            },
            src: props.question["choice_img"][choice]
          }),
          React.createElement(
            "span",
            null,
            "\uF1C5"
          )
        ),
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

function questionPrint(data) {
  var dataListed = Object.keys(data);
  var htmlResult = dataListed.map(function (map) {
    //return data[map]["title"] + data[map]["answer"];
    return (data[map]["question_img"] ? "<img style='margin-top: 15px; width: 100%; max-height: 230px; background-color: #FAFAFA; object-fit: contain;' src='" + data[map]["question_img"] + "' />" : "") + "<p>" + map + ". " + data[map]["title"] + "</p>" + Object.keys(data[map]["answer"]).map(function (maps) {
      return data[map]["answer"][maps] ? "<div style='margin-bottom: 10px; width: 50%; float: left;'>" + markName[maps] + ". " + data[map]["answer"][maps] + "" + (data[map]["choice_img"][maps] ? "<br /><img src='" + data[map]["choice_img"][maps] + "' style='max-height: 100px;' /></div>" : "</div>") : "";
    }).join("") + "<br style='clear: both;' />";
  });

  var printWindow = window.open("", "printWindow");

  printWindow.document.write("<body><style>.editable { border-bottom: 1px dashed #AAA; padding-bottom: 5px; } .img:hover { opacity: 0.2; cursor: pointer; } @media print { body { margin: 15mm 15mm 15mm 15mm; } button { display: none !important; } .editable { border: none !important; padding: none !important; }</style><title>\u0E1B\u0E23\u0E34\u0E49\u0E19\u0E41\u0E1A\u0E1A\u0E17\u0E14\u0E2A\u0E2D\u0E1A</title><h2 class='editable' contenteditable='true'><input type='file' oninput='change_img(event)' style='display: none;' id='file' accept='image/*'><img class='img' onclick=\"document.getElementById('file').click()\" src='favicon.png' style='vertical-align: middle; height: 45px;'/> \u0E1A\u0E17\u0E17\u0E14\u0E2A\u0E2D\u0E1A</h2><p class='editable' contenteditable='true'><b>\u0E04\u0E33\u0E0A\u0E35\u0E49\u0E41\u0E08\u0E49\u0E07</b> \u0E08\u0E07\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E04\u0E33\u0E15\u0E2D\u0E1A\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14</p><button onClick='print()'>\u0E1E\u0E34\u0E21\u0E1E\u0E4C</button><hr>" + htmlResult.join("<hr >") + "\n\t<script>\n\t\tfunction change_img(e) {\n\t\t\tlet target = e.target.files[0];\n\t\t\tlet reader = new FileReader;\n\n\t\t\treader.onload = e => {\n\t\t\t\tdocument.getElementsByClassName('img')[0].src = e.target.result;\n\t\t\t}\n\n\t\t\treader.readAsDataURL(target);\n\t\t}\n\t</script>\n\t  </body>");
}