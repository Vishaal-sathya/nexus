from whatsapp import Whatsapp as wh
from flask_cors import CORS
from flask import Flask, request, jsonify


    # number = '6382226812'

    # content = 'Hi vishall'

    # wh.send_text(content,number,wh.url,wh.headers)




app = Flask(__name__)
CORS(app)
@app.route('/post_endpoint', methods=['GET','POST'])
def handle_post():
    try:
        # Get JSON data from the request
        if request.method == 'POST':
            # Get JSON data from the POST request
            data = request.json
            if not data:
                return jsonify({'error': 'No JSON data provided'}), 400
            print(f"Received POST data: {data}")
        elif request.method == 'GET':
            # Get query parameters from the GET request
            data = request.args.to_dict()
            if not data:
                return jsonify({'error': 'No query parameters provided'}), 400
            
        con = data['content']
        message = f"*Hey User!*\n*New Event* : {con}\nVisit http://172.16.59.85:5173/ for details\n -*neXus AI*"
        wh.send_text_all(message,wh.url,wh.headers)

        print(f"Received data: {data}")

        # Create a response
        response = {
            'message': 'Data received successfully',
            'received_data': data
        }
        print(8)
        return jsonify(response), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
