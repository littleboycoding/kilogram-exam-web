var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { driveGet, driveUpdate } from "../drive.js";
var choiceName = ["", "A", "B", "C", "D", "E"];

export var ResultPage = function (_React$Component) {
  _inherits(ResultPage, _React$Component);

  function ResultPage(props) {
    _classCallCheck(this, ResultPage);

    var _this = _possibleConstructorReturn(this, (ResultPage.__proto__ || Object.getPrototypeOf(ResultPage)).call(this, props));

    _this.state = {
      body: {},
      question: {}
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
        driveGet("question.json").then(function (ques) {
          _this2.setState({
            body: res,
            question: Object.keys(ques).reduce(function (total, map) {
              return Object.assign(total, _defineProperty({}, map, Object.keys(ques[map]).map(function (no) {
                return ques[map][no]["correct"];
              })));
            }, {})
          });
          _this2.props.handleDialog.close();
        });
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
      var sortBody = {};

      var _loop = function _loop(key) {
        var sum = 0;
        for (var keys in _this3.state.body[key]) {
          sum = sum + _this3.state.body[key][keys].totalScore;
        }
        sortBody = _defineProperty({}, key, Object.keys(_this3.state.body[key]));
        sortBody[key] = sortBody[key].sort(function (a, b) {
          return _this3.state.body[key][b].totalScore - _this3.state.body[key][a].totalScore;
        });
        var avg = Math.round(sum / Object.keys(_this3.state.body[key]).length * 100) / 100;
        var total = Object.keys(_this3.state.body[key]).length;
        var sortedScore = [];
        for (var sortHold in _this3.state.body[key]) {
          sortedScore.push(_this3.state.body[key][sortHold].totalScore);
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
          body: _this3.state.body,
          question: _this3.state.question,
          handleDialog: _this3.props.handleDialog
        }));
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

var ResultCard = function (_React$Component2) {
  _inherits(ResultCard, _React$Component2);

  function ResultCard(props) {
    _classCallCheck(this, ResultCard);

    var _this4 = _possibleConstructorReturn(this, (ResultCard.__proto__ || Object.getPrototypeOf(ResultCard)).call(this, props));

    _this4.state = {
      shown: false,
      body: _this4.props.body[_this4.props.title],
      question: {},
      room: ""
    };

    _this4.handleClick = _this4.handleClick.bind(_this4);
    _this4.handleChange = _this4.handleChange.bind(_this4);
    _this4.handlePrint = _this4.handlePrint.bind(_this4);
    return _this4;
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
      var _this5 = this;

      this.props.handleDialog.open(React.createElement(
        "h3",
        null,
        "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E1B\u0E23\u0E30\u0E21\u0E27\u0E25\u0E1C\u0E25"
      ));
      var doc = new jsPDF();
      var win = window.open("");
      var resultStudent = Object.keys(this.state.body).filter(function (filter) {
        return _this5.state.room == "" ? true : _this5.state.body[filter].room == _this5.state.room;
      }).reduce(function (total, value) {
        return total + "<tr><td>" + value + "</td><td>" + _this5.state.body[value].room + "</td><td style=\"text-align: right;\">" + _this5.state.body[value].totalScore + "</td></tr>";
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
        _this5.props.handleDialog.close();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

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
          "\uFAF3 ",
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
                return _this6.props.handleDialog.open(React.createElement(Marking, {
                  body: _this6.props.body[_this6.props.title],
                  handleDialog: _this6.props.handleDialog,
                  question: _this6.props.question,
                  title: _this6.props.title
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
              " พิมพ์รายงาน"
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
                  return _this6.state.room == "" ? true : _this6.state.body[filter].room == _this6.state.room;
                }).sort(function (a, b) {
                  return _this6.state.body[a].totalScore - _this6.state.body[b].totalScore;
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
                      _this6.state.body[map].room
                    ),
                    React.createElement(
                      "td",
                      { style: { textAlign: "right" } },
                      _this6.state.body[map].totalScore
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
      var _this8 = this;

      var groupHalf = Math.round(Object.keys(this.props.body).length / 2) - 1;
      var bottomGroup = Object.keys(this.props.body).sort(function (a, b) {
        return _this8.props.body[b]["totalScore"] - _this8.props.body[a]["totalScore"];
      }).splice(0, groupHalf);
      var upperGroup = Object.keys(this.props.body).sort(function (a, b) {
        return _this8.props.body[b]["totalScore"] - _this8.props.body[a]["totalScore"];
      }).splice(groupHalf, Object.keys(this.props.body).length);

      /*
      let upperTotal = upperGroup.map(
        map =>
          this.props.body[map]["marking"].filter((filter, index) => {
            console.log(
              "Upper : ",
              index,
              map,
              filter,
              choiceName[this.props.question[this.props.title][index]]
            );
            return (
              filter == choiceName[this.props.question[this.props.title][index]]
            );
          }).length
      );
       let bottomTotal = bottomGroup.map(
        map =>
          this.props.body[map]["marking"].filter((filter, index) => {
            console.log(
              "Bottom : ",
              index,
              map,
              filter,
              choiceName[this.props.question[this.props.title][index]]
            );
            return (
              filter == choiceName[this.props.question[this.props.title][index]]
            );
          }).length
      );
      */
      var bottomTotal = [],
          upperTotal = [];
      var question = this.props.question[this.props.title];

      question.forEach(function (each, index) {
        bottomTotal.push(bottomGroup.filter(function (filter) {
          return _this8.props.body[filter]["marking"][index] == choiceName[_this8.props.question[_this8.props.title][index]];
        }).length);

        upperTotal.push(upperGroup.filter(function (filter) {
          return _this8.props.body[filter]["marking"][index] == choiceName[_this8.props.question[_this8.props.title][index]];
        }).length);
      });
      console.log(this.props.question);

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
          var dif = void 0;
          if (bottomTotal.length > 0 && upperTotal.length > 0 && bottomGroup.length > 0 && upperGroup.length > 0) {
            dif = Object.keys(this.props.question[this.props.title])[x - 1] ? Math.round((bottomTotal[x - 1] / bottomGroup.length - upperTotal[x - 1] / upperGroup.length) * 10) / 10 : "";
          } else {
            dif = "";
          }

          console.log(dif);
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
            ),
            React.createElement(
              "td",
              {
                title: "\u0E04\u0E48\u0E32\u0E2D\u0E33\u0E19\u0E32\u0E08\u0E08\u0E33\u0E41\u0E19\u0E01",
                style: {
                  backgroundColor: dif >= 0.4 ? "rgba(0, 255, 0, 0.2)" : typeof dif == "string" ? "" : "rgba(255, 0, 0, 0.2)"
                }
              },
              dif
            )
          ));
        }
        answerSheet.push(React.createElement(
          "table",
          {
            style: {
              width: "150px",
              display: "inline-block",
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
              "\u0E08"
            ),
            React.createElement(
              "td",
              null,
              "r"
            )
          ),
          totalAnswer
        ));
      }
      return React.createElement(
        "div",
        {
          style: { whiteSpace: "nowrap" },
          onClick: function onClick() {
            return _this8.props.handleDialog.close();
          }
        },
        answerSheet
      );
    }
  }]);

  return Marking;
}(React.Component);