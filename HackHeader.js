class FakeObject {
  where() {
    return [];
  }
  filter() {
    return [];
  }
  reject() {
    return [];
  }
}

var language = "zh";
var _ = new FakeObject();
var delimiter = "<br>";
var weekCycle = [];
weekCycle[1] = ""; // "%u8FDE";
weekCycle[2] = "%u5355";
weekCycle[3] = "%u53CC";
var weekCycle_en = [];
weekCycle_en[1] = "";
weekCycle_en[2] = "Odd";
weekCycle_en[3] = "Even";
var result = new String("");
var weeksPerYear = 53;
// 杈撳嚭鏁欏娲诲姩淇℃伅
function activityInfo() {
  return (
    "teacherId:" +
    this.teacherId +
    "\n" +
    "teacherName:" +
    this.teacherName +
    "\n" +
    "courseId:" +
    this.courseId +
    "\n" +
    "courseName:" +
    this.courseName +
    "\n" +
    "roomId:" +
    this.roomId +
    "\n" +
    "roomName:" +
    this.roomName +
    "\n" +
    "vaildWeeks:" +
    this.vaildWeeks
  );
}
/**
 * 鍒ゆ柇鏄惁鐩稿悓鐨勬椿鍔� same acitivity [teacherId,courseId,roomId,vaildWeeks]
 */
function isSameActivity(other) {
  return this.canMergeWith(other) && this.vaildWeeks == other.vaildWeeks;
}
/**
 * 鍚堝苟鐩稿悓鐨勬暀瀛︽椿鍔� same [teacherId,courseId,roomId,remark] can merge
 */
function canMergeWith(other) {
  return (
    this.teacherId == other.teacherId &&
    this.courseId == other.courseId &&
    this.roomId == other.roomId &&
    this.courseName == other.courseName
  );
}
// utility for repeat char
function repeatChar(str, length) {
  if (length <= 1) {
    return str;
  }
  var rs = "";
  for (var k = 0; k < length; k++) {
    rs += str;
  }
  return rs;
}

/**
 * 娣诲姞缂╃暐琛ㄧず add a abbreviation to exists result; Do not use it directly. a
 * white space will delimate the weeks For example:odd1-18 even3-20
 */
function addAbbreviate(cycle, begin, end) {
  if (result !== "") {
    result += " ";
  }
  if (begin == end) {
    // only one week
    result += begin;
  } else {
    if (language && "en" == language) {
      result += unescape(weekCycle_en[cycle]) + begin + "-" + end;
    } else {
      result += unescape(weekCycle[cycle]) + begin + "-" + end;
    }
  }
  return result;
}
// 缂╃暐鍗曞懆,渚嬪"10101010"
function mashalOdd(result, weekOccupy, from, start) {
  var cycle = 0;
  if ((start - from + 2) % 2 === 0) {
    cycle = 3;
  } else {
    cycle = 2;
  }
  var i = start + 2;
  for (; i < weekOccupy.length; i += 2) {
    if (weekOccupy.charAt(i) == "1") {
      if (weekOccupy.charAt(i + 1) == "1") {
        addAbbreviate(cycle, start - from + 2, i - 2 - from + 2);
        return i;
      }
    } else {
      if (i - 2 == start) {
        cycle = 1;
      }
      addAbbreviate(cycle, start - from + 2, i - 2 - from + 2);
      return i + 1;
    }
  }
  return i;
}

