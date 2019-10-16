class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "ข้อสอบใหม่",
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ loading: true });
    //this.props.handleDialog.close(<QuestionEdit value={this.state.value} />);
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
              required={true}
              onChange={this.handleChange}
            />
            <br />
            <input
              className="Button"
              type="button"
              value="ปิด"
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

function QuestionPage(props) {
  return (
    <div>
      <button
        className="Button Primary"
        onClick={() =>
          props.handleDialog.open(
            <QuestionForm handleDialog={props.handleDialog} />
          )
        }
      >
        สร้างข้อสอบใหม่
      </button>
    </div>
  );
}

function QuestionEdit(props) {
  return props.value;
}

module.exports.QuestionPage = QuestionPage;
