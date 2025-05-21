from flask import Blueprint, jsonify, session
from models import User

from excel_convert import getExcelData


tables = Blueprint("tables", __name__)


@tables.route("/tables/me")
def getTablesForUser():
    user_id = session.get("user_id")
    user = User.query.filter_by(id=user_id).first()

    data = getExcelData(user.email)

    return jsonify(data)


@tables.route("/tables")
def getTables():
    data = getExcelData()

    return jsonify(data)
