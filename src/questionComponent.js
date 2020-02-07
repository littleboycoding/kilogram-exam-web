import { driveGet, driveUpdate } from "../drive.js";
var markName = { 1: "ก", 2: "ข", 3: "ค", 4: "ง", 5: "จ" };
var markNameReverse = { ก: 1, ข: 2, ค: 3, ง: 4, จ: 5 };

class CreateNewQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.data = Object.assign({}, this.props.body);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (this.data[this.state.value] == undefined) {
      this.setState({ loading: true });

      this.data[this.state.value] = {};

      driveUpdate("question.json", this.data).then(res => {
        this.props.handleDialog.close(
          <QuestionPage handleDialog={this.props.handleDialog} />
        );
      });
    } else {
      this.props.handleDialog.open(
        <div style={{ fontSize: 18, marginBottom: 15 }}>
          มีข้อสอบชื่อนี้อยู่แล้ว โปรดใช้ชื่ออื่น
          <br />
          <br />
          <button
            className="Button"
            onClick={() => this.props.handleDialog.close()}
          >
            ตกลง
          </button>
        </div>
      );
    }

    event.preventDefault();
  }

  handleXLSX() {
    let file = document.getElementById("XLSX");
    file.click();
    file.onchange = e => {
      let input = e.target.files[0];
      let reader = new FileReader();
      reader.onload = e => {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, { type: "array" });

        this.props.handleDialog.open(
          <TableXLSX
            body={this.props.body}
            workbook={workbook}
            handleDialog={this.props.handleDialog}
          />
        );
      };
      reader.readAsArrayBuffer(input);
    };
  }

  render() {
    if (!this.state.loading) {
      return (
        <div>
          <div style={{ fontSize: 20, marginBottom: 15 }}>
            ตั้งชื่อข้อสอบใหม่
          </div>
          <button
            onClick={this.handleXLSX.bind(this)}
            className="Button Secondary"
          >
            หรือเพิ่มจากไฟล์ XLSX
          </button>
          <input
            style={{ display: "none" }}
            accept=".xlsx"
            type="file"
            required
            id="XLSX"
          />
          <br />
          <br />
          <form onSubmit={this.handleSubmit}>
            <input
              className="Input"
              type="text"
              placeholder="ชื่อข้อสอบ"
              value={this.state.value}
              required="true"
              onChange={this.handleChange}
            />
            <br />
            <input
              className="Button"
              type="button"
              value="ยกเลิก"
              style={{ margin: 15, marginBottom: 0 }}
              onClick={() => this.props.handleDialog.close()}
            />
            <input
              className="Button Primary"
              style={{ margin: 15, marginBottom: 0 }}
              type="submit"
              value="ยืนยัน"
            />
          </form>
        </div>
      );
    } else {
      return (
        <div style={{ fontSize: 20, marginBottom: 15 }}>กำลังส่งข้อมูล ﱰ</div>
      );
    }
  }
}

class TableXLSX extends React.Component {
  constructor(props) {
    super(props);
    this.column = [
      "คำถาม",
      "คำตอบ ก",
      "คำตอบ ข",
      "คำตอบ ค",
      "คำตอบ ง",
      "คำตอบ จ",
      "คำตอบที่ถูกต้อง",
      "รูปภาพคำถาม",
      "รูปภาพคำตอบ ก",
      "รูปภาพคำตอบ ข",
      "รูปภาพคำตอบ ค",
      "รูปภาพคำตอบ ง",
      "รูปภาพคำตอบ จ"
    ];
    this.state = {
      title: "",
      sheet: this.props.workbook.SheetNames[0],
      column: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ]
    };
    this.handleSheetChange = this.handleSheetChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.titleChange = this.titleChange.bind(this);

