from flask import Flask
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS
from config import ApplicationConfig
from models import db
from routes.auth_routes import auth
from routes.tables_routes import tables

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
bcrypt = Bcrypt(app)

app.config.from_object(ApplicationConfig)
db.init_app(app)

server_session = Session(app)

app.register_blueprint(auth)
app.register_blueprint(tables)


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(port=app.config, debug=True)
