import requests

# This data was created by using the curl method explained above
headers_list = [
    {
        "name": "NKS hospital location",
        "address": "gulabi bagh",
        "maps_link": "https://goo.gl/maps/Qk2q3dKerjthKxPV9",
        "contact": [+911123666666, +919090928291],
        "oxygen": {
            "required": 100,
            "current": 20,
            "comment": "2 hrs of oxygen left",
            "lastUpdated": ""
        }
    }
]


url = 'https://co-ox9-default-rtdb.asia-southeast1.firebasedatabase.app/hospitals/-MZh0evZGFhGlnqDjFWr.json'
# # Get a proxy from the pool
try:

    for header in headers_list:
        response = requests.post(url, json=header, timeout=5)
        print(response.json())
        # headers = random.choice(headers_list)
        # r = requests.Session()
        # r.headers = headers
        # response2 = r.get(headersUrl, proxies={"http": proxy, "https": proxy}, timeout=5)
        # print("Request #\nUser-Agent Sent:%s\n\nHeaders Recevied by HTTPBin:" %
        #       (headers['User-Agent']))
        # print(response2.json())
        print("-------------------")
except Exception as ext:
    # Most free proxies will often get connection errors. You will have retry the entire request using another proxy to work.
    # We will just skip retries as its beyond the scope of this tutorial and we are only downloading a single url
    print(ext)
    print("Skipping. Connnection error")
