from textblob import TextBlob

def analyze_sentiment(reviews_list):
    results = []
    positive_count = 0
    negative_count = 0
    neutral_count = 0
    
    for review in reviews_list:
        analysis = TextBlob(review)
        polarity = analysis.sentiment.polarity
        
        if polarity > 0:
            sentiment = "Positive"
            positive_count += 1
        elif polarity < 0:
            sentiment = "Negative"
            negative_count += 1
        else:
            sentiment = "Neutral"
            neutral_count += 1
            
        results.append({"review": review, "sentiment": sentiment})
        
    total = len(reviews_list) if len(reviews_list) > 0 else 1
    metrics = {
        "positive": round((positive_count / total) * 100, 2),
        "negative": round((negative_count / total) * 100, 2),
        "neutral": round((neutral_count / total) * 100, 2)
    }
    
    return results, metrics