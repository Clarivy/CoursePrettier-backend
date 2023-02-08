from hashlib import md5
from datetime import datetime, timedelta
from Info import CLASS_PERIOD, CLASS_TIME, CLASS_NUM, WEEK_LEN
import json

def week_str_to_list(week_str: str) -> list[int]:
	return list(filter(
		lambda item: item != None,
		map(
			lambda item: item[0] if item[1] == "1" else None,
			enumerate(week_str)
		)
	))

def check_course_equal(course_a, course_b) -> bool:
	if course_a["teacherName"] != course_b["teacherName"]:
		return False
	if course_a["courseName"] != course_b["courseName"]:
		return False
	if course_a["vaildWeeks"] != course_b["vaildWeeks"]:
		return False
	return True

class ICS_Exporter():

	"""
		Transform course info to ICS files
		Forked from https://github.com/junyilou/python-ical-timetable and wrapped as helper class 
	"""
	
	def __init__(self, start_monday:list[int]) -> None:
		"""
		start_monday:
			the first day of the semaster in the format of [YY, MM, DD], eg. [2023, 2, 6]
		"""
		self.get_geo = lambda classroom: f"LOCATION:{classroom}\n"
		self.start_monday = start_monday
		self.classes = []
	
	def parse_json(self, input_file:str) -> None:
		"""
		Parse a json file and export
		input_file:
			path to json file
		"""
		data = None
		with open(input_file, "r", encoding='utf-8') as f:
			data = json.load(f)
		course_table = [ [[] for i in range(CLASS_NUM) ] for j in range(WEEK_LEN) ]

		def to_list_index(week_index:int, unit_index: int) -> int:
			return week_index * CLASS_NUM + unit_index 
		
		# Remove duplicate items
		for week_index in range(0, WEEK_LEN):
			for unit_index in range(CLASS_NUM - 1, -1, -1):
				data_index = to_list_index(week_index, unit_index)
				course_table[week_index][unit_index] = data[data_index]
				if unit_index == 0:
					break
				last_courses = data[data_index - 1]
				for i in range(len(data[data_index]) - 1, -1, -1):
					current_course = data[data_index][i]
					for j in range(len(last_courses)):
						target_course = last_courses[j]
						if check_course_equal(current_course, target_course):
							if current_course.get("endTime"):
								data[data_index - 1][j]["endTime"] = current_course["endTime"]
							else:
								data[data_index - 1][j]["endTime"] = unit_index + 1
							course_table[week_index][unit_index].pop(i)
							break
			

				
			for week_index in range(0, WEEK_LEN):
				for unit_index in range(0, CLASS_NUM):
					for course in course_table[week_index][unit_index]:
						if not course.get("endTime"):
							course["endTime"] = unit_index + 1
						course_info = [
							course["courseName"],
							course["teacherName"],
							course["roomName"],
							week_str_to_list(course["vaildWeeks"]),
							week_index + 1,
							[unit_index + 1, course["endTime"]]
						]
						self.classes.append(course_info)
						
				# [Name, Teacher, Location, classWeek, classWeekday, classOrder] = Class 
				
	def export(self, output_file:str) -> None:
		classTime = [None, *CLASS_TIME]
		weeks = [None]
		starterDay = datetime(*self.start_monday)
		for i in range(1, 30):
			singleWeek = [None]
			for d in range(0, 7):
				singleWeek.append(starterDay)
				starterDay += timedelta(days = 1)
			weeks.append(singleWeek)
		uid_generate = lambda k: md5(k.encode("utf-8")).hexdigest()

		iCal = """BEGIN:VCALENDAR
		METHOD:PUBLISH
		VERSION:2.0
		X-WR-CALNAME:课表
		X-WR-TIMEZONE:Asia/Shanghai
		CALSCALE:GREGORIAN
		BEGIN:VTIMEZONE
		TZID:Asia/Shanghai
		END:VTIMEZONE"""

		runtime = datetime.now().strftime('%Y%m%dT%H%M%SZ')

		for Class in self.classes:
			[className, Teacher, Location, classWeek, classWeekday, classOrder] = Class

			for timeWeek in classWeek:
				classDate = weeks[timeWeek][classWeekday]
				startTime = classTime[classOrder[0]]
				endTime = classTime[classOrder[-1]]
				classStartTime = classDate + timedelta(minutes = startTime[0] * 60 + startTime[1])
				classEndTime = classDate + timedelta(minutes = endTime[0] * 60 + endTime[1] + CLASS_PERIOD)
				Description = f"{Teacher}"

				StartTime = classStartTime.strftime('%Y%m%dT%H%M%S')
				EndTime = classEndTime.strftime('%Y%m%dT%H%M%S')
				iCal += f"""
		BEGIN:VEVENT
		DTEND;TZID=Asia/Shanghai:{EndTime}
		DESCRIPTION:{Description}
		UID:{uid_generate(className + StartTime)}
		DTSTAMP:{runtime}
		URL;VALUE=URI:
		SUMMARY:{className}
		DTSTART;TZID=Asia/Shanghai:{StartTime}
		{self.get_geo(Location)}
		END:VEVENT"""

		iCal += "END:VCALENDAR"

		with open(f"{output_file}", "w", encoding = "utf-8") as w:
			w.write(iCal)

if __name__ == "__main__":
	exporter = ICS_Exporter(start_monday=[2023, 2, 6])
	exporter.parse_json("./courseinfo.json")
	exporter.export("./test.ics")