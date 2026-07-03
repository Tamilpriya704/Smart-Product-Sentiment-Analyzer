from flask import Flask, request, jsonify
from flask_cors import CORS
from scraper import scrape_reviews
from sentiment_nlp import analyze_sentiment

app = Flask(__name__)
CORS(app)  # Connection permission for React Frontend

@app.route('/api/analyze', methods=['POST'])
def analyze_product():
    data = request.json
    url = data.get('url')
    
    if not url:
        return jsonify({"error": "URL is required"}), 400
        
    # Step 1: Scrape Data
    reviews = scrape_reviews(url)
    
    # Step 2: Run Sentiment Analysis Logic
    detailed_reviews, summary_metrics = analyze_sentiment(reviews)
    
    # Step 3: Return JSON Output
    return jsonify({
        "status": "Success",
        "metrics": summary_metrics,
        "reviews": detailed_reviews
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)