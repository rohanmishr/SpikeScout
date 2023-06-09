from roboflow import Roboflow as r
import json
 
private_api_key = ""

rf = Roboflow(api_key=private_api_key)
workspace = rf.workspace()

model_path = 