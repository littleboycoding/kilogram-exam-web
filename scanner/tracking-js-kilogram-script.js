function tracking_start() {
  var exam = document.querySelector("#exam");
  var container = document.querySelector(".container");
  var summary = [];
  var answer = [null, "A", "B", "C", "D", "E"];
  var total_mark = 0;
  var head_pos = [];

  //Register black color to tracking.js
  tracking.ColorTracker.registerColor("black", function(r, g, b) {
    if (r <= 130 && g <= 130 && b <= 130) {
      return true;
    }
    return false;
  });

  var tracker = new tracking.ColorTracker(["black"]);
  tracker.setMinDimension(5);
  tracker.on("track", function(event) {
    var head_start_pos = 0;
    event.data.forEach(function(rect) {
      // Y to start scanning
      if (rect.y > 100) {
        //First match always be starting position
        if (head_start_pos == 0) {
          head_start_pos = rect.y;
        }
        if (rect.y >= head_start_pos - 5 && rect.y <= head_start_pos + 5) {
          head_pos.push({
            x: rect.x,
            y: rect.y,
            height: rect.height,
            width: rect.width
          });
        } else {
          total_mark++;
        }
        plot(rect.x, rect.y, rect.width, rect.height, rect.color);
      }
    });
    console.log("Total mark : " + total_mark);
  });

  tracking.track(exam, tracker);
  function plot(x, y, w, h, color) {
    let rect = document.createElement("div");
    container.appendChild(rect);
    head_pos.forEach(pos => {
      let answer_holder = { no: null, answer: null };
      //Loop through total of answer available
      for (i = 1; i <= 5; i++) {
        let from_x = pos.x + pos.width * i;
        let to_x = pos.x + pos.width * (i + 1);
        let center_x = x + w / 2;
        if (center_x >= from_x && center_x <= to_x) {
          rect.innerHTML = answer[i];
          answer_holder.answer = answer[i];
          break;
        }
      }
      //Loop through total quesion
      for (i = 1; i <= 5; i++) {
        let from_y = pos.y + pos.height * i;
        let to_y = pos.y + pos.height * (i + 1);
        let center_y = y + h / 2;
        if (center_y >= from_y && center_y <= to_y) {
          rect.innerHTML = rect.innerHTML + i;
          answer_holder.no = i;
          break;
        }
      }
      if (answer_holder.no != null && answer_holder.answer != null) {
        summary.push(answer_holder);
      }
    });
    rect.style.color = "red";
    rect.classList.add("rect");
    rect.style.border = "2px solid " + color;
    rect.style.width = w + "px";
    rect.style.height = h + "px";
    rect.style.left = exam.offsetLeft + x + "px";
    rect.style.top = exam.offsetTop + y + "px";
  }
  console.log(summary);
}
