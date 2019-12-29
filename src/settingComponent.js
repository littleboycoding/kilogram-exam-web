export class SettingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      info: "",
      image: ""
    };

    this.handlePrint = this.handlePrint.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleInput(event, name) {
    this.setState({
      [name]: event.target.value
    });
  }

  handleFile(event) {
    let file = event.target.files[0];
    console.log(file);

    let reader = new FileReader();

    reader.onload = file => {
      this.setState({
        image: file.target.result
      });
    };

    reader.readAsDataURL(file);
  }

  handlePrint() {
    let print = window.open(
      "../sheet.html?title=" + this.state.title + "&image=" + this.state.image,
      ""
    );
    /*
    setTimeout(() => {
      print.document.getElementById("title").innerHTML = this.state.title;
      print.eval("print()");
    }, 1000);
    */
  }

  render() {
    return (
      <div>
        <h3>ตั้งค่ากระดาษคำตอบ</h3>
        {"ชื่อหัวกระดาษ"}
        <br />
        <input
          onChange={() => this.handleInput(event, "title")}
          className="Input"
          type="text"
          placeholder="ชื่อหัวกระดาษ"
          value={this.state.title}
          style={{ width: 200, padding: 10 }}
        />{" "}
        <input
          type="file"
          id="file"
          onInput={this.handleFile}
          style={{ display: "none" }}
        />
        <br />
        <br />
        {"รูปภาพโลโก้"}
        <br />
        <div style={{ display: "inline-block", position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            
          </span>
          <img
            onClick={() => document.getElementById("file").click()}
            src={this.state.image ? this.state.image : null}
            className="imgLogo"
            style={{
              width: 200,
              height: 200,
              objectFit: "contain"
            }}
          />
        </div>{" "}
        <input
          onClick={() =>
            this.props.handleDialog.open(
              <div>
                <h3>เลือกจำนวนข้อ</h3>
                <button
                  style={{ width: "100px" }}
                  onClick={() =>
                    window.open(
                      "../sheet.html?title=" +
                        this.state.title +
                        "&image=" +
                        this.state.image,
                      ""
                    )
                  }
                  className="Button Primary"
                >
                  100 ข้อ
                </button>{" "}
                <button
                  style={{ width: "100px" }}
                  onClick={() =>
                    window.open("../sheet2.html?title=" + this.state.title, "")
                  }
                  className="Button Primary"
                >
                  50 ข้อ
                </button>
                <br />
                <br />
                <input
                  className="Button"
                  onClick={() => this.props.handleDialog.close()}
                  value="ย้อนกลับ"
                  type="button"
                />
              </div>
            )
          }
          className="Button Primary"
          type="submit"
          value="พิมพ์กระดาษ"
          style={{ padding: 10 }}
        />
      </div>
    );
  }
}
