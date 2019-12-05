const { driveGet, driveUpdate } = require("../drive");

class StudentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  fetchData() {
    this.props.handleDialog.open(
      <div style={{ fontSize: 20, marginBottom: 15 }}>กำลังโหลด ﱰ</div>
    );
    driveGet("student.json").then(res => {
      this.setState({ body: res });
      this.props.handleDialog.close();
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  handleChange(event) {
    this.setState({ id: event.target.value });
  }

  handleUpdate(res) {
    this.setState({ body: res });
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.handleDialog.open(
              <CreateStudent
                handleDialog={this.props.handleDialog}
                body={this.state.body}
              />
            );
          }}
          style={{ marginBottom: "10px" }}
          className="Primary Button"
        >
          {"เพิ่มนักเรียนใหม่"}
        </button>
        <table className="studentList">
          <tr>
            <th style={{ width: "30%" }}>{"รหัสประจำตัว"}</th>
            <th style={{ width: "70%" }}>{"ชื่อ-นามสกุล"}</th>
          </tr>
          <StudentList
            body={this.state.body}
            handleDialog={this.props.handleDialog}
            handleUpdate={this.handleUpdate}
          />
        </table>
      </div>
    );
  }
}

function StudentList(props) {
  let list = [];
  for (const key in props.body) {
    list.push(
      <tr key={key}>
        <td>{key}</td>
        <td style={{ position: "relative", height: "35px" }}>
          {props.body[key]}
          <input
            onClick={() =>
              props.handleDialog.open(
                <StudentDelete
                  id={key}
                  body={props.body}
                  handleDialog={props.handleDialog}
                  handleUpdate={props.handleUpdate}
                />
              )
            }
            value="ลบ"
            type="button"
            style={{
              position: "absolute",
              right: "0",
              top: 0,
              fontWeight: "bold"
            }}
            className="Button Danger"
          />
        </td>
      </tr>
    );
  }
  return list;
}

class StudentDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.deleteProc = this.deleteProc.bind(this);
  }
  deleteProc() {
    let result = Object.assign({}, this.props.body);
    this.setState({ loading: true });
    delete result[this.props.id];

    this.props.handleUpdate(result);
    driveUpdate("student.json", result).then(res => {
      this.props.handleDialog.close();
    });
  }
  render() {
    return !this.state.loading ? (
      <div>
        <span>ยืนยันการลบนักเรียนออกจากระบบ</span>
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

class CreateStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "", name: "", loading: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.data = Object.assign({}, this.props.body);
  }

  handleChange(event, type) {
    this.setState({ [type]: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ loading: true });

    this.data[this.state.id] = this.state.name;

    console.log(this.data);

    driveUpdate("student.json", this.data).then(res =>
      this.props.handleDialog.close(
        <StudentPage handleDialog={this.props.handleDialog} />
      )
    );

    event.preventDefault();
  }

  handleDelete() {
    this.setState({ loading: true });
  }

  render() {
    if (!this.state.loading) {
      return (
        <div>
          <div style={{ fontSize: 20, marginBottom: 15 }}>
            เพิ่มนักเรียนใหม่
          </div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              maxlength="10"
              required="true"
              placeholder="รหัสประจำตัว"
              style={{
                padding: "5px",
                border: "1px solid #CCC",
                marginBottom: "5px"
              }}
              value={this.state.id}
              onChange={e => this.handleChange(e, "id")}
            />
            <br />
            <input
              required="true"
              type="text"
              placeholder="ชื่อ-นามสกุล"
              style={{
                padding: "5px",
                border: "1px solid #CCC"
              }}
              value={this.state.name}
              onChange={e => this.handleChange(e, "name")}
            />
            <br />
            <br />
            <input
              onClick={() => this.props.handleDialog.close()}
              type="button"
              value="ยกเลิก"
              className="Button"
              style={{ marginRight: "5px" }}
            />
            <input type="submit" value="ตกลง" className="Button Primary" />
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

module.exports.StudentPage = StudentPage;
