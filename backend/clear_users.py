from app import app
from models import db, User

with app.app_context():
    User.query.delete()
    db.session.commit()
    print("All users deleted.")
