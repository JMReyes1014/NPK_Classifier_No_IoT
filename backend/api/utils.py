from keras.models import load_model
from keras.applications.resnet import preprocess_input
from PIL import Image, UnidentifiedImageError
import numpy as np
from io import BytesIO

# Load the model at startup
MODEL_PATH = "model/ResNetModelV1.h5"
model = load_model(MODEL_PATH)

# Define class labels
CLASS_LABELS = ["Healthy", "Nitrogen Deficient", "Phosphorus Deficient", "Potassium Deficient"]

def detect_leaf(image: np.ndarray) -> bool:
    """
    A simple heuristic approack to check if the image is predominantly green,
    which could indicate that it is a leaf.
    """
    
    # Calculate the percentage of green pixels in the image
    # A pixel is considered "green" if the green channel is dominant compared to red and blue
    green_pixels = np.sum((image[:, :, 1] > image[:, :, 0]) & (image[:, :, 1] > image[:, :, 2]))
    total_pixels = image.shape[0] * image.shape[1]
    green_ratio = green_pixels / total_pixels
    
    # If more than 10% of the image is green, then it is likely a leaf
    return green_ratio > 0.1
    
def preprocess_image(file) -> np.ndarray:
    """
    Preprocess images before prediction
    """
    try:
        #Open uploaded image file directly
        image = Image.open(file)

        if image.mode != 'RGB': # Ensures image is in rgb format
                image = image.convert('RGB')
            
        img = image.resize((299, 299)) # Resize to model input size
        img_array = np.array(img)
    
        if img_array.shape[-1] != 3:
            img_array = np.stack([img_array] * 3, axis=1)
            
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)
    
        # Heuristic Check
        if not detect_leaf(img_array):
            raise ValueError("The image doesn't seem to be a leaf.")
        
        return img_array
    
    except UnidentifiedImageError:
        raise ValueError("Invalid image file.")
    except Exception as e:
        raise ValueError(f"An error occured while processing the image: {str(e)}")

def predict(img_array):
    """
    Predict function
    """
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions)
    confidence = np.max(predictions)
    return CLASS_LABELS[predicted_class], confidence