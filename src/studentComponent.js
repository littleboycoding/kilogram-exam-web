import { driveGet, driveUpdate } from "../drive.js";

export class StudentPage extends React.Component {
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
            <th style={{ width: "15%" }}>{"รหัสประจำตัว"}</th>
            <th style={{ width: "15%" }}>{"ระดับชั้น"}</th>
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
        <td>{props.body[key].room}</td>
        <td style={{ position: "relative", height: "35px" }}>
          {props.body[key].name}
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
    this.state = { id: "", name: "", room: "", loading: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleXLSX = this.handleXLSX.bind(this);
    this.data = Object.assign({}, this.props.body);
  }

  handleChange(event, type) {
    this.setState({ [type]: event.target.value });
  }

  handleSubmit(event) {
    if (this.data[this.state.id] == undefined) {
      this.setState({ loading: true });

      this.data[this.state.id] = {
        name: this.state.name,
        room: this.state.room
      };

      console.log(this.data);

      driveUpdate("student.json", this.data).then(res =>
        this.props.handleDialog.close(
          <StudentPage handleDialog={this.props.handleDialog} />
        )
      );
    } else {
      this.props.handleDialog.open(
        <div style={{ fontSize: 18, marginBottom: 15 }}>
          มีรหัสนักเรียนนี้อยู่แล้ว กรุณาใช้หมายเลขอื่น
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

  handleDelete() {
    this.setState({ loading: true });
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
            เพิ่มนักเรียนใหม่
            <br />
            <button onClick={this.handleXLSX} className="Button Secondary">
              หรือเพิ่มจากไฟล์ XLSX
            </button>
            <input
              style={{ display: "none" }}
              accept=".xlsx"
              type="file"
              required
              id="XLSX"
            />
          </div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              maxLength="10"
              pattern="^[0-9]*$"
              title="รหัสนักเรียนต้องเป็นเพียงตัวเลขเท่านั้น"
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
              type="list"
              list="roomList"
              placeholder="กลุ่ม"
              style={{
                padding: "5px",
                border: "1px solid #CCC",
                marginBottom: "5px"
              }}
              value={this.state.room}
              onChange={e => this.handleChange(e, "room")}
            />
            <datalist id="roomList">
              <DistinctList body={this.props.body} />
            </datalist>
            <br />
            <input
              required="true"
              type="text"
              placeholder="ชื่อ-นามสกุล"
              style={{
                padding: "5px",
                border: "1px solid #CCC",
                marginBottom: "5px"
              }}
              value={this.state.name}
              onChange={e => this.handleChange(e, "name")}
            />
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

class TableXLSX extends React.Component {
  constructor(props) {
    super(props);
    this.column = ["รหัสประจำตัว", "ชื่อ-นามสกุล", "กลุ่ม"];
    this.state = {
      sheet: this.props.workbook.SheetNames[0],
      column: [null, null, null]
    };
    this.handleSheetChange = this.handleSheetChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      for (let i = 1; i < data[0].length; i++) {
        if (
          sheet[data[0][i]].w.length <= 10 &&
          sheet[data[0][i]].w.search(/[a-zA-Z]/g) == -1
        ) {
          Object.assign(body, {
            [sheet[data[0][i]].w]: {
              name: sheet[data[1][i]].w,
              room: sheet[data[2][i]].w
            }
          });
        }
      }

      console.log(body);
      this.props.handleDialog.open(
        <div style={{ fontSize: 20, marginBottom: 15 }}>กำลังส่งข้อมูล ﱰ</div>
      );
      driveUpdate("student.json", body).then(res =>
        this.props.handleDialog.close(
          <StudentPage handleDialog={this.props.handleDialog} />
        )
      );
    }
    event.preventDefault();
  }

  handleSheetChange(event) {
    this.setState({
      sheet: event.target.value,
      column: [null, null, null]
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

  render() {
    return (
      <div>
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
          style={{ marginLeft: "10px" }}
          onClick={this.handleSubmit}
          className={
            (this.state.column.every(every => every != null)
              ? ""
              : "Disabled") + " Button Primary"
          }
        >
          บันทึก
        </button>
      </div>
    );
  }
}

function DistinctList(props) {
  let body = Object.keys(props.body).map(map => props.body[map].room);
  let distinctBody = [...new Set(body)];
  return distinctBody.map(map => <option key={map}>{map}</option>);
}
