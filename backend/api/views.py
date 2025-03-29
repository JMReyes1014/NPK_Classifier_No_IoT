from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import preprocess_image, predict

@api_view(['POST'])
def predict_view(request):
    if request.method == 'POST':
        if 'fileImage' not in request.FILES:
            return Response({"success" : False, "error_message" : "No image file provided."}, status=400)
        
        uploaded_file = request.FILES["fileImage"]
        
        try:
            # Preprocess image
            
            img_array = preprocess_image(uploaded_file)
            
            # Get Prediction
            prediction_result, confidence = predict(img_array)
            
            return Response({
                "success" : True,
                "prediction" : prediction_result,
                "confidence" : round(confidence * 100, 2),
            })
        except ValueError as e:
            return Response({"success" : False, "error_message" : "Invalid request method"}, status=405)
        
