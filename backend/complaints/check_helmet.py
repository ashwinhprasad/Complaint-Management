import numpy as np
import cv2

weights1_path = './complaints/yolov3-helmet.weights'
configuration1_path = './complaints/yolov3-helmet.cfg'
probability_minimum = 0.5
threshold = 0.3





def detect_helmet(photo):
    image_input = cv2.imread("."+photo.photo.url)

    network1 = cv2.dnn.readNetFromDarknet(configuration1_path, weights1_path)
    layers_names1_all = network1.getLayerNames()
    layers_names1_output = ['yolo_82', 'yolo_94', 'yolo_106']

    
    labels1 = open('./complaints/helmet.names').read().strip().split('\n')

    blob = cv2.dnn.blobFromImage(image_input,1/255.0,(416,416),swapRB=True,crop=False)
    blob_to_show = blob[0,:,:,:].transpose(1,2,0)
    network1.setInput(blob)
    output_from_network1 = network1.forward(layers_names1_output)
    np.random.seed(42)
    colours1 = np.random.randint(0,255,size=(len(labels1),3),dtype='uint8')

    bounding_boxes1 = []
    confidences1 = []
    class_numbers1 = []

    h,w = image_input.shape[:2]
                
    for result in output_from_network1:
        for detection in result:
            scores = detection[5:]
            class_current=np.argmax(scores)
            confidence_current=scores[class_current]
            if confidence_current>probability_minimum:
                box_current=detection[0:4]*np.array([w,h,w,h])
                x_center,y_center,box_width,box_height=box_current.astype('int')
                x_min=int(x_center-(box_width/2))
                y_min=int(y_center-(box_height/2))
                
                bounding_boxes1.append([x_min,y_min,int(box_width),int(box_height)])
                confidences1.append(float(confidence_current))
                class_numbers1.append(class_current)

    results1 = cv2.dnn.NMSBoxes(bounding_boxes1,confidences1,probability_minimum,threshold)
    
    if len(results1) > 0:
        return 1
    else:
        return 0