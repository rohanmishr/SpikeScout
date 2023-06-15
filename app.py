from ultralytics import YOLO
import cv2
from flask import Flask, render_template, Response

app = Flask(__name__)

model = YOLO("yolov8n.pt")

def find_main_camera_index():
    # Iterate through video devices until the main camera is found
    for i in range(10):  # You can adjust the range according to the number of video devices on your system
        cap = cv2.VideoCapture(i)
        if cap.isOpened():
            # Check if the camera supports the required properties (width and height)
            width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
            if width > 0 and height > 0:
                # Check if the camera captures frames without errors
                ret, frame = cap.read()
                if ret:
                    # Main camera found
                    cap.release()
                    print("Main camera found at index: " + str(i))
                    return i
                else:
                    print(f"Camera at index {i} does not capture frames properly.")
            else:
                print(f"Camera at index {i} does not support required properties.")
        else:
            print(f"Camera at index {i} could not be opened.")

    # Main camera not found
    return -1

main_camera_index = find_main_camera_index()

@app.route('/')
def index():
    return render_template('index.html')

def gen():
    cap = cv2.VideoCapture(main_camera_index)

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
            boxes = results[0].boxes.xyxy.tolist()
            labels = list(results[0].names.values())

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

@app.route('/video_feed')
def video_feed():
    return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
