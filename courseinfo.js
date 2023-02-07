
	// function CourseTable in TaskActivity.js
	var language = "zh";
	var table0 = new CourseTable(2022,91);
	var unitCount = 13;
	var index=0;
	var activity=null;
		var teachers = [{id:1185,name:"邵子瑜",lab:false}];
		var actTeachers = [{id:1185,name:"邵子瑜",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"5608(SI140A.01)","面向信息科学的概率论与数理统计(SI140A.01)","229","教学中心301","01111111111111111000000000000000000000000000000000000",null,null,assistantName,"");
			index =1*unitCount+2;
			table0.activities[index][table0.activities[index].length]=activity;
			index =1*unitCount+3;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:1185,name:"邵子瑜",lab:false}];
		var actTeachers = [{id:1185,name:"邵子瑜",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"5608(SI140A.01)","面向信息科学的概率论与数理统计(SI140A.01)","229","教学中心301","01111111111111111000000000000000000000000000000000000",null,null,assistantName,"");
			index =3*unitCount+2;
			table0.activities[index][table0.activities[index].length]=activity;
			index =3*unitCount+3;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:1948,name:"赵登吉",lab:false},{id:9429893,name:"耿浩",lab:false}];
		var actTeachers = [{id:1948,name:"赵登吉",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"2586(CS101.01)","算法与数据结构(CS101.01)","230","教学中心302","00000000011111111000000000000000000000000000000000000",null,null,assistantName,"");
			index =0*unitCount+0;
			table0.activities[index][table0.activities[index].length]=activity;
			index =0*unitCount+1;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:1948,name:"赵登吉",lab:false},{id:9429893,name:"耿浩",lab:false}];
		var actTeachers = [{id:1948,name:"赵登吉",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"2586(CS101.01)","算法与数据结构(CS101.01)","230","教学中心302","00000000011111111000000000000000000000000000000000000",null,null,assistantName,"");
			index =2*unitCount+0;
			table0.activities[index][table0.activities[index].length]=activity;
			index =2*unitCount+1;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:1948,name:"赵登吉",lab:false},{id:9429893,name:"耿浩",lab:false}];
		var actTeachers = [{id:9429893,name:"耿浩",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"2586(CS101.01)","算法与数据结构(CS101.01)","230","教学中心302","01111111100000000000000000000000000000000000000000000",null,null,assistantName,"");
			index =0*unitCount+0;
			table0.activities[index][table0.activities[index].length]=activity;
			index =0*unitCount+1;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:1948,name:"赵登吉",lab:false},{id:9429893,name:"耿浩",lab:false}];
		var actTeachers = [{id:9429893,name:"耿浩",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"2586(CS101.01)","算法与数据结构(CS101.01)","230","教学中心302","01111111100000000000000000000000000000000000000000000",null,null,assistantName,"");
			index =2*unitCount+0;
			table0.activities[index][table0.activities[index].length]=activity;
			index =2*unitCount+1;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:7736096,name:"Goodin Brett Garrett",lab:false}];
		var actTeachers = [{id:7736096,name:"Goodin Brett Garrett",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"4771(GEHA1114.02)","1770年到1920年间的美国史(GEHA1114.02)","236","教学中心404","01111111111111111000000000000000000000000000000000000",null,null,assistantName,"");
			index =1*unitCount+9;
			table0.activities[index][table0.activities[index].length]=activity;
			index =1*unitCount+10;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:7234404,name:"刘文武",lab:false}];
		var actTeachers = [{id:7234404,name:"刘文武",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"1561(GEPE1032.01)","武术 I(GEPE1032.01)","1414","武术房","01111111111111111000000000000000000000000000000000000",null,null,assistantName,"");
			index =2*unitCount+4;
			table0.activities[index][table0.activities[index].length]=activity;
			index =2*unitCount+5;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:1489395,name:"郑杰",lab:false}];
		var actTeachers = [{id:1489395,name:"郑杰",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"2584(CS177H.01)","生物信息学：软件开发与应用(CS177H.01)","-1","停课","00000000100000000000000000000000000000000000000000000",null,null,assistantName,"");
			index =0*unitCount+6;
			table0.activities[index][table0.activities[index].length]=activity;
			index =0*unitCount+7;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:1489395,name:"郑杰",lab:false}];
		var actTeachers = [{id:1489395,name:"郑杰",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"2584(CS177H.01)","生物信息学：软件开发与应用(CS177H.01)","-1","停课","00000000100000000000000000000000000000000000000000000",null,null,assistantName,"");
			index =2*unitCount+6;
			table0.activities[index][table0.activities[index].length]=activity;
			index =2*unitCount+7;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:1489395,name:"郑杰",lab:false}];
		var actTeachers = [{id:1489395,name:"郑杰",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"2584(CS177H.01)","生物信息学：软件开发与应用(CS177H.01)","222","信息学院1D-108","01111111011110000000000000000000000000000000000000000",null,null,assistantName,"");
			index =0*unitCount+6;
			table0.activities[index][table0.activities[index].length]=activity;
			index =0*unitCount+7;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:1489395,name:"郑杰",lab:false}];
		var actTeachers = [{id:1489395,name:"郑杰",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"2584(CS177H.01)","生物信息学：软件开发与应用(CS177H.01)","222","信息学院1D-108","01111111011110000000000000000000000000000000000000000",null,null,assistantName,"");
			index =2*unitCount+6;
			table0.activities[index][table0.activities[index].length]=activity;
			index =2*unitCount+7;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:7443381,name:"李权",lab:false}];
		var actTeachers = [{id:7443381,name:"李权",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"5305(ARTS1422.01)","数据可视化(ARTS1422.01)","1094","创艺学院E307","01111111111110000000000000000000000000000000000000000",null,null,assistantName,"");
			index =1*unitCount+6;
			table0.activities[index][table0.activities[index].length]=activity;
			index =1*unitCount+7;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:7443381,name:"李权",lab:false}];
		var actTeachers = [{id:7443381,name:"李权",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"5305(ARTS1422.01)","数据可视化(ARTS1422.01)","1094","创艺学院E307","01111111111110000000000000000000000000000000000000000",null,null,assistantName,"");
			index =3*unitCount+6;
			table0.activities[index][table0.activities[index].length]=activity;
			index =3*unitCount+7;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:8714901,name:"张晨璐",lab:false},{id:8707059,name:"盖景鹏",lab:false}];
		var actTeachers = [{id:8707059,name:"盖景鹏",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"2023(BIO1011.02)","现代生命科学导论C(BIO1011.02)","238","教学中心406","00000000011111111000000000000000000000000000000000000",null,null,assistantName,"");
			index =0*unitCount+2;
			table0.activities[index][table0.activities[index].length]=activity;
			index =0*unitCount+3;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:8714901,name:"张晨璐",lab:false},{id:8707059,name:"盖景鹏",lab:false}];
		var actTeachers = [{id:8714901,name:"张晨璐",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"2023(BIO1011.02)","现代生命科学导论C(BIO1011.02)","238","教学中心406","01111111100000000000000000000000000000000000000000000",null,null,assistantName,"");
			index =0*unitCount+2;
			table0.activities[index][table0.activities[index].length]=activity;
			index =0*unitCount+3;
			table0.activities[index][table0.activities[index].length]=activity;
		var teachers = [{id:8714901,name:"张晨璐",lab:false},{id:8707059,name:"盖景鹏",lab:false}];
		var actTeachers = [{id:8707059,name:"盖景鹏",lab:false}];
		var assistant = _.filter(actTeachers, function(actTeacher) {
			return (_.where(teachers, {id:actTeacher.id,name:actTeacher.name,lab:actTeacher.lab}).length == 0) && (actTeacher.lab == true);
		});
		var assistantName = "";
		if (assistant.length > 0) {
			assistantName = assistant[0].name;
			actTeachers = _.reject(actTeachers, function(actTeacher) {
				return _.where(assistant, {id:actTeacher.id}).length > 0;
			});
		}
		var actTeacherId = [];
		var actTeacherName = [];
		for (var i = 0; i < actTeachers.length; i++) {
			actTeacherId.push(actTeachers[i].id);
			actTeacherName.push(actTeachers[i].name);
		}
			activity = new TaskActivity(actTeacherId.join(','),actTeacherName.join(','),"2023(BIO1011.02)","现代生命科学导论C(BIO1011.02)","238,237","教学中心406,教学中心405","00101010101010101000000000000000000000000000000000000",null,null,assistantName,"");
			index =2*unitCount+2;
			table0.activities[index][table0.activities[index].length]=activity;
			index =2*unitCount+3;
			table0.activities[index][table0.activities[index].length]=activity;
	table0.marshalTable(2,1,18);
	fillTable(table0,7,13,0);
