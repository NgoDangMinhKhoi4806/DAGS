from flask import Flask
from dotenv import load_dotenv
import os

# 1. Nạp biến môi trường từ file .env
load_dotenv()

# 2. Khởi tạo Flask app
app = Flask(__name__)

# 3. Cấu hình app từ biến môi trường
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret")

# 4. Khởi tạo các extension (db, bcrypt, jwt, migrate)
from extensions import db, bcrypt, jwt
from flask_migrate import Migrate

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
migrate = Migrate(app, db)

# 5. Import models để migrate nhận diện các bảng
import models

# 6. Đăng ký blueprint chính (api) - mọi route đều nằm dưới /api
from routes import api as api_bp
app.register_blueprint(api_bp, url_prefix="/api")

# 7. Route test đơn giản
@app.route("/")
def home():
    return "Web của bạn đã chạy"

# 8. Chạy app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=9000)