    console.log(this.props.body);
  }

  handleSubmit(event) {
    if (this.state.column.every(every => every != null)) {
      let sheet = this.props.workbook.Sheets[this.state.sheet];
      let body = Object.assign({}, this.props.body);
      let data = [];
      this.state.column.forEach(column => {
        data.push(
          Object.keys(sheet).filter(
            filter => filter.replace(/[0-9]/g, "") == column
          )
        );
      });
      Object.assign(body, { [this.state.title]: {} });
      for (let i = 1; i < data[0].length; i++) {
        Object.assign(body[this.state.title], {
          [i]: {
            answer: {
              1: data[1][i] ? sheet[data[1][i]].w : "",
              2: data[2][i] ? sheet[data[2][i]].w : "",
              3: data[3][i] ? sheet[data[3][i]].w : "",
              4: data[4][i] ? sheet[data[4][i]].w : "",
              5: data[5][i] ? sheet[data[5][i]].w : ""
            },
            correct: data[6][i] ? markNameReverse[sheet[data[6][i]].w] : "",
            title: data[0][i] ? sheet[data[0][i]].w : "",
            choice_img: {
              1: data[8][i] ? sheet[data[8][i]].w : "",
              2: data[9][i] ? sheet[data[9][i]].w : "",
              3: data[10][i] ? sheet[data[10][i]].w : "",
              4: data[11][i] ? sheet[data[11][i]].w : "",
              5: data[12][i] ? sheet[data[12][i]].w : ""
            },
            question_img: data[7][i] ? sheet[data[7][i]].w : ""
          }
        });
      }

      console.log(body);
      this.props.handleDialog.open(
        <div style={{ fontSize: 20, marginBottom: 15 }}>กำลังส่งข้อมูล ﱰ</div>
      );
      driveUpdate("question.json", body).then(res =>
        this.props.handleDialog.close(
          <QuestionPage handleDialog={this.props.handleDialog} />
        )
      );
    }
    event.preventDefault();
  }

  handleSheetChange(event) {
    this.setState({
      sheet: event.target.value,
      column: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ]
    });
  }

  handleBackground(e, color, locked) {
    if (e.target.id != "xlsx_table") {
      let xlsx_table = document.getElementById("xlsx_table");
      let xlsx_column = e.target.id.substring(11).replace(/[0-9]/g, "");
      let tr = xlsx_table.children[0].children;
      for (let i = 0; i < tr.length; i++) {
        let td = tr[i].children;
        for (let x = 0; x < td.length; x++) {
          if (td[x].style.backgroundColor != "rgb(221, 221, 221)") {
            if (td[x].id.substring(11).replace(/[0-9]/g, "") == xlsx_column) {
              td[x].style.backgroundColor = color;
            }
          }
        }
      }
    }
  }

  handleClick(event) {
    if (
      event.target.id != "xlsx_table" &&
      this.state.column.some(some => some == null)
    ) {
      let xlsx_column = event.target.id.substring(11).replace(/[0-9]/g, "");
      if (!this.state.column.some(some => some == xlsx_column)) {
        let column = this.state.column;
        column[column.findIndex(find => find == null)] = xlsx_column;
        this.setState({
          column: column
        });
        this.handleBackground(event, "#DDD", true);
      }
    }
  }

  titleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="ชื่อข้อสอบ"
            required={true}
            className="Input"
            style={{ width: "100%" }}
            onChange={this.titleChange}
            value={this.state.title}
          />
          <br />
          <br />
          <select
            onChange={this.handleSheetChange}
            className="Input"
            style={{
              width: "100%",
              backgroundColor: "white",
              marginBottom: "10px"
            }}
          >
            {this.props.workbook.SheetNames.map(map => (
              <option>{map}</option>
            ))}
          </select>
          <div
            onClick={this.handleClick}
            onMouseOver={() => this.handleBackground(event, "#CCC", false)}
            onMouseOut={() => this.handleBackground(event, "#FFF", false)}
            className="xlsx_table_container"
            dangerouslySetInnerHTML={{
              __html: XLSX.utils.sheet_to_html(
                this.props.workbook.Sheets[this.state.sheet],
                {
                  id: "xlsx_table"
                }
              )
            }}
          ></div>
          <div style={{ display: "none" }}>
            {setTimeout(() => {
              document
                .querySelectorAll("[id^='xlsx_table-M']")
                .forEach((each, index) => {
                  if (index > 0) {
                    each.innerHTML.search(/^<img/) != 0 && each.innerHTML != ""
                      ? (each.innerHTML = `<img style="width: 100px; height: 50px; object-fit: contain;" src="${each.innerHTML}" />`)
                      : each.innerHTML;
                  }
                });
              document
                .querySelectorAll("[id^='xlsx_table-L']")
                .forEach((each, index) => {
                  if (index > 0) {
                    each.innerHTML.search(/^<img/) != 0 && each.innerHTML != ""
                      ? (each.innerHTML = `<img style="width: 100px; height: 50px; object-fit: contain;" src="${each.innerHTML}" />`)
                      : each.innerHTML;
                  }
                });
              document
                .querySelectorAll("[id^='xlsx_table-K']")
                .forEach((each, index) => {
                  if (index > 0) {
                    each.innerHTML.search(/^<img/) != 0 && each.innerHTML != ""
                      ? (each.innerHTML = `<img style="width: 100px; height: 50px; object-fit: contain;" src="${each.innerHTML}" />`)
                      : each.innerHTML;
                  }
                });
              document
                .querySelectorAll("[id^='xlsx_table-J']")
                .forEach((each, index) => {
                  if (index > 0) {
                    each.innerHTML.search(/^<img/) != 0 && each.innerHTML != ""
                      ? (each.innerHTML = `<img style="width: 100px; height: 50px; object-fit: contain;" src="${each.innerHTML}" />`)
                      : each.innerHTML;
                  }
                });
              document
                .querySelectorAll("[id^='xlsx_table-I']")
                .forEach((each, index) => {
                  if (index > 0) {
                    each.innerHTML.search(/^<img/) != 0 && each.innerHTML != ""
                      ? (each.innerHTML = `<img style="width: 100px; height: 50px; object-fit: contain;" src="${each.innerHTML}" />`)
                      : each.innerHTML;
                  }
                });
              document
                .querySelectorAll("[id^='xlsx_table-H']")
                .forEach((each, index) => {
                  if (index > 0) {
                    each.innerHTML.search(/^<img/) != 0 && each.innerHTML != ""
                      ? (each.innerHTML = `<img style="width: 100px; height: 50px; object-fit: contain;" src="${each.innerHTML}" />`)
                      : each.innerHTML;
                  }
                });
            }, 1000)}
            }
          </div>
          <br />
          {this.state.column.some(some => some == null) ? (
            <span>
              {"กรุณาเลือกคอลัมน์ - " +
                this.column[this.state.column.findIndex(find => find == null)]}
              <br />
              <br />
            </span>
          ) : (
            ""
          )}
          <button
            onClick={() => this.props.handleDialog.close()}
            className="Button"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            style={{ marginLeft: "10px" }}
            className={
              (this.state.column.every(every => every != null)
                ? ""
                : "Disabled") + " Button Primary"
            }
          >
            บันทึก
          </button>
        </form>
      </div>
    );
  }
}

class QuestionDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.data = Object.assign({}, this.props.body);
    this.deleteProc = this.deleteProc.bind(this);
  }

  deleteProc() {
    delete this.data[this.props.title];

    this.setState({ loading: true });

    this.props.handleUpdate(this.data);

    driveUpdate("question.json", this.data).then(res => {
      driveGet("result.json").then(res => {
        console.log(res, this.props.title);
        let finalResult = res;
        if (
          finalResult != false &&
          finalResult[this.props.title] &&
          Object.keys(finalResult).length > 0
        ) {
          delete finalResult[this.props.title];
          driveUpdate("result.json", finalResult).then(res => {
            this.props.handleDialog.close();
          });
        } else {
          this.props.handleDialog.close();
        }
      });
    });
  }

  render() {
    return !this.state.loading ? (
      <div>
        <span>ยืนยันการลบข้อสอบ</span>
        <br />
        <br />
        <button
          onClick={() => this.props.handleDialog.close()}
          style={{ marginRight: "10px" }}
          className="Button"
        >
          ยกเลิก
        </button>
        <button onClick={this.deleteProc} className="Button Danger">
          ยืนยัน
        </button>
      </div>
    ) : (
      <div style={{ fontSize: 20, marginBottom: 15 }}>กำลังส่งข้อมูล ﱰ</div>
    );
  }
}

export class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  fetchData() {
    this.props.handleDialog.open(
      <div style={{ fontSize: 20, marginBottom: 15 }}>กำลังโหลด ﱰ</div>
    );

