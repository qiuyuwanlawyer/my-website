#!/usr/bin/env python3
"""调用 EdgeOne OpenAPI 刷新缓存（CreatePurgeTask，官方 SDK 签名）。
凭据从 ~/.cos.conf 读取，只输出 API 响应，不输出密钥。
用法：python3 purge_eo_sdk.py [purge_all | purge_url url1 url2 ...]
"""
import configparser
import json
import os
import sys

from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.teo.v20220901 import models, teo_client

ZONE_ID = "zone-3uif2ps7a5oy"

config = configparser.ConfigParser()
config.read(os.path.expanduser("~/.cos.conf"))
cred = credential.Credential(config["common"]["secret_id"], config["common"]["secret_key"])

http_profile = HttpProfile(endpoint="teo.tencentcloudapi.com")
client = teo_client.TeoClient(cred, "", ClientProfile(httpProfile=http_profile))

req = models.CreatePurgeTaskRequest()
req.ZoneId = ZONE_ID
task_type = sys.argv[1] if len(sys.argv) > 1 else "purge_all"
req.Type = task_type
if task_type == "purge_url":
    req.Targets = sys.argv[2:]

try:
    resp = client.CreatePurgeTask(req)
    print(json.dumps(json.loads(resp.to_json_string()), ensure_ascii=False, indent=2))
except Exception as err:
    print(f"失败: {err}")
    sys.exit(1)
