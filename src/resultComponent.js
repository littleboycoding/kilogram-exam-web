const { driveGet, driveUpdate } = require("../drive");

class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: {}
    };
  }

  fetchData() {
    this.props.handleDialog.open(
      <div style={{ fontSize: 20, marginBottom: 15 }}>กำลังโหลด ﱰ</div>
    );
    driveGet("result.json").then(res => {
      this.setState({ body: res });
      this.props.handleDialog.close();
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let resultList = [];
    for (const key in this.state.body) {
      let sum = 0;
      for (const keys in this.state.body[key]) {
        sum = sum + this.state.body[key][keys].totalScore;
      }
      let avg = sum / Object.keys(this.state.body[key]).length;
      let total = Object.keys(this.state.body[key]).length;
      let sortedScore = [];
      for (const sortHold in this.state.body[key]) {
        sortedScore.push(this.state.body[key][sortHold].totalScore);
      }
      sortedScore.sort((a, b) => a - b);

      resultList.push(
        <div
          style={{
            backgroundColor: "white",
            marginBottom: "10px",
            boxShadow: "0px 2px 1px 0px #ddd"
          }}
          key={key}
        >
          <div
            style={{
              backgroundColor: "#8ad10a",
              padding: "10px",
              color: "white",
              fontWeight: "bold"
            }}
          >
            {key}
          </div>{" "}
          <div style={{ padding: "10px" }}>
            <span className="resultBorder">ผู้เข้าสอบทั้งหมด {total} คน</span>{" "}
            <span className="resultBorder">เฉลี่ย {avg}</span>{" "}
            <span className="resultBorder">คะแนนสูงสุด {sortedScore[0]}</span>{" "}
            <span className="resultBorder">
              คะแนนต่ำสุด {sortedScore[sortedScore.length - 1]}
            </span>{" "}
            <button
              onClick={() =>
                this.props.handleDialog.open(
                  <Marking
                    body={this.state.body[key]}
                    handleDialog={this.props.handleDialog}
                  />
                )
              }
              className="Button Primary"
            >
              ดูการฝน
            </button>
          </div>
        </div>
      );
    }
    return <div>{resultList}</div>;
  }
}

class Marking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
    console.log(markingResult);
    for (let i = 1; i <= 4; i++) {
      let totalAnswer = [];
      for (let x = i * 25 - 24; x <= i * 25; x++) {
        if (markingResult[x - 1] == undefined) {
          markingResult[x - 1] = { A: 0, B: 0, C: 0, D: 0, E: 0 };
        }
        const readyResult = markingResult[x - 1];
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
            <td>{readyResult["A"] != 0 ? readyResult["A"] : ""}</td>
            <td>{readyResult["B"] != 0 ? readyResult["B"] : ""}</td>
            <td>{readyResult["C"] != 0 ? readyResult["C"] : ""}</td>
            <td>{readyResult["D"] != 0 ? readyResult["D"] : ""}</td>
            <td>{readyResult["E"] != 0 ? readyResult["E"] : ""}</td>
          </tr>
        );
      }
      answerSheet.push(
        <table
          style={{
            width: "130px",
            float: "left",
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
            <td>ฅ</td>
          </tr>
          {totalAnswer}
        </table>
      );
    }
    return (
      <div onClick={() => this.props.handleDialog.close()}>{answerSheet}</div>
    );
  }
}

module.exports.ResultPage = ResultPage;
