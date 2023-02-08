import logging
import re
import subprocess
import shutil
from typing import Optional, Dict, Any, List

import pyjson5
from aiohttp import ClientSession, FormData
from bs4 import BeautifulSoup

from ShanghaiTechOneAPI.Credential import Credential
from ShanghaiTechOneAPI.Exception import FailToLogin


class Eams:
    """
    Eams类, 用于进行各种Eams操作
    """

    def __init__(self, credential: Credential):
        """
        Eams类 构造函数
        """
        self.is_login = False
        self.session: ClientSession = credential.session
        self.credential: Credential = credential

    async def login(self):
        content = await self.enter('https://eams.shanghaitech.edu.cn/eams/home.action')
        content = content.decode('utf-8')
        if content.find('注 销') == -1:
            raise FailToLogin("Eams")
        else:
            self.is_login = True

    async def enter(self, url):
        async with self.session.get(url) as response:
            content = await response.read()
            return content


class CourseCalender:
    def __init__(self, emas: Eams):
        """
        CourseCalender 类 构造函数
        """
        self.main_url: Optional[str] = None
        self.query_course_selection_status_url: Optional[str] = None
        self.query_course_basic_info_url: Optional[str] = None
        self.change_taking_course_url: Optional[str] = None
        self.profile_id: Optional[int] = None
        self.credit_limit_for_the_semester: Optional[int] = None
        self.selected_credit: Optional[int] = None
        self.emas: Eams = emas
        self.session = emas.session

    async def get_courseinfo(self, output_file: str = 'courseinfo.json', temp_file: str = "courseinfo.js") -> list[str]:
        await self.emas.enter("https://eams.shanghaitech.edu.cn/eams/courseTableForStd.action")
        async with self.session.post("https://eams.shanghaitech.edu.cn/eams/courseTableForStd!courseTable.action?ignoreHead=1&setting.kind=std&startWeek=&semester.id=202&ids=7083&tutorRedirectstudentId=7083") as response:
            soup = BeautifulSoup(await response.read(), 'html.parser')
            with open(temp_file, "w", encoding='utf-8') as f:
                f.write(soup.find_all("script")[-2].text)

        with open('merged.js', 'wb') as wfd:
            for f in ['./HackHeader.js', temp_file, 'HackFooter.js']:
                with open(f, 'rb') as fd:
                    shutil.copyfileobj(fd, wfd)
        run_result = subprocess.run(["node", "merged.js"], env={"OUTPUT_PATH": 'courseinfo.json'}, capture_output=True)
        if run_result.returncode != 0:
            raise Exception(run_result.stderr)
