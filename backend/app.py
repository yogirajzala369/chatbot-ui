from transformers import GPT2Tokenizer, GPT2LMHeadModel
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load GPT-2 tokenizer and model
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')

@app.route('/api/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = data['question']

    # Generate a response using the GPT-2 model
    input_text = f"Question: {question}\nAnswer:"
    input_ids = tokenizer.encode(input_text, return_tensors='pt')
    output = model.generate(input_ids, max_length=100)
    response = tokenizer.decode(output[0], skip_special_tokens=True)

    return jsonify({'reply': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
