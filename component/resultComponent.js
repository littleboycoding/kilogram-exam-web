var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { driveGet, driveUpdate } from "../drive.js";

export var ResultPage = function (_React$Component) {
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
      var resultList = [];
      for (var key in this.state.body) {
        var sum = 0;
        for (var keys in this.state.body[key]) {
          sum = sum + this.state.body[key][keys].totalScore;
        }
        var avg = sum / Object.keys(this.state.body[key]).length;
        var total = Object.keys(this.state.body[key]).length;
        var sortedScore = [];
        for (var sortHold in this.state.body[key]) {
          sortedScore.push(this.state.body[key][sortHold].totalScore);
        }
        sortedScore.sort(function (a, b) {
          return a - b;
        });

        resultList.push(React.createElement(ResultCard, {
          avg: avg,
          total: total,
          sum: sum,
          max: sortedScore[sortedScore.length - 1],
          min: sortedScore[0],
          key: key,
          title: key,
          body: this.state.body,
          handleDialog: this.props.handleDialog
        }));
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

var ResultCard = function (_React$Component2) {
  _inherits(ResultCard, _React$Component2);

  function ResultCard(props) {
    _classCallCheck(this, ResultCard);

    var _this3 = _possibleConstructorReturn(this, (ResultCard.__proto__ || Object.getPrototypeOf(ResultCard)).call(this, props));

    _this3.state = {
      shown: false,
      body: _this3.props.body[_this3.props.title],
      room: ""
    };

    _this3.handleClick = _this3.handleClick.bind(_this3);
    _this3.handleChange = _this3.handleChange.bind(_this3);
    _this3.handlePrint = _this3.handlePrint.bind(_this3);
    return _this3;
  }

  _createClass(ResultCard, [{
    key: "handleClick",
    value: function handleClick() {
      this.setState({
        shown: !this.state.shown
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({
        room: event.target.value
      });
    }
  }, {
    key: "handlePrint",
    value: function handlePrint() {
      var _this4 = this;

      this.props.handleDialog.open(React.createElement(
        "h3",
        null,
        "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E1B\u0E23\u0E30\u0E21\u0E27\u0E25\u0E1C\u0E25"
      ));
      var doc = new jsPDF();
      var win = window.open("");
      var resultStudent = Object.keys(this.state.body).filter(function (filter) {
        return _this4.state.room == "" ? true : _this4.state.body[filter].room == _this4.state.room;
      }).reduce(function (total, value) {
        return total + "<tr><td>" + value + "</td><td>" + _this4.state.body[value].room + "</td><td style=\"text-align: right;\">" + _this4.state.body[value].totalScore + "</td></tr>";
      }, "<tr><th>ชื่อ-นามสกุล</th><th>กลุ่ม</th><th>คะแนนที่ได้</th></tr>");
      var resultOutput = "\n    <title>\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E2A\u0E2D\u0E1A - " + this.props.title + "</title>\n    <meta charset=\"UTF-8\"/>\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"style/resultStyle.css\" />\n    <body style=\"margin: 0px; overflow: hidden;\">\n\t<div id=\"pdf_capture\" style=\"margin: 40px\">\n\t\t<h2>\u0E2A\u0E23\u0E38\u0E1B\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E2A\u0E2D\u0E1A - " + this.props.title + "</h2>\n\t\t<div style=\"display: inline-block;\">\n\t\t<p>\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E2D\u0E1A " + this.props.total + " | \u0E04\u0E30\u0E41\u0E19\u0E19\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 " + this.props.max + " | \u0E04\u0E30\u0E41\u0E19\u0E19\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14 " + this.props.min + " | \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 " + this.props.avg + " \u0E04\u0E30\u0E41\u0E19\u0E19</p>\n\t\t</div><br/>\n\t\t<table class=\"resultStudent\">\n\t\t\t" + resultStudent + "\n\t\t</table>\n\t</div>\n\t<iframe id=\"pdf\" frameborder=\"none\" width=\"100%\" height=\"100%\"></iframe>\n    </body>";

      win.document.write(resultOutput);
      html2canvas(win.document.body, { windowWidth: 2480, width: 2480 }).then(function (canvas) {
        var doc = win.document;
        var pdf = new jsPDF();
        pdf.addImage(canvas, "JPEG", 0, 0);
        doc.getElementById("pdf").src = pdf.output("dataurlstring", {
          filename: "report.pdf"
        });
        doc.getElementById("pdf_capture").style.display = "none";
        _this4.props.handleDialog.close();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement(
        "div",
        {
          style: {
            backgroundColor: "white",
            marginBottom: "10px",
            boxShadow: "0px 2px 1px 0px #ddd"
          }
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
          this.props.title
        ),
        " ",
        React.createElement(
          "div",
          { style: { position: "relative", padding: "10px" } },
          React.createElement(
            "span",
            { className: "resultBorder" },
            "\u0E1C\u0E39\u0E49\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E2D\u0E1A\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ",
            this.props.total,
            " \u0E04\u0E19"
          ),
          " ",
          React.createElement(
            "span",
            { className: "resultBorder" },
            "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ",
            this.props.avg
          ),
          " ",
          React.createElement(
            "span",
            { className: "resultBorder" },
            "\u0E04\u0E30\u0E41\u0E19\u0E19\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 ",
            this.props.max
          ),
          " ",
          React.createElement(
            "span",
            { className: "resultBorder" },
            "\u0E04\u0E30\u0E41\u0E19\u0E19\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14 ",
            this.props.min
          ),
          " ",
          React.createElement(
            "button",
            {
              onClick: function onClick() {
                return _this5.props.handleDialog.open(React.createElement(Marking, {
                  body: _this5.props.body[_this5.props.title],
                  handleDialog: _this5.props.handleDialog
                }));
              },
              className: "Button Primary"
            },
            "\u0E14\u0E39\u0E01\u0E32\u0E23\u0E1D\u0E19"
          ),
          React.createElement(
            "div",
            {
              onClick: this.handleClick,
              className: "hover",
              style: {
                position: "absolute",
                right: "20px",
                top: "25px",
                transform: "translateY(-50%)",
                fontSize: "28px"
              }
            },
            "\u2195"
          ),
          this.state.shown ? React.createElement(
            "div",
            { className: "resultControl" },
            React.createElement("br", null),
            React.createElement(
              "span",
              { style: { float: "left" } },
              React.createElement(
                "span",
                { style: { display: "inline-block", marginRight: "15px" } },
                "\uF0C0"
              ),
              "\u0E01\u0E25\u0E38\u0E48\u0E21",
              React.createElement(
                "select",
                {
                  onChange: this.handleChange,
                  style: {
                    marginLeft: "8px",
                    padding: "5px",
                    paddingBottom: "9px",
                    border: "1px solid #CCC",
                    backgroundColor: "white"
                  }
                },
                React.createElement(
                  "option",
                  { value: "" },
                  "\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
                ),
                React.createElement(DistinctList, { body: this.state.body })
              )
            ),
            React.createElement(
              "button",
              {
                onClick: this.handlePrint,
                style: { float: "right" },
                className: "Button Secondary"
              },
              "พิมพ์รายงาน"
            ),
            React.createElement("br", { style: { clear: "both" } }),
            React.createElement(
              "table",
              {
                className: "resultTable",
                style: { width: "100%", marginTop: "10px" }
              },
              React.createElement(
                "thead",
                null,
                React.createElement(
                  "tr",
                  null,
                  React.createElement(
                    "th",
                    { style: { width: "70%" } },
                    "\u0E0A\u0E37\u0E48\u0E2D\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19"
                  ),
                  React.createElement(
                    "th",
                    { style: { width: "15%" } },
                    "\u0E01\u0E25\u0E38\u0E48\u0E21"
                  ),
                  React.createElement(
                    "th",
                    { style: { width: "15%" } },
                    "\u0E04\u0E30\u0E41\u0E19\u0E19"
                  )
                )
              ),
              React.createElement(
                "tbody",
                null,
                Object.keys(this.state.body).filter(function (filter) {
                  return _this5.state.room == "" ? true : _this5.state.body[filter].room == _this5.state.room;
                }).sort(function (a, b) {
                  return _this5.state.body[a].totalScore - _this5.state.body[b].totalScore;
                }).map(function (map) {
                  return React.createElement(
                    "tr",
                    { key: map },
                    React.createElement(
                      "td",
                      null,
                      map + " "
                    ),
                    React.createElement(
                      "td",
                      null,
                      _this5.state.body[map].room
                    ),
                    React.createElement(
                      "td",
                      { style: { textAlign: "right" } },
                      _this5.state.body[map].totalScore
                    )
                  );
                })
              )
            )
          ) : null
        )
      );
    }
  }]);

  return ResultCard;
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

var Marking = function (_React$Component3) {
  _inherits(Marking, _React$Component3);

  function Marking(props) {
    _classCallCheck(this, Marking);

    return _possibleConstructorReturn(this, (Marking.__proto__ || Object.getPrototypeOf(Marking)).call(this, props));
  }

  _createClass(Marking, [{
    key: "render",
    value: function render() {
      var _this7 = this;

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
            return _this7.props.handleDialog.close();
          } },
        answerSheet
      );
    }
  }]);

  return Marking;
}(React.Component);