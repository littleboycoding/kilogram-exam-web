import { driveGet, driveUpdate } from "../drive.js";
var choiceName = ["", "A", "B", "C", "D", "E"];

export class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: {},
      question: {}
    };
  }

  fetchData() {
    this.props.handleDialog.open(
      <div style={{ fontSize: 20, marginBottom: 15 }}>กำลังโหลด ﱰ</div>
    );
    driveGet("result.json").then(res => {
      driveGet("question.json").then(ques => {
        this.setState({
          body: res,
          question: Object.keys(ques).reduce(
            (total, map) =>
              Object.assign(total, {
                [map]: Object.keys(ques[map]).map(
                  no => ques[map][no]["correct"]
                )
              }),
            {}
          )
        });
        this.props.handleDialog.close();
      });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let resultList = [];
    let sortBody = {};
    for (const key in this.state.body) {
      let sum = 0;
      for (const keys in this.state.body[key]) {
        sum = sum + this.state.body[key][keys].totalScore;
      }
      sortBody = { [key]: Object.keys(this.state.body[key]) };
      sortBody[key] = sortBody[key].sort(
        (a, b) =>
          this.state.body[key][b].totalScore -
          this.state.body[key][a].totalScore
      );
      let avg =
        Math.round((sum / Object.keys(this.state.body[key]).length) * 100) /
        100;
      let total = Object.keys(this.state.body[key]).length;
      let sortedScore = [];
      for (const sortHold in this.state.body[key]) {
        sortedScore.push(this.state.body[key][sortHold].totalScore);
      }
      sortedScore.sort((a, b) => a - b);

      resultList.push(
        <ResultCard
          avg={avg}
          total={total}
          sum={sum}
          max={sortedScore[sortedScore.length - 1]}
          min={sortedScore[0]}
          key={key}
          title={key}
          body={this.state.body}
          question={this.state.question}
          handleDialog={this.props.handleDialog}
        />
      );
    }
    return <div>{resultList}</div>;
  }
}

class ResultCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      body: this.props.body[this.props.title],
      question: {},
      room: ""
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
  }

  handleClick() {
    this.setState({
      shown: !this.state.shown
    });
  }

  handleChange(event) {
    this.setState({
      room: event.target.value
    });
  }

  handlePrint() {
    this.props.handleDialog.open(<h3>กำลังประมวลผล</h3>);
    const doc = new jsPDF();
    let win = window.open("");
    let resultStudent = Object.keys(this.state.body)
      .filter(filter =>
        this.state.room == ""
          ? true
          : this.state.body[filter].room == this.state.room
      )
      .reduce((total, value) => {
        return `${total}<tr><td>${value}</td><td>${this.state.body[value].room}</td><td style="text-align: right;">${this.state.body[value].totalScore}</td></tr>`;
      }, "<tr><th>ชื่อ-นามสกุล</th><th>กลุ่ม</th><th>คะแนนที่ได้</th></tr>");
    let resultOutput = `
    <title>รายงานผลการสอบ - ${this.props.title}</title>
    <meta charset="UTF-8"/>
    <link rel="stylesheet" type="text/css" href="style/resultStyle.css" />
    <body style="margin: 0px; overflow: hidden;">
	<div id="pdf_capture" style="margin: 40px">
		<h2>สรุปผลการสอบ - ${this.props.title}</h2>
		<div style="display: inline-block;">
		<p>จำนวนผู้เข้าสอบ ${this.props.total} | คะแนนสูงสุด ${this.props.max} | คะแนนต่ำสุด ${this.props.min} | เฉลี่ย ${this.props.avg} คะแนน</p>
		</div><br/>
		<table class="resultStudent">
			${resultStudent}
		</table>
	</div>
	<iframe id="pdf" frameborder="none" width="100%" height="100%"></iframe>
    </body>`;

    win.document.write(resultOutput);
    html2canvas(win.document.body, { windowWidth: 2480, width: 2480 }).then(
      canvas => {
        let doc = win.document;
        let pdf = new jsPDF();
        pdf.addImage(canvas, "JPEG", 0, 0);
        doc.getElementById("pdf").src = pdf.output("dataurlstring", {
          filename: "report.pdf"
        });
        doc.getElementById("pdf_capture").style.display = "none";
        this.props.handleDialog.close();
      }
    );
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "white",
          marginBottom: "10px",
          boxShadow: "0px 2px 1px 0px #ddd"
        }}
      >
        <div
          style={{
            backgroundColor: "#8ad10a",
            padding: "10px",
            color: "white",
            fontWeight: "bold"
          }}
        >
          﫳 {this.props.title}
        </div>{" "}
        <div style={{ position: "relative", padding: "10px" }}>
          <span className="resultBorder">
            ผู้เข้าสอบทั้งหมด {this.props.total} คน
          </span>{" "}
          <span className="resultBorder">เฉลี่ย {this.props.avg}</span>{" "}
          <span className="resultBorder">คะแนนสูงสุด {this.props.max}</span>{" "}
          <span className="resultBorder">คะแนนต่ำสุด {this.props.min}</span>{" "}
          <button
            onClick={() =>
              this.props.handleDialog.open(
                <Marking
                  body={this.props.body[this.props.title]}
                  handleDialog={this.props.handleDialog}
                  question={this.props.question}
                  title={this.props.title}
                />
              )
            }
            className="Button Primary"
          >
            ดูการฝน
          </button>
          <div
            onClick={this.handleClick}
            className="hover"
            style={{
              position: "absolute",
              right: "20px",
              top: "25px",
              transform: "translateY(-50%)",
              fontSize: "28px"
            }}
          >
            &#8597;
          </div>
          {this.state.shown ? (
            <div className="resultControl">
              <br />
              <span style={{ float: "left" }}>
                <span style={{ display: "inline-block", marginRight: "15px" }}>
                  
                </span>
                กลุ่ม
                <select
                  onChange={this.handleChange}
                  style={{
                    marginLeft: "8px",
                    padding: "5px",
                    paddingBottom: "9px",
                    border: "1px solid #CCC",
                    backgroundColor: "white"
                  }}
                >
                  <option value="">ทั้งหมด</option>
                  <DistinctList body={this.state.body} />
                </select>
              </span>
              <button
                onClick={this.handlePrint}
                style={{ float: "right" }}
                className="Button Secondary"
              >
                {" พิมพ์รายงาน"}
              </button>
              <br style={{ clear: "both" }} />
              <table
                className="resultTable"
                style={{ width: "100%", marginTop: "10px" }}
              >
                <thead>
                  <tr>
                    <th style={{ width: "70%" }}>ชื่อนักเรียน</th>
                    <th style={{ width: "15%" }}>กลุ่ม</th>
                    <th style={{ width: "15%" }}>คะแนน</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(this.state.body)
                    .filter(filter =>
                      this.state.room == ""
                        ? true
                        : this.state.body[filter].room == this.state.room
                    )
                    .sort(
                      (a, b) =>
                        this.state.body[a].totalScore -
                        this.state.body[b].totalScore
                    )
                    .map(map => {
                      return (
                        <tr key={map}>
                          <td>{map + " "}</td>
                          <td>{this.state.body[map].room}</td>
                          <td style={{ textAlign: "right" }}>
                            {this.state.body[map].totalScore}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

function DistinctList(props) {
  let body = Object.keys(props.body).map(map => props.body[map].room);
  let distinctBody = [...new Set(body)];
  return distinctBody.map(map => <option key={map}>{map}</option>);
}

class Marking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dif: 0,
      hard: 0
    };
  }

  render() {
    let groupHalf = Math.round(Object.keys(this.props.body).length / 2);
    let bottomGroup = Object.keys(this.props.body)
      .sort(
        (a, b) =>
          this.props.body[b]["totalScore"] - this.props.body[a]["totalScore"]
      )
      .splice(0, groupHalf);
    let upperGroup = Object.keys(this.props.body)
      .sort(
        (a, b) =>
          this.props.body[b]["totalScore"] - this.props.body[a]["totalScore"]
      )
      .splice(groupHalf, Object.keys(this.props.body).length);

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
    let bottomTotal = [],
      upperTotal = [];
    let question = this.props.question[this.props.title];

    question.forEach((each, index) => {
      bottomTotal.push(
        bottomGroup.filter(
          filter =>
            this.props.body[filter]["marking"][index] ==
            choiceName[this.props.question[this.props.title][index]]
        ).length
      );

      upperTotal.push(
        upperGroup.filter(
          filter =>
            this.props.body[filter]["marking"][index] ==
            choiceName[this.props.question[this.props.title][index]]
        ).length
      );
    });

    let answerSheet = [];
    let markingResult = [];
    for (let key in this.props.body) {
      const body = this.props.body;
      body[key].marking.forEach((mark, index) => {
        if (markingResult[index] == undefined) {
          markingResult[index] = { A: 0, B: 0, C: 0, D: 0, E: 0 };
        }
        markingResult[index][mark]++;
      });
    }
    for (let i = 1; i <= 4; i++) {
      let totalAnswer = [];
      for (let x = i * 25 - 24; x <= i * 25; x++) {
        if (markingResult[x - 1] == undefined) {
          markingResult[x - 1] = { A: 0, B: 0, C: 0, D: 0, E: 0 };
        }
        const readyResult = markingResult[x - 1];
        let dif;
        if (
          bottomTotal.length > 0 &&
          upperTotal.length > 0 &&
          bottomGroup.length > 0 &&
          upperGroup.length > 0
        ) {
          dif = Object.keys(this.props.question[this.props.title])[x - 1]
            ? Math.round(
                (bottomTotal[x - 1] / bottomGroup.length -
                  upperTotal[x - 1] / upperGroup.length) *
                  10
              ) / 10
            : "";
        } else {
          dif = "";
        }
        let hard;
        let holdCorrect = this.props.question[this.props.title][x - 1];
        if (x <= this.props.question[this.props.title].length) {
          hard =
            Object.keys(this.props.body).filter(
              filter =>
                this.props.body[filter]["marking"][x - 1] ==
                choiceName[holdCorrect]
            ).length / Object.keys(this.props.body).length;
        } else {
          hard = "";
        }
        totalAnswer.push(
          <tr className="answerTable" key={x}>
            <td
              style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center"
              }}
            >
              {x}
            </td>
            <td
              className="tdHover"
              onMouseOver={() =>
                this.setState({ dif: dif, hard: Number(hard.toFixed(2)) })
              }
            >
              {readyResult["A"] != 0 ? readyResult["A"] : ""}
            </td>
            <td
              className="tdHover"
              onMouseOver={() =>
                this.setState({ dif: dif, hard: Number(hard.toFixed(2)) })
              }
            >
              {readyResult["B"] != 0 ? readyResult["B"] : ""}
            </td>
            <td
              className="tdHover"
              onMouseOver={() =>
                this.setState({ dif: dif, hard: Number(hard.toFixed(2)) })
              }
            >
              {readyResult["C"] != 0 ? readyResult["C"] : ""}
            </td>
            <td
              className="tdHover"
              onMouseOver={() =>
                this.setState({ dif: dif, hard: Number(hard.toFixed(2)) })
              }
            >
              {readyResult["D"] != 0 ? readyResult["D"] : ""}
            </td>
            <td
              className="tdHover"
              onMouseOver={() =>
                this.setState({ dif: dif, hard: hard.toFixed(2) })
              }
            >
              {readyResult["E"] != 0 ? readyResult["E"] : ""}
            </td>
            {/* <td
              title="ค่าอำนาจจำแนก"
              style={{
                backgroundColor:
                  dif >= 0.4
                    ? "rgba(0, 255, 0, 0.2)"
                    : typeof dif == "string"
                    ? ""
                    : "rgba(255, 0, 0, 0.2)"
              }}
            >
              {dif}
            </td> */}
          </tr>
        );
      }
      answerSheet.push(
        <table
          style={{
            width: "130px",
            display: "inline-block",
            fontSize: "13px"
          }}
          key={i}
        >
          <tr>
            <th></th>
            <td>ก</td>
            <td>ข</td>
            <td>ค</td>
            <td>ง</td>
            <td>จ</td>
          </tr>
          {totalAnswer}
        </table>
      );
    }

    let difTran, hardTran;

    console.log(this.state.dif);

    if (this.state.dif <= 0.19) {
      difTran = "จำแนกได้ไม่ดี";
    } else if (this.state.dif <= 0.29) {
      difTran = "จำแนกได้น้อย";
    } else if (this.state.dif <= 0.39) {
      difTran = "จำแนกพอใช้";
    } else {
      difTran = "จำแนกได้ดี";
    }

    if (this.state.hard <= 0.19) {
      hardTran = "ยากมาก";
    } else if (this.state.hard <= 0.39) {
      hardTran = "ค่อนข้างยาก";
    } else if (this.state.hard <= 0.59) {
      hardTran = "ปานกลาง";
    } else if (this.state.hard <= 0.79) {
      hardTran = "ค่อนข้างง่าย";
    } else {
      hardTran = "ง่ายมาก";
    }

    return (
      <div
        style={{ whiteSpace: "nowrap" }}
        onClick={() => this.props.handleDialog.close()}
      >
        {answerSheet}
        <br />
        <br />
        {`${
          typeof this.state.dif != "string"
            ? "ค่าอำนาจจำแนก (R) " + this.state.dif + ` (${difTran})`
            : ""
        }`}
        <br />
        {`ค่าความยากง่ายของคำถาม (P) ${this.state.hard} (${hardTran})`}
      </div>
    );
  }
}
