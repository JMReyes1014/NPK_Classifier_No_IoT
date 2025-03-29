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
    A simple heuristic approach to check if the image is predominantly green,
    which could indicate that it is a leaf.
    """
    # Calculate the percentage of green pixels in the image
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
        # Open uploaded image file directly
        image = Image.open(file)

        if image.mode != 'RGB':  # Ensures image is in RGB format
            image = image.convert('RGB')

        img = image.resize((299, 299))  # Resize to model input size
        img_array = np.array(img)

        if img_array.ndim != 3 or img_array.shape[-1] != 3:
            raise ValueError("Image must have 3 color channels (RGB).")

        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)

        # Heuristic Check
        if not detect_leaf(img_array[0]):
            raise ValueError("The image doesn't seem to be a leaf. Ensure the image contains a clear leaf.")

        return img_array

    except UnidentifiedImageError:
        raise ValueError("Invalid image file format.")
    except ValueError as ve:
        raise ve
    except Exception as e:
        raise ValueError(f"An unexpected error occurred: {str(e)}")

def predict(img_array):
    """
    Predict function
    """
    predictions = model.predict(img_array, verbose=0)  # Disable verbose output for faster execution
    return CLASS_LABELS[np.argmax(predictions)], np.max(predictions)