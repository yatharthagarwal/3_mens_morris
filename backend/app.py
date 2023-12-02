from flask import Flask
from new import new_bp
from running import running_bp


app = Flask(__name__)

app.register_blueprint(new_bp)
app.register_blueprint(running_bp)


if __name__ == "__main__":
    # print("WARNING: remove app/debug flag.")
    app.run(debug=True)