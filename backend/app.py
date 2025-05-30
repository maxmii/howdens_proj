from flask import Flask
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS
from config import ApplicationConfig
from models import db
from routes.auth_routes import auth
from routes.tables_routes import tables

app = Flask(__name__)
FRONTEND_URL = ApplicationConfig.FRONTEND_URL
CORS(app, supports_credentials=True, origins=[FRONTEND_URL])
bcrypt = Bcrypt(app)

app.config.from_object(ApplicationConfig)
db.init_app(app)

server_session = Session(app)

app.register_blueprint(auth)
app.register_blueprint(tables)


with app.app_context():
    db.create_all()


@app.route("/health")
def health_check():
    try:
        # Check Redis connection
        redis_client = ApplicationConfig.get_redis_client()
        redis_client.ping()

        # Check database connection (if needed)
        # Your DB health check here

        return {"status": "healthy", "redis": "connected"}, 200
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}, 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=app.config.get("PORT", 5000), debug=True)