    driveGet("question.json").then(res => {
      this.setState({ data: res });
      this.props.handleDialog.close();
    });
  }

  handleUpdate(res) {
    this.setState({ data: res });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <div
          style={{ display: "inline-block" }}
          className="Button Primary"
          onClick={() =>
            this.props.handleDialog.open(
              <CreateNewQuestion
                handleDialog={this.props.handleDialog}
                body={this.state.data}
              />
            )
          }
        >
           สร้างข้อสอบใหม่
        </div>
        <QuestionListPage
          data={this.state.data}
          handleDialog={this.props.handleDialog}
          handleUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

function QuestionListPage(props) {
  let result = [];
  for (const key of Object.keys(props.data)) {
    result.push(
      <div key={key} className="dataBorder">
        <div className="questionTitle">﫳 {key}</div>
        <div className="questionTotal">
          ทั้งหมด {Object.keys(props.data[key]).length} ข้อ
        </div>
        <div
          onClick={() =>
            props.handleDialog.open(
              <QuestionDelete
                handleDialog={props.handleDialog}
                body={props.data}
                title={key}
                handleUpdate={props.handleUpdate}
              />
            )
          }
          className="Button Danger"
          style={{ width: "50px" }}
        >
          ลบ
        </div>
        <div
          onClick={() => questionPrint(props.data[key])}
          style={{
            width: "calc(100% / 2 - 25px)",
            borderLeft: "1px solid #CCC"
          }}
          className="Button"
        >
           พิมพ์
        </div>
        <div
          onClick={() =>
            props.handleDialog.close(
              <QuestionEditPage
                data={props.data}
                title={key}
                handleDialog={props.handleDialog}
              />
            )
          }
          className="Button"
          style={{
            width: "calc(100% / 2 - 25px)"
          }}
        >
           แก้ไขข้อมูล
        </div>
        <br style={{ clear: "both" }} />
      </div>
    );
  }
  return result;
}

class QuestionEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data[this.props.title]
    };

    this.data = Object.assign({}, this.props.data);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
    this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addFile = this.addFile.bind(this);
  }

  static resizeTextarea(event) {
    event.target.style.height = "";
    event.target.style.height = event.target.scrollHeight + "px";
  }

  handleSubmit() {
    this.props.handleDialog.open(
      <div style={{ fontSize: 20, marginBottom: 15 }}>กำลังส่งข้อมูล ﱰ</div>
    );
    Object.defineProperty(this.data, this.props.title, {
      value: Object.assign({}, this.state.data),
      writable: true
    });
    driveUpdate("question.json", this.data).then(res => {
      this.props.handleDialog.close(
        <QuestionPage handleDialog={this.props.handleDialog} />
      );
    });
  }

  handleDeleteQuestion(question_no) {
    let thisQuestion = Object.assign({}, this.state.data);
    for (let i = question_no; i <= Object.keys(thisQuestion).length - 1; i++) {
      Object.defineProperty(
        thisQuestion,
        i,
        Object.getOwnPropertyDescriptor(
          thisQuestion,
          Object.keys(thisQuestion)[i]
        )
      );
    }
    const lastData = Object.keys(thisQuestion)[
      Object.keys(thisQuestion).length - 1
    ];
    delete thisQuestion[lastData];
    this.setState({
      data: thisQuestion
    });
  }

  handleCorrect(question_no, choice) {
    let thisQuestion = Object.assign({}, this.state.data);
    thisQuestion[question_no]["correct"] = choice;
    this.setState({
      data: thisQuestion
    });
  }

  handleTab(question_no, choice, event) {
    if (
      event.key === "Tab" &&
      Object.keys(this.state.data).length == question_no &&
      choice == 5
    ) {
      event.preventDefault();
      this.addQuestion();
    }
  }

  addQuestion() {
    this.setState((state, props) => {
      const data = Object.assign(state.data, {
        [Object.keys(state.data).length + 1]: {
          answer: { 1: "", 2: "", 3: "", 4: "", 5: "" },
          correct: null,
          title: "New Question",
          choice_img: { 1: "", 2: "", 3: "", 4: "", 5: "" },
          question_img: ""
        }
      });
      return {
        data: data
      };
    });
  }

  handleAnswerChange(question_no, choice, event) {
    let thisQuestion = Object.assign({}, this.state.data);
    thisQuestion[question_no]["answer"][choice] = event.target.value;
    this.setState({
      data: thisQuestion
    });
  }

  handleTitleChange(question_no, event) {
    let thisQuestion = Object.assign({}, this.state.data);
    thisQuestion[question_no]["title"] = event.target.value;
    this.setState({
      data: thisQuestion
    });
  }

  addFile(event, question_no, choice) {
    let reader = new FileReader();
    reader.onload = e => {
      let thisQuestion = Object.assign({}, this.state.data);
      if (choice) {
        thisQuestion[question_no]["choice_img"][choice] = e.target.result;
      } else {
        thisQuestion[question_no]["question_img"] = e.target.result;
      }
      this.setState({
        data: thisQuestion
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  render() {
    const examName = Object.keys(this.state.data);
    return (
      <div>
        <input
          type="file"
          id="image"
          accept="image/*"
          style={{ display: "none" }}
        />
        <div
          className="dataBorder"
          style={{ marginTop: 0, backgroundColor: "white", padding: 10 }}
        >
          ข้อสอบ {this.props.title} ทั้งหมด {examName.length} ข้อ
          <div
            onClick={this.handleSubmit}
            style={{ marginTop: "-5px", borderRadius: 2 }}
            className="Button Primary"
          >
            บันทึก
          </div>
          <div
            onClick={() => {
              if (this.props.data[this.props.title] != this.state.data) {
                this.props.handleDialog.open(
                  <UnsaveExitConfirm handleDialog={this.props.handleDialog} />
                );
              } else {
                this.props.handleDialog.close(
                  <QuestionPage handleDialog={this.props.handleDialog} />
                );
              }
            }}
            style={{ marginRight: 8, marginTop: "-5px", borderRadius: 2 }}
            className="Button Danger"
          >
            ย้อนกลับ
          </div>
        </div>
        {examName.map(question_no => {
          const question = this.state.data[question_no];
          return (
            <div className="dataBorder" key={question_no}>
              <div className="questionTitle" style={{ position: "relative" }}>
                <div style={{ width: 33, display: "inline-block" }}>
                  {question_no}.{" "}
                </div>
                <textarea
                  className="questionTitleInput"
                  onChange={() => {
                    QuestionEditPage.resizeTextarea(event);
                    this.handleTitleChange(question_no, event);
                  }}
                  onFocus={() => {
                    QuestionEditPage.resizeTextarea(event);
                  }}
                  value={question["title"]}
                  autoFocus={true}
                  placeholder="คำถาม..."
                />
                <input
                  type="file"
                  id={"questionImg" + question_no}
                  onInput={() => this.addFile(event, question_no)}
                  style={{ display: "none" }}
                />
                <div
                  onClick={() => {
                    if (question["question_img"] == "") {
                      document
                        .getElementById("questionImg" + question_no)
                        .click();
                    } else {
                      let thisQuestion = Object.assign({}, this.state.data);
                      thisQuestion[question_no]["question_img"] = "";
                      this.setState({
                        data: thisQuestion
                      });
                    }
                  }}
                  className="Button AddImage"
                  style={{ right: "60px" }}
                >
                  <img
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "0",
                      width: "41px",
                      height: "41px",
                      objectFit: "contain",
                      display: question["question_img"] != "" ? "block" : "none"
                    }}
                    src={question["question_img"]}
                  />
                  <span></span>
                </div>
                <div
                  onClick={() => this.handleDeleteQuestion(question_no)}
                  className="Button Danger OperateButton"
                >
                  <span></span>
                </div>
              </div>
              <EditAnswer
                handleCorrect={this.handleCorrect}
                question={question}
                question_no={question_no}
                handleTab={this.handleTab}
                handleChange={this.handleAnswerChange}
                addFile={this.addFile}
                data={this.state.data}
                removeImg={this.setState.bind(this)}
              />
            </div>
          );
        })}
        <div onClick={this.addQuestion} id="addGuide">
          เพิ่มคำถาม โดยการกด Tab หรือ คลิ๊กที่นี่
        </div>
      </div>
    );
  }
}

function EditAnswer(props) {
  return (
    <ol className="questionAnswer">
      {Object.keys(props.question["answer"]).map(choice => (
        <li style={{ position: "relative" }} key={choice}>
          <input
            type="file"
            onInput={() => props.addFile(event, props.question_no, choice)}
            style={{ display: "none" }}
            id={"file" + props.question_no + choice}
            accept="image/*"
          />
          <textarea
            style={{ width: "calc(100% - 90px)" }}
            onChange={() => {
              QuestionEditPage.resizeTextarea(event);
              props.handleChange(props.question_no, choice, event);
            }}
            onFocus={() => {
              QuestionEditPage.resizeTextarea(event);
            }}
            className="questionInput"
            type="text"
            value={props.question["answer"][choice]}
            onKeyDown={() => props.handleTab(props.question_no, choice, event)}
            placeholder={"คำตอบข้อ " + props.question_no}
          />
          <div
            onClick={() => {
              if (props.data[props.question_no]["choice_img"][choice] == "") {
                document
                  .getElementById("file" + props.question_no + choice)
                  .click();
              } else {
                let thisQuestion = Object.assign({}, props.data);
                thisQuestion[props.question_no]["choice_img"][choice] = "";
                props.removeImg({
                  data: thisQuestion
                });
              }
            }}
            className="Button AddImage"
          >
            <img
              id={"img" + props.question_no + choice}
              style={{
                position: "absolute",
                right: "0",
                top: "0",
                width: "41px",
                height: "41px",
                objectFit: "contain",
                display:
                  props.question["choice_img"][choice] != "" ? "block" : "none"
              }}
              src={props.question["choice_img"][choice]}
            />
            <span></span>
          </div>
          {choice == props.question["correct"] ? (
            <div className="Button OperateButton CorrectButton Corrected">
              <span></span>
            </div>
          ) : (
            <div
              onClick={() => {
                props.handleCorrect(props.question_no, choice);
              }}
              className="Button OperateButton CorrectButton"
            >
              <span></span>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

function UnsaveExitConfirm(props) {
  return (
    <span>
      มีการแก้ไขที่ยังไม่ได้บันทึก
      <br />
      <b>ยืนยันที่จะละทิ้งข้อมูล ?</b>
      <br />
      <br />
      <input
        className="Button"
        type="button"
        value="ยกเลิก"
        onClick={() => props.handleDialog.close()}
      />{" "}
      <input
        className="Button Danger"
        type="button"
        value="ยืนยัน"
        onClick={() =>
          props.handleDialog.close(
            <QuestionPage handleDialog={props.handleDialog} />
          )
        }
      />
    </span>
  );
}

function questionPrint(data) {
  const dataListed = Object.keys(data);
  let htmlResult = dataListed.map(map => {
    //return data[map]["title"] + data[map]["answer"];
    return (
      (data[map]["question_img"]
        ? "<img style='margin-top: 15px; width: 100%; max-height: 230px; background-color: #FAFAFA; object-fit: contain;' src='" +
          data[map]["question_img"] +
          "' />"
        : "") +
      "<p>" +
      map +
      ". " +
      data[map]["title"] +
      "</p>" +
      Object.keys(data[map]["answer"])
        .map(maps =>
          data[map]["answer"][maps]
            ? "<div style='margin-bottom: 10px; width: 50%; float: left;'>" +
              markName[maps] +
              ". " +
              data[map]["answer"][maps] +
              "" +
              (data[map]["choice_img"][maps]
                ? "<br /><img src='" +
                  data[map]["choice_img"][maps] +
                  "' style='max-height: 100px;' /></div>"
                : "</div>")
            : ""
        )
        .join("") +
      "<br style='clear: both;' />"
    );
  });

  let printWindow = window.open("", "printWindow");

  printWindow.document.write(
    `<body><style>.editable { border-bottom: 1px dashed #AAA; padding-bottom: 5px; } .img:hover { opacity: 0.2; cursor: pointer; } @media print { body { margin: 15mm 15mm 15mm 15mm; } button { display: none !important; } .editable { border: none !important; padding: none !important; }</style><title>ปริ้นแบบทดสอบ</title><h2 class='editable' contenteditable='true'><input type='file' oninput='change_img(event)' style='display: none;' id='file' accept='image/*'><img class='img' onclick="document.getElementById('file').click()" src='favicon.png' style='vertical-align: middle; height: 45px;'/> บททดสอบ</h2><p class='editable' contenteditable='true'><b>คำชี้แจ้ง</b> จงเลือกคำตอบที่ถูกต้องที่สุด</p><button onClick='print()'>พิมพ์</button><hr>` +
      htmlResult.join("<hr >") +
      `
	<script>
		function change_img(e) {
			let target = e.target.files[0];
			let reader = new FileReader;

			reader.onload = e => {
				document.getElementsByClassName('img')[0].src = e.target.result;
			}

			reader.readAsDataURL(target);
		}
	</script>
	  </body>`
  );
}
