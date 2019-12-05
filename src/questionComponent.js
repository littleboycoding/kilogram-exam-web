const { ipcRenderer } = require("electron");
const { driveGet, driveUpdate } = require("../drive");

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
    this.setState({ loading: true });

    this.data[this.state.value] = {};

    console.log(this.data);

    driveUpdate("question.json", this.data).then(res => {
      this.props.handleDialog.close(
        <QuestionPage handleDialog={this.props.handleDialog} />
      );
    });

    event.preventDefault();
  }

  render() {
    if (!this.state.loading) {
      return (
        <div>
          <div style={{ fontSize: 20, marginBottom: 15 }}>
            ตั้งชื่อข้อสอบใหม่
          </div>
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
      this.props.handleDialog.close();
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

class QuestionPage extends React.Component {
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
    console.log(props.data[key]);
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
          onClick={() => ipcRenderer.send("print", props.data[key])}
          style={{
            width: "calc(100% / 2 - 25px)",
            borderLeft: "1px solid #CCC"
          }}
          className="Button"
        >
           พิมพ์
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
           แก้ไขข้อมูล
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
    for (i = question_no; i <= Object.keys(thisQuestion).length - 1; i++) {
      console.log(i, Object.keys(thisQuestion)[i]);
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
          title: "New Question"
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

  render() {
    const examName = Object.keys(this.state.data);
    return (
      <div>
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
              <div className="questionTitle">
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
        <li key={choice}>
          <textarea
            style={{ width: "calc(100% - 50px)" }}
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

module.exports.QuestionPage = QuestionPage;
