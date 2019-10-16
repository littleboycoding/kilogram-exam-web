var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuestionForm = function (_React$Component) {
  _inherits(QuestionForm, _React$Component);

  function QuestionForm(props) {
    _classCallCheck(this, QuestionForm);

    var _this = _possibleConstructorReturn(this, (QuestionForm.__proto__ || Object.getPrototypeOf(QuestionForm)).call(this, props));

    _this.state = {
      value: "ข้อสอบใหม่",
      loading: false
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(QuestionForm, [{
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
              value: "\u0E1B\u0E34\u0E14",
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

  return QuestionForm;
}(React.Component);

function QuestionPage(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      {
        className: "Button Primary",
        onClick: function onClick() {
          return props.handleDialog.open(React.createElement(QuestionForm, { handleDialog: props.handleDialog }));
        }
      },
      "\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E02\u0E49\u0E2D\u0E2A\u0E2D\u0E1A\u0E43\u0E2B\u0E21\u0E48"
    )
  );
}

function QuestionEdit(props) {
  return props.value;
}

module.exports.QuestionPage = QuestionPage;