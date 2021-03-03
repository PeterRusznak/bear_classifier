from flask import Flask, request, make_response
from flask_cors import CORS

from fastai import *
from fastai.vision.all import *

app = Flask(__name__)
CORS(app)

path = Path()
learn_inf = load_learner(path/'export.pkl')


@app.route('/api/image-upload', methods=['POST'])
def call_predict():

    imageFile = request.files['imageFile']
    pili_img = PILImage.create(imageFile)
    pred, pred_idx, probs = learn_inf.predict(pili_img)
    prediction = str(pred) + ", "+str(probs)
    print(prediction)

    resp = make_response({"prediction": prediction}, 200)
    return resp
