import numpy as np

from flask import Flask, request, jsonify, send_file
import torch
from torchvision import transforms
from PIL import Image
import numpy as np
import cv2
import io
import sys
sys.path.append('./U-2-Net')
from flask_cors import CORS, cross_origin
import base64

# Flask uygulamasını oluştur
app = Flask(__name__)
CORS(app, support_credentials=True)

# U²-Net modelini yükleme
from model import U2NET

model = U2NET(3, 1)
model.load_state_dict(torch.load("u2net.pth", map_location='cpu'))
model.eval()

def remove_background(image_np):
    # Resim üzerinde kontrast ve parlaklık artırma (Ön işleme)
    adjusted = cv2.convertScaleAbs(image_np, alpha=1.5, beta=30)  # Kontrast ve parlaklık
    input_image = Image.fromarray(adjusted)

    # Model için uygun forma dönüştürme
    preprocess = transforms.Compose([
        transforms.ToTensor(),
        transforms.Resize((320, 320)),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    input_tensor = preprocess(input_image).unsqueeze(0)

    if torch.cuda.is_available():
        input_tensor = input_tensor.to('cuda')
        model.to('cuda')

    with torch.no_grad():
        output = model(input_tensor)[0][:, 0, :, :]
        output = output.squeeze().cpu().numpy()

    output = cv2.resize(output, (image_np.shape[1], image_np.shape[0]))
    output = (output - np.min(output)) / (np.max(output) - np.min(output))
    output = np.where(output > 0.5, 1, 0).astype(np.uint8)

    r_channel = image_np[:, :, 0] * output
    g_channel = image_np[:, :, 1] * output
    b_channel = image_np[:, :, 2] * output
    masked_image = np.stack([r_channel, g_channel, b_channel], axis=2)

    blurred_image = cv2.GaussianBlur(masked_image, (7, 7), 0)

    return Image.fromarray(blurred_image.astype('uint8'))

@app.route('/remove_background', methods=['POST'])
@cross_origin(supports_credentials=True)
def api_remove_background():
    # POST isteği ile gelen resmi al
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Resmi okuma
    image = Image.open(io.BytesIO(file.read()))
    image_np = np.array(image)

    # Arka planı kaldır
    result_image = remove_background(image_np)

    # Sonucu bir byte dizisi olarak döndür
    img_byte_arr = io.BytesIO()
    result_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    # Base64'e çevir
    img_base64 = base64.b64encode(img_byte_arr.getvalue()).decode('utf-8')

    # Base64 string'ini JSON ile döndür
    return jsonify({'image': img_base64})


if __name__ == '__main__':
    app.run(debug=True)