// 缂╃暐杩炵画鍛�
function mashalContinue(result, weekOccupy, from, start) {
  var cycle = 1;
  var i = start + 2;
  for (; i < weekOccupy.length; i += 2) {
    if (weekOccupy.charAt(i) == "1") {
      if (weekOccupy.charAt(i + 1) != "1") {
        addAbbreviate(cycle, start - from + 2, i - from + 2);
        return i + 2;
      }
    } else {
      addAbbreviate(cycle, start - from + 2, i - 1 - from + 2);
      return i + 1;
    }
  }
  return i;
}
/**
 * 瀵规暀瀛﹀懆鍗犵敤涓茶繘琛岀缉鐣ヨ〃绀� marsh a string contain only '0' or '1' which named
 * "vaildWeeks" with length 53
 * 00000000001111111111111111100101010101010101010100000 |
 * |--------------------------------------| (from) (startWeek) (endWeek)
 * from is start position with minimal value 1,in login it's calendar week
 * start startWeek is what's start position you want to mashal baseed on
 * start,it also has minimal value 1 endWeek is what's end position you want
 * to mashal baseed on start,it also has minimal value 1
 */
function marshal(weekOccupy, from, startWeek, endWeek) {
  result = "";
  if (null == weekOccupy) {
    return "";
  }
  var initLength = weekOccupy.length;

  if (from > 1) {
    var before = weekOccupy.substring(0, from - 1);
    if (before.indexOf("1") != -1) {
      weekOccupy = weekOccupy + before;
    }
  }
  var tmpOccupy = repeatChar("0", from + startWeek - 2);
  tmpOccupy += weekOccupy.substring(from + startWeek - 2, from + endWeek - 1);
  tmpOccupy += repeatChar("0", initLength - weekOccupy.length);
  weekOccupy = tmpOccupy;

  if (endWeek > weekOccupy.length) {
    endWeek = weekOccupy.length;
  }
  if (weekOccupy.indexOf("1") == -1) {
    return "";
  }
  weekOccupy += "000";
  var start = 0;
  while ("1" != weekOccupy.charAt(start)) {
    start++;
  }
  var i = start + 1;
  while (i < weekOccupy.length) {
    var post = weekOccupy.charAt(start + 1);
    if (post == "0") {
      start = mashalOdd(result, weekOccupy, from, start);
    }
    if (post == "1") {
      start = mashalContinue(result, weekOccupy, from, start);
    }
    while (start < weekOccupy.length && "1" != weekOccupy.charAt(start)) {
      start++;
    }
    i = start;
  }
  return result;
}
/**
 * mashal style is or --------------------------- -------------------- |
 * odd3-18 even19-24,room | | odd3-18 | --------------------------
 * --------------------
 */
function marshalValidWeeks(from, startWeek, endWeek) {
  // alert(this.vaildWeeks);
  if (this.roomName !== "") {
    return (
      marshal(this.vaildWeeks, from, startWeek, endWeek) + "," + this.roomName
    );
  } else {
    return marshal(this.vaildWeeks, from, startWeek, endWeek);
  }
}

function or(first, second) {
  var newStr = "";
  for (var i = 0; i < first.length; i++) {
    if (first.charAt(i) == "1" || second.charAt(i) == "1") {
      newStr += "1";
    } else {
      newStr += "0";
    }
  }
  // alert(first+":first\n"+second+":second\n"+newStr+":result");
  return newStr;
}

