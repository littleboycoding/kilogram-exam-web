var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("../drive"),
    driveGet = _require.driveGet,
    driveUpdate = _require.driveUpdate;

var ResultPage = function (_React$Component) {
  _inherits(ResultPage, _React$Component);

  function ResultPage(props) {
    _classCallCheck(this, ResultPage);

    var _this = _possibleConstructorReturn(this, (ResultPage.__proto__ || Object.getPrototypeOf(ResultPage)).call(this, props));

    _this.state = {
      body: {}
    };
    return _this;
  }

  _createClass(ResultPage, [{
    key: "fetchData",
    value: function fetchData() {
      var _this2 = this;

      this.props.handleDialog.open(React.createElement(
        "div",
        { style: { fontSize: 20, marginBottom: 15 } },
        "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14 \uFC70"
      ));
      driveGet("result.json").then(function (res) {
        console.log(res);
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
    key: "render",
    value: function render() {
      var _this3 = this;

      var resultList = [];

      var _loop = function _loop(key) {
        var sum = 0;
        for (var keys in _this3.state.body[key]) {
          sum = sum + _this3.state.body[key][keys].totalScore;
        }
        var avg = sum / Object.keys(_this3.state.body[key]).length;
        var total = Object.keys(_this3.state.body[key]).length;
        var sortedScore = [];
        for (var sortHold in _this3.state.body[key]) {
          sortedScore.push(_this3.state.body[key][sortHold].totalScore);
        }
        sortedScore.sort(function (a, b) {
          return a - b;
        });

        resultList.push(React.createElement(
          "div",
          {
            style: {
              backgroundColor: "white",
              marginBottom: "10px",
              boxShadow: "0px 2px 1px 0px #ddd"
            },
            key: key
          },
          React.createElement(
            "div",
            {
              style: {
                backgroundColor: "#8ad10a",
                padding: "10px",
                color: "white",
                fontWeight: "bold"
              }
            },
            key
          ),
          " ",
          React.createElement(
            "div",
            { style: { padding: "10px" } },
            React.createElement(
              "span",
              { className: "resultBorder" },
              "\u0E1C\u0E39\u0E49\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E2D\u0E1A\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ",
              total,
              " \u0E04\u0E19"
            ),
            " ",
            React.createElement(
              "span",
              { className: "resultBorder" },
              "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ",
              avg
            ),
            " ",
            React.createElement(
              "span",
              { className: "resultBorder" },
              "\u0E04\u0E30\u0E41\u0E19\u0E19\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 ",
              sortedScore[sortedScore.length - 1]
            ),
            " ",
            React.createElement(
              "span",
              { className: "resultBorder" },
              "\u0E04\u0E30\u0E41\u0E19\u0E19\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14 ",
              sortedScore[0]
            ),
            " ",
            React.createElement(
              "button",
              {
                onClick: function onClick() {
                  return _this3.props.handleDialog.open(React.createElement(Marking, {
                    body: _this3.state.body[key],
                    handleDialog: _this3.props.handleDialog
                  }));
                },
                className: "Button Primary"
              },
              "\u0E14\u0E39\u0E01\u0E32\u0E23\u0E1D\u0E19"
            )
          )
        ));
      };

      for (var key in this.state.body) {
        _loop(key);
      }
      return React.createElement(
        "div",
        null,
        resultList
      );
    }
  }]);

  return ResultPage;
}(React.Component);

var Marking = function (_React$Component2) {
  _inherits(Marking, _React$Component2);

  function Marking(props) {
    _classCallCheck(this, Marking);

    return _possibleConstructorReturn(this, (Marking.__proto__ || Object.getPrototypeOf(Marking)).call(this, props));
  }

  _createClass(Marking, [{
    key: "render",
    value: function render() {
      var _this5 = this;

      var answerSheet = [];
      var markingResult = [];
      for (var key in this.props.body) {
        var body = this.props.body;
        body[key].marking.forEach(function (mark, index) {
          if (markingResult[index] == undefined) {
            markingResult[index] = { A: 0, B: 0, C: 0, D: 0, E: 0 };
          }
          markingResult[index][mark]++;
        });
      }
      console.log(markingResult);
      for (var i = 1; i <= 4; i++) {
        var totalAnswer = [];
        for (var x = i * 25 - 24; x <= i * 25; x++) {
          if (markingResult[x - 1] == undefined) {
            markingResult[x - 1] = { A: 0, B: 0, C: 0, D: 0, E: 0 };
          }
          var readyResult = markingResult[x - 1];
          totalAnswer.push(React.createElement(
            "tr",
            { className: "answerTable", key: x },
            React.createElement(
              "td",
              {
                style: {
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center"
                }
              },
              x
            ),
            React.createElement(
              "td",
              null,
              readyResult["A"] != 0 ? readyResult["A"] : ""
            ),
            React.createElement(
              "td",
              null,
              readyResult["B"] != 0 ? readyResult["B"] : ""
            ),
            React.createElement(
              "td",
              null,
              readyResult["C"] != 0 ? readyResult["C"] : ""
            ),
            React.createElement(
              "td",
              null,
              readyResult["D"] != 0 ? readyResult["D"] : ""
            ),
            React.createElement(
              "td",
              null,
              readyResult["E"] != 0 ? readyResult["E"] : ""
            )
          ));
        }
        answerSheet.push(React.createElement(
          "table",
          {
            style: {
              width: "130px",
              float: "left",
              fontSize: "13px"
            },
            key: i
          },
          React.createElement(
            "tr",
            null,
            React.createElement("th", null),
            React.createElement(
              "td",
              null,
              "\u0E01"
            ),
            React.createElement(
              "td",
              null,
              "\u0E02"
            ),
            React.createElement(
              "td",
              null,
              "\u0E04"
            ),
            React.createElement(
              "td",
              null,
              "\u0E07"
            ),
            React.createElement(
              "td",
              null,
              "\u0E05"
            )
          ),
          totalAnswer
        ));
      }
      return React.createElement(
        "div",
        { onClick: function onClick() {
            return _this5.props.handleDialog.close();
          } },
        answerSheet
      );
    }
  }]);

  return Marking;
}(React.Component);

module.exports.ResultPage = ResultPage;