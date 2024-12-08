from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
history = []  # Global list to store calculation history


@app.route('/')
def index():
    return render_template('index.html', history=history)


@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        expression = request.json.get('expression', '')
        result = eval(expression)  # Evaluates the mathematical expression (e.g., "2+2")
        history.append(f"{expression} = {result}")  # Save to history
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': 'Invalid calculation'}), 400


@app.route('/clear_history', methods=['POST'])
def clear_history():
    global history
    history.clear()  # Clear the history list
    return jsonify({'message': 'History cleared successfully!'})


if __name__ == '__main__':
    app.run(debug=True)
