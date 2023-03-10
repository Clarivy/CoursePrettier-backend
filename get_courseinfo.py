import asyncio
import json

from ShanghaiTechOneAPI.Credential import Credential
from ShanghaiTechOneAPI.Eams import Eams, CourseCalender

credential = json.load(open('credential.json'))
courseinfo = None


async def main():
    global courseinfo
    async with Credential(credential["id"]) as cred:
        await cred.login(credential["password"])
        eams = Eams(cred)
        await eams.login()
        cc = CourseCalender(eams)
        courseinfo = await cc.get_courseinfo(
            output_file='./data/courseinfo.json'
        )

loop = asyncio.get_event_loop()
loop.run_until_complete(main())