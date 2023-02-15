import logging
import re
import subprocess
import shutil
import os
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
    
    def find_table_id(self, soup: BeautifulSoup) -> str:
        script_tags = soup.find_all('script')
        for tag in script_tags:
            match = re.search("bg.form.addInput\(form,\"ids\",\"\d+\"\)", tag.text)
            if match:
                return match.group(0).split('"')[-2]
        raise ValueError("Cannot find table id")

    async def get_courseinfo(self, output_file: str, work_dir: str = "./temp/") -> None:
        eams_content = await self.emas.enter("https://eams.shanghaitech.edu.cn/eams/courseTableForStd.action")
        eams_soup = BeautifulSoup(eams_content, 'html.parser')
        table_id = self.find_table_id(eams_soup)

        script_file = os.path.join(work_dir, 'courseinfo.js')
        merged_file = os.path.join(work_dir, 'merged.js')

        async with self.session.post(f"https://eams.shanghaitech.edu.cn/eams/courseTableForStd!courseTable.action?ignoreHead=1&setting.kind=std&startWeek=&semester.id=203&ids={table_id}&tutorRedirectstudentId={table_id}") as response:
            table_soup = BeautifulSoup(await response.read(), 'html.parser')
            with open(script_file, "w", encoding='utf-8') as f:
                f.write(table_soup.find_all("script")[-2].text)

        with open(merged_file, 'wb') as wfd:
            for f in ['./HackHeader.js', script_file, 'HackFooter.js']:
                with open(f, 'rb') as fd:
                    shutil.copyfileobj(fd, wfd)
        run_result = subprocess.run(["node", merged_file], env={"OUTPUT_PATH": output_file}, capture_output=True)
        os.remove(merged_file)
        if run_result.returncode != 0:
            raise Exception(run_result.stderr)

