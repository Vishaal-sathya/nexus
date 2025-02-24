import requests
import json
import spacy
import os

API_KEY = "7ac8add64a304399ae58c38a4005d6e7"
URL = "https://newsapi.org/v2/everything"
NEWS_FILE = "news.json"

# Load tech keywords
with open("tech_keywords.json", "r") as file:
    TECH_KEYWORDS = json.load(file)["keywords"]

# Load technology classification mapping from external file
with open("tech_category_mapping.json", "r") as file:
    TECH_CATEGORY = json.load(file)

# Load NLP model
nlp = spacy.load("en_core_web_sm")


def classify_technology(text):
    """Classifies news into a technology category based on keywords."""
    text_lower = text.lower()
    for keyword, category in TECH_CATEGORY.items():
        if keyword in text_lower:
            return category  # Return the mapped category

    return "General Technology"  # Default if no match


def infer_tech_stack(text):
    """Finds relevant tech stacks using direct keyword matching and Named Entity Recognition (NER)."""
    detected_stacks = set()
    text_lower = text.lower()

    for keyword, skills in TECH_KEYWORDS.items():
        if keyword.lower() in text_lower:
            detected_stacks.update(skills)

    # Use Named Entity Recognition (NER)
    doc = nlp(text)
    for ent in doc.ents:
        entity_text = ent.text.lower()
        if entity_text in TECH_KEYWORDS:
            detected_stacks.update(TECH_KEYWORDS[entity_text])

    return list(detected_stacks)


def fetch_and_update_news(filter_technology=None):
    """Fetches tech news, checks for duplicates, updates news.json, and returns filtered results."""
    params = {
        "q": "technology",
        "language": "en",
        "apiKey": API_KEY,
        "pageSize": 10
    }

    response = requests.get(URL, params=params)
    data = response.json()

    if data.get("status") != "ok":
        return {"error": data.get("message")}

    articles = data.get("articles", [])
    if not articles:
        return {"message": "No tech news found."}

    # Load existing news data
    if os.path.exists(NEWS_FILE):
        with open(NEWS_FILE, "r") as file:
            try:
                existing_news = json.load(file)
            except json.JSONDecodeError:
                existing_news = []
    else:
        existing_news = []

    existing_titles = {news_item["news"] for news_item in existing_news}  # Use news text as unique identifier
    new_news = []

    for article in articles:
        title = article["title"]
        description = article.get("description", "")
        news_text = f"{title} - {description}"  # Single string format
        if news_text in existing_titles:
            continue  # Skip if already exists

        tech_stack = infer_tech_stack(news_text)
        technology = classify_technology(news_text)

        new_news.append({
            "technology": technology,
            "news": news_text,
            "techStack": tech_stack
        })

    if new_news:
        existing_news.extend(new_news)
        with open(NEWS_FILE, "w") as file:
            json.dump(existing_news, file, indent=4)

    # Filter the results if a specific technology category is requested
    if filter_technology:
        filtered_news = [item for item in existing_news if item["technology"].lower() == filter_technology.lower()]
        return {"filtered_news": filtered_news}
    
    return {"message": f"Added {len(new_news)} new articles.", "new_articles": new_news}


if __name__ == "__main__":
    tech_filter = "Artificial Intelligence"  # Change this to any tech category you want
    result = fetch_and_update_news(tech_filter)
    print(result)
