from dotenv import load_dotenv
import os
import redis

load_dotenv()


class ApplicationConfig:
    # Existing config...
    SECRET_KEY = os.environ["SECRET_KEY"]
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"
    PORT = 5000
    FRONTEND_URL = os.environ["FRONTEND_URL"]
    # enable session config
    SESSION_TYPE = "redis"
    # so that session won't be permanent
    SESSION_PERMANENT = False
    # use secret key signer
    SESSION_USE_SIGNER = True
    # set the path
    # Redis Configuration
    SESSION_REDIS = redis.from_url("redis://redis:6379")
    REDIS_URL = os.environ.get("REDIS_URL") or "redis://redis:6379/0"
    REDIS_HOST = os.environ.get("REDIS_HOST") or "redis"
    REDIS_PORT = int(os.environ.get("REDIS_PORT") or 6379)
    REDIS_DB = int(os.environ.get("REDIS_DB") or 0)

    @staticmethod
    def get_redis_client():
        return redis.Redis(
            host=ApplicationConfig.REDIS_HOST,
            port=ApplicationConfig.REDIS_PORT,
            db=ApplicationConfig.REDIS_DB,
            decode_responses=True,
        )
