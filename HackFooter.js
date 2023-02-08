try {
  const process = require("process");
  const fs = require("fs");
  let result = [];
  for (let i = 0; i < table0.activities.length; i = i + 1) {
    if (table0.activities[i].length === 0) {
      result.push([]);
    } else {
      let unit_result = [];
      let unit_activities = table0.activities[i];
      for (let j = 0; j < unit_activities.length; j = j + 1) {
        let activity = unit_activities[j];
        unit_result.push({
          teacherId: activity.eacherId,
          teacherName: activity.teacherName,
          courseId: activity.courseId,
          courseName: activity.courseName,
          roomId: activity.roomId,
          roomName: activity.roomName,
          vaildWeeks: activity.vaildWeeks,
          taskId: activity.taskId,
        });
      }
      result.push(unit_result);
    }
  }
  fs.writeFileSync(process.env.OUTPUT_PATH, JSON.stringify(result, null, 2));
  // for (let i = 0; i < table0.marshalContents.length; i = i + 1) {
  //   let element = table0.marshalContents[i];
  //   if (element === undefined) {
  //     console.log("\n");
  //   } else {
  //     console.log(String(element));
  //   }
  // }
} catch (err) {
  console.error(err);
}
