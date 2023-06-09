from ultralytics import YOLO
import cv2
from flask import Flask, render_template, Response

app = Flask(__name__)

model = YOLO("yolov8n.pt")

@app.route('/')
def index():
    return render_template('index.html')

def gen():
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Perform object detection on the frame using the YOLOv8 model
        results = model.predict(frame, conf=0.2, iou=0.5, agnostic_nms=False)

        if len(results) == 0:
            # No objects detected in the input frame
            boxes = []
            labels = []
        else:
            # Extract the bounding boxes and labels from the results
            boxes = results[0].xyxy.tolist()
            labels = results[0].names.tolist()

        # Draw the bounding boxes and labels on the frame
        for box, label in zip(boxes, labels):
            x1, y1, x2, y2 = box
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(frame, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Convert the frame to a JPEG image
        ret, jpeg = cv2.imencode('.jpg', frame)
        frame = jpeg.tobytes()

        # Yield the frame to be displayed in the web application
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()

app.route('/video_feed')
def video_feed():
    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
