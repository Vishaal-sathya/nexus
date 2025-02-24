import requests
import json
import spacy
import os

API_KEY = "7ac8add64a304399ae58c38a4005d6e7"
URL = "https://newsapi.org/v2/everything"

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


def get_tech_news():
    """Fetches recent tech-related news from NewsAPI and returns a structured JSON response."""
    params = {
        "q": "technology",
        "language": "en",
        "apiKey": API_KEY,
        "pageSize": 10
    }

    response = requests.get(URL, params=params)
    data = response.json()

    if data.get("status") == "ok":
        articles = data.get("articles", [])
        if not articles:
            return {"message": "No tech news found."}

        news_list = []
        for i, article in enumerate(articles, 1):
            title = article["title"]
            description = article.get("description", "")
            news_text = f"{title} - {description}"  # Combine title and description into a single string
            tech_stack = infer_tech_stack(news_text)
            technology = classify_technology(news_text)

            news_list.append({
                "id": i,
                "technology": technology,
                "news": news_text,  # Single string format
                "techStack": tech_stack
            })

        return news_list

    else:
        return {"error": data.get("message")}


if __name__ == "__main__":
    news_file = "news.json"

    # Check if the file already exists
    if not os.path.exists(news_file):
        news_json = get_tech_news()
        with open(news_file, "w") as file:
            json.dump(news_json, file, indent=4)
        print(f"News saved to {news_file}")
    else:
        print(f"{news_file} already exists. Skipping save.")