// merger activity in every unit.
function mergeAll() {
  for (var i = 0; i < this.unitCounts; i++) {
    if (this.activities[i].length > 1) {
      for (var j = 1; j < this.activities[i].length; j++) {
        this.activities[i][0].vaildWeeks = or(
          this.activities[i][0].vaildWeeks,
          this.activities[i][j].vaildWeeks
        );
        this.activities[i][j] = null;
      }
    }
  }
}
// merger activity in every unit by course.
function mergeByCourse() {
  for (var i = 0; i < this.unitCounts; i++) {
    if (this.activities[i].length > 1) {
      // O(n^2)
      for (var j = 0; j < this.activities[i].length; j++) {
        if (null != this.activities[i][j]) {
          for (var k = j + 1; j < this.activities[i].length; k++) {
            if (null != this.activities[i][k]) {
              if (
                this.activities[i][j].courseName ==
                this.activities[i][k].courseName
              ) {
                this.activities[i][j].vaildWeeks = or(
                  this.activities[i][j].vaildWeeks,
                  this.activities[i][k].vaildWeeks
                );
                this.activities[i][k] = null;
              }
            }
          }
        }
      }
    }
  }
}
function isTimeConflictWith(otherTable) {
  for (var i = 0; i < this.unitCounts; i++) {
    if (
      this.activities[i].length !== 0 &&
      otherTable.activities[i].length !== 0
    ) {
      for (var m = 0; m < this.activities[i].length; m++) {
        for (var n = 0; n < otherTable.activities[i].length; n++) {
          for (var k = 0; k < this.activities[i][m].vaildWeeks.length; k++) {
            if (
              this.activities[i][m].vaildWeeks.charAt(k) == "1" &&
              otherTable.activities[i][n].vaildWeeks.charAt(k) == "1"
            ) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

/**
 * aggreagate activity of same course. first merge the activity of same
 * (teacher,course,room). then output mashal vaildWeek string . if course is
 * null. the course name will be ommited in last string. style is
 * -------------------------------- | teacher1Name course1Name | |
 * (odd1-2,room1Name) | | (even2-4,room2Name) | | teacher2Name course1Name | |
 * (odd3-6,room1Name) | | (even5-8,room2Name) |
 * ----------------------------------
 *
 * @param index
 *            time unit index
 * @param from
 *            start position in year occupy week
 * @param startWeek
 *            bengin position from [from]
 * @param endWeek
 *            end position from [from]
 */
function marshalByTeacherCourse(index, from, startWeek, endWeek) {
  var validStart = from + startWeek - 2;
  if (this.activities[index].length === 0) {
    return "";
  }
  if (this.activities[index].length == 1) {
    var cname = this.activities[index][0].courseName;
    var tname = "";
    if (this.activities[index][0].teacherName != "") {
      tname += "(" + this.activities[index][0].teacherName + ")";
    }
    var assistantName = "";
    if (this.activities[index][0].assistantName != "") {
      assistantName += "(" + this.activities[index][0].assistantName + ")";
    }
    var experiItemName = "";
    if (this.activities[index][0].experiItemName != "") {
      experiItemName += "(" + this.activities[index][0].experiItemName + ")";
    }
    return (
      cname +
      " " +
      tname +
      delimiter +
      assistantName +
      delimiter +
      experiItemName +
      delimiter +
      "(" +
      this.activities[index][0]
        .adjustClone(this.endAtSat, validStart, false)
        .marshal(from, startWeek, endWeek) +
      ")"
    );
  } else {
    var marshalString = "";
    var tempActivities = new Array();
    tempActivities[0] = this.activities[index][0].adjustClone(
      this.endAtSat,
      validStart,
      true
    );
    // merge this.activities to tempActivities by same courseName and
    // roomId .start with 1.
    for (var i = 1; i < this.activities[index].length; i++) {
      var merged = false;
      for (var j = 0; j < tempActivities.length; j++) {
        if (this.activities[index][i].canMergeWith(tempActivities[j])) {
          // alert(tempActivities[j]+"\n"
          // +this.activities[index][i]);
          merged = true;
          var secondWeeks = this.activities[index][i].vaildWeeks;
          if (
            this.activities[index][i].needLeftShift(this.endAtSat, validStart)
          ) {
            secondWeeks =
              this.activities[index][i].vaildWeeks.substring(1, 53) + "0";
          }
          tempActivities[j].vaildWeeks = or(
            tempActivities[j].vaildWeeks,
            secondWeeks
          );
        }
      }
      if (!merged) {
        tempActivities[tempActivities.length] = this.activities[index][
          i
        ].adjustClone(this.endAtSat, validStart, false);
      }
    }

    // marshal tempActivities
    for (var m = 0; m < tempActivities.length; m++) {
      if (tempActivities[m] === null) {
        continue;
      }
      var courseName = tempActivities[m].courseName;
      var teacherName = "";
      if (tempActivities[m].teacherName != "") {
        teacherName += "(" + tempActivities[m].teacherName + ")";
      }
      var assistantName = "";
      if (tempActivities[m].assistantName != "") {
        assistantName += "(" + tempActivities[m].assistantName + ")";
      }
      var experiItemName = "";
      if (tempActivities[m].experiItemName != "") {
        experiItemName += "(" + tempActivities[m].experiItemName + ")";
      }
      // add teacherName and courseName
      if (courseName !== null) {
        marshalString +=
          delimiter + courseName + " " + teacherName; /* alert(courseName); */
      }
      marshalString +=
        delimiter +
        "(" +
        tempActivities[m].marshal(from, startWeek, endWeek) +
        ")";
      for (var n = m + 1; n < tempActivities.length; n++) {
        // marshal same courseName activity
        if (
          tempActivities[n] !== null &&
          courseName == tempActivities[n].courseName &&
          teacherName == tempActivities[n].teacherName &&
          assistantName == tempActivities[n].assistantName &&
          experiItemName == tempActivities[n].experiItemName
        ) {
          marshalString +=
            delimiter +
            "(" +
            tempActivities[n].marshal(from, startWeek, endWeek) +
            ")";
          tempActivities[n] = null;
        }
      }
    }

    if (marshalString.indexOf(delimiter) === 0) {
      return marshalString.substring(delimiter.length);
    } else {
      return marshalString;
    }
  }
}

// return true,if this.activities[first] and this.activities[second] has
// same activities .
function isSameActivities(first, second) {
  if (this.activities[first].length != this.activities[second].length) {
    return false;
  }
  if (this.activities[first].length == 1) {
    return this.activities[first][0].isSame(this.activities[second][0]);
  }
  for (var i = 0; i < this.activities[first].length; i++) {
    var find = false;
    for (var j = 0; j < this.activities[second].length; j++) {
      if (this.activities[first][i].isSame(this.activities[second][j])) {
        find = true;
        break;
      }
    }
    if (find === false) {
      return false;
    }
  }
  return true;
}
/**
 * 妫€鏌ユ槸鍚﹂渶瑕佽繘琛屽乏绉诲姩
 */
function needLeftShift(endAtSat, start) {
  return (
    !endAtSat &&
    this.vaildWeeks.substring(0, start).indexOf("1") != -1 &&
    this.vaildWeeks.substring(start).indexOf("1") == -1
  );
}
/**
 * 鏍规嵁骞翠唤鏄惁浠ュ懆鍏粨鏉�,璋冩暣鍗犵敤鍛�. 濡傛灉鍦ㄨ捣濮嬪懆涔嬪墠鏈夊崰鐢ㄥ懆,鍙湁娌℃湁鍒欒〃绀哄彲浠ヨ繘琛岃皟鑺�.
 */
function leftShift() {
  this.vaildWeeks = this.vaildWeeks.substring(1, 53) + "0";
  // alert("leftShift:"+this.vaildWeeks);
}
/**
 * 鏍规嵁璇ュ勾浠芥槸鍚︾粨鏉熶簬鏄熸湡鍏紝璋冩暣鏁欏宸炵殑鍗犵敤涓层€� 濡傛灉娌℃湁璋冩暣鍒欒繑鍥炲師鏉ョ殑activity.鍚﹀垯杩斿洖璋冩暣鍚庣殑鏂扮殑activity銆�
 *
 * @activity 瑕佽皟鏁寸殑鏁欏娲诲姩
 * @endAtStat 璇ユ椿鍔ㄧ殑骞翠唤鏄惁缁撴潫浜庢槦鏈熷叚
 * @start 浠庝綍涓烘妫€鏌ユ湁鏁堢殑鏁欏鍛�
 * @mustClone 鏄惁蹇呴』鍏嬮殕
 */
function adjustClone(endAtSat, start, mustClone) {
  if (mustClone) {
    var newActivity = this.clone();
    if (newActivity.needLeftShift(endAtSat, start)) {
      newActivity.leftShift();
    }
    return newActivity;
  } else {
    if (this.needLeftShift(endAtSat, start)) {
      var activity = this.clone();
      activity.leftShift(start);
      return activity;
    } else {
      return this;
    }
  }
}
// new taskAcitvity
function TaskActivity(
  teacherId,
  teacherName,
  courseId,
  courseName,
  roomId,
  roomName,
  vaildWeeks,
  taskId,
  remark,
  assistantName,
  experiItemName
) {
  this.teacherId = teacherId;
  this.teacherName = teacherName;
  this.courseId = courseId;
  this.courseName = courseName;
  this.roomId = roomId;
  this.roomName = roomName;
  this.vaildWeeks = vaildWeeks; // 53涓�01缁勬垚鐨勫瓧绗︿覆锛屼唬琛ㄤ簡涓€骞寸殑53鍛�
  this.taskId = taskId;
  this.marshal = marshalValidWeeks;
  this.addAbbreviate = addAbbreviate;
  this.clone = cloneTaskActivity;
  this.canMergeWith = canMergeWith;
  this.isSame = isSameActivity;
  this.toString = activityInfo;
  this.adjustClone = adjustClone;
  this.leftShift = leftShift;
  this.needLeftShift = needLeftShift;
  this.remark = remark;
  this.assistantName = assistantName;
  this.experiItemName = experiItemName;
}

// clone a activity
function cloneTaskActivity() {
  return new TaskActivity(
    this.teacherId,
    this.teacherName,
    this.courseId,
    this.courseName,
    this.roomId,
    this.roomName,
    this.vaildWeeks,
    this.taskId,
    this.remark,
    this.assistantName,
    this.experiItemName
  );
}
//
function marshalTable(from, startWeek, endWeek) {
  for (var k = 0; k < this.unitCounts; k++) {
    if (this.activities[k].length > 0) {
      this.marshalContents[k] = this.marshal(k, from, startWeek, endWeek);
    }
  }
}

function marshalTableForAdminclass(from, startWeek, endWeek) {
  for (var k = 0; k < this.unitCounts; k++) {
    if (this.activities[k].length > 0) {
      this.marshalContents[k] = this.marshalForAdminclass(
        k,
        from,
        startWeek,
        endWeek
      );
    }
  }
}

function marshalForAdminclass(index, from, startWeek, endWeek) {
  var validStart = from + startWeek - 2;
  if (this.activities[index].length === 0) {
    return "";
  }
  if (this.activities[index].length == 1) {
    var cname = this.activities[index][0].courseName;
    var tname = this.activities[index][0].teacherName;
    var roomOccupancy =
      "(" +
      this.activities[index][0]
        .adjustClone(this.endAtSat, validStart, false)
        .marshal(from, startWeek, endWeek) +
      ")";
    return tname + " " + cname + roomOccupancy;
  } else {
    var marshalString = "";
    var tempActivities = new Array();
    tempActivities[0] = this.activities[index][0].adjustClone(
      this.endAtSat,
      validStart,
      true
    );
    // merge this.activities to tempActivities by same courseName and
    // roomId .start with 1.
    for (var i = 1; i < this.activities[index].length; i++) {
      var merged = false;
      for (var j = 0; j < tempActivities.length; j++) {
        if (this.activities[index][i].canMergeWith(tempActivities[j])) {
          // alert(tempActivities[j]+"\n"
          // +this.activities[index][i]);
          merged = true;
          var secondWeeks = this.activities[index][i].vaildWeeks;
          if (
            this.activities[index][i].needLeftShift(this.endAtSat, validStart)
          ) {
            secondWeeks =
              this.activities[index][i].vaildWeeks.substring(1, 53) + "0";
          }
          tempActivities[j].vaildWeeks = or(
            tempActivities[j].vaildWeeks,
            secondWeeks
          );
        }
      }
      if (!merged) {
        tempActivities[tempActivities.length] = this.activities[index][
          i
        ].adjustClone(this.endAtSat, validStart, false);
      }
    }

    // marshal tempActivities
    for (var m = 0; m < tempActivities.length; m++) {
      if (tempActivities[m] === null) {
        continue;
      }
      var courseName = tempActivities[m].courseName;
      var teacherName = tempActivities[m].teacherName;
      // add teacherName and courseName
      var tipStr = "";
      if (courseName !== null) {
        tipStr =
          courseName +
          "(" +
          tempActivities[m].marshal(from, startWeek, endWeek) +
          ")";
      }
      if (marshalString.indexOf(tipStr) == -1) {
        marshalString += delimiter + tipStr;
      }
    }

    if (marshalString.indexOf(delimiter) === 0) {
      return marshalString.substring(delimiter.length);
    } else {
      return marshalString;
    }
  }
}

/***************************************************************************
 * course table dispaly occupy of teacher,room and andminClass. It also
 * represent data model of any course arrangement. For example student's
 * course table,single course's table,teacher's course table,and
 * adminClass's course table,even major's .
 **************************************************************************/
function CourseTable(year, unitCounts, type) {
  this.unitCounts = unitCounts;
  this.activities = [unitCounts];
  this.type = type;
  this.year = year;
  var date = new Date();
  // 鏃ユ湡涓殑鏈堜唤涓鸿鏈堜唤鐨勬暟瀛楀噺涓€
  date.setFullYear(year, 11, 31);
  this.endAtSat = false;
  if (6 == date.getDay()) {
    this.endAtSat = true;
  }

  this.marshalContents = new Array(unitCounts);
  for (var k = 0; k < unitCounts; k++) {
    this.activities[k] = [];
  }

  this.mergeAll = mergeAll;
  this.marshal = marshalByTeacherCourse;
  // return true,if this.activities[first] and this.activities[second] has
  // same vaildWeeks and roomId pair set.
  this.isSame = isSameActivities;
  this.isTimeConflictWith = isTimeConflictWith;
  this.marshalTable = marshalTable;
  this.marshalTableForAdminclass = marshalTableForAdminclass;
  this.fill = fillTable;
  this.marshalForAdminclass = marshalForAdminclass;
}

function fillTable(tableId, weeks, units) {
  for (var k = 0; k < this.unitCounts; k++) {
    if (this.marshalContents[k] != null) {
      console.log(this.marshalContents[k]);
    }
  }
}
/***************************************************************************
 * 娣诲姞涓€涓皬鑺備腑鐨勬暀瀛︽椿鍔ㄧ粍鎴愪竴涓椿鍔ㄩ泦. * *
 **************************************************************************/
// add acitity to cluster.and weekInex from 0 to weeks-1
function addActivityToCluster(
  teacherId,
  teacherName,
  roomId,
  roomName,
  weekIndex
) {
  // alert("addActivityToCluster:"+weekIndex)
  if (null == this.weeksMap[teacherId + roomId]) {
    this.weeksMap[teacherId + roomId] = new Array(this.weeks);
    this.activityMap[teacherId + roomId] = new TaskActivity(
      teacherId,
      teacherName,
      this.courseId,
      this.courseName,
      roomId,
      roomName,
      ""
    );
  }
  this.weeksMap[teacherId + roomId][weekIndex] = "1";
}
/**
 * 鍚堝苟璇剧▼琛ㄤ腑鐩稿悓鐨勫崟鍏冩牸
 */
function mergeCellOfCourseTable(weeks, units) {
  for (var i = 0; i < weeks; i++) {
    for (var j = 0; j < units - 1; j++) {
      var index = units * i + j;
      var preTd = document.getElementById("TD" + index);
      var nextTd = document.getElementById("TD" + (index + 1));
      while (
        preTd.innerHTML !== "" &&
        nextTd.innerHTML !== "" &&
        preTd.innerHTML == nextTd.innerHTML
      ) {
        preTd.parentNode.removeChild(nextTd);
        var spanNumber = new Number(preTd.colSpan);
        spanNumber++;
        preTd.colSpan = spanNumber;
        j++;
        if (j >= units - 1) {
          break;
        }
        index = index + 1;
        nextTd = document.getElementById("TD" + (index + 1));
      }
    }
  }
}
/*
 * construct a valid Weeks from this.weeksMap by key teacherRoomId this
 * startweek is the position of this.weeksMap[teacherRoomId] in return
 * validWeekStr also it has mininal value 1;
 */
function constructValidWeeks(startWeek, teacherRoomId) {
  // alert("enter constructValidWeeks")
  // as many as possible weeks with in a year
  var firstWeeks = new Array(weeksPerYear);
  var secondWeeks = null;
  var weeksThisYear = "";
  for (var i = 0; i < weeksPerYear - 1; i++) {
    firstWeeks[i] = "0";
  }
  for (
    var weekIndex = 0;
    weekIndex < this.weeksMap[teacherRoomId].length;
    weekIndex++
  ) {
    var occupy = "0";
    if (this.weeksMap[teacherRoomId][weekIndex] === undefined) occupy == "0";
    else occupy = "1";
    // 璁＄畻鍗犵敤鍛ㄧ殑浣嶇疆
    var weekIndexNum = new Number(weekIndex);
    weekIndexNum += startWeek - 1;

    if (weekIndexNum < weeksPerYear) {
      firstWeeks[weekIndexNum] = occupy;
    } else {
      if (null == secondWeeks) {
        // 鐢熸垚涓嬩竴骞寸殑鍗犵敤鎯呭喌
        secondWeeks = new Array();
        for (var i = 0; i < weeksPerYear - 1; i++) {
          secondWeeks[i] = "0";
        }
      }
      secondWeeks[(weekIndexNum + (this.endAtSat ? 0 : 1)) % weeksPerYear] =
        occupy;
    }
  }
  for (i = 0; i < weeksPerYear; i++) {
    weeksThisYear += firstWeeks[i] == null ? "0" : firstWeeks[i];
  }
  // alert(weeksThisYear)
  var weekState = new Array();

  if (weeksThisYear.indexOf("1") != -1) {
    weekState[weekState.length] = weeksThisYear;
  }
  var weeksNextYear = "";
  if (null != secondWeeks) {
    for (i = 0; i < weeksPerYear; i++) {
      weeksNextYear += secondWeeks[i] === undefined ? "0" : secondWeeks[i];
    }
    if (weeksNextYear.indexOf("1") != -1) {
      weekState[weekState.length] = weeksNextYear;
    }
    // alert(weeksNextYear);
  }
  // alert(weekState)
  return weekState;
}
/**
 * 鏋勯€犳暀瀛︽椿鍔�
 *
 */
function constructActivities(startWeek) {
  // alert("enter constructActivities")
  var activities = new Array();
  for (var teacherRoomId in this.activityMap) {
    var weekState = this.constructValidWeeks(startWeek, teacherRoomId);
    this.activityMap[teacherRoomId].vaildWeeks = weekState[0];
    this.activityMap[teacherRoomId].remark = this.remark;
    activities[activities.length] = this.activityMap[teacherRoomId];
    if (weekState.length == 2) {
      var cloned = this.activityMap[teacherRoomId].clone();
      cloned.vaildWeeks = weekState[1];
      activities[activities.length] = cloned;
      // alert(cloned)
    }
    // alert(this.activityMap[teacherRoomId]);
  }
  return activities;
}

/**
 * all activities in each unit consists a ActivityCluster
 */
function ActivityCluster(year, courseId, courseName, weeks, remark) {
  this.year = year;
  var date = new Date();
  date.setFullYear(year, 11, 31);
  this.endAtSat = false;
  if (6 == date.getDay()) {
    this.endAtSat = true;
  }
  this.courseId = courseId;
  this.courseName = courseName;
  this.weeks = weeks;
  this.remark = remark;
  this.weeksMap = {};
  this.activityMap = {};
  this.add = addActivityToCluster;
  this.constructValidWeeks = constructValidWeeks;
  this.genActivities = constructActivities;
}
