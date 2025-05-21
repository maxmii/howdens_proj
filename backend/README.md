# Flask Backend Project

This is a simple Flask backend project that demonstrates how to create a basic web application with a "Hello World" endpoint.

## Project Structure

```
flask-backend
├── app
│   ├── __init__.py
│   └── views.py
├── requirements.txt
└── README.md
```

## Setup Instructions

1. **Clone the repository** (if applicable):
   ```
   git clone <repository-url>
   cd flask-backend
   ```

2. **Create a virtual environment** (optional but recommended):
   ```
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the required dependencies**:
   ```
   pip install -r requirements.txt
   ```

## Usage

1. **Run the application**:
   ```
   flask run
   ```

2. **Access the "Hello World" endpoint**:
   Open your web browser and navigate to `http://127.0.0.1:5000/hello` to see the greeting message.

## License

This project is licensed under the MIT License.