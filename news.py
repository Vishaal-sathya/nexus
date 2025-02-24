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


def fetch_and_get_news(domain):
    """Fetches, processes, saves, and retrieves news for a given domain."""
    params = {
        "q": domain,
        "language": "en",
        "apiKey": API_KEY,
        "pageSize": 10
    }

    response = requests.get(URL, params=params)
    data = response.json()

    if data.get("status") == "ok":
        articles = data.get("articles", [])
        if not articles:
            return {"message": f"No news found for {domain}."}

        news_list = []
        for i, article in enumerate(articles, 1):
            title = article["title"]
            description = article.get("description", "")
            news_text = f"{title} - {description}"  # Combine title and description into a single string
            tech_stack = infer_tech_stack(news_text)
            technology = classify_technology(news_text)

            news_list.append({
                "id": i,
                "domain": domain,
                "technology": technology,
                "news": news_text,
                "techStack": tech_stack
            })

        # Load existing data
        if os.path.exists(NEWS_FILE):
            with open(NEWS_FILE, "r") as file:
                try:
                    existing_data = json.load(file)
                except json.JSONDecodeError:
                    existing_data = []
        else:
            existing_data = []

        # Append new data
        existing_data.extend(news_list)

        # Save to file
        with open(NEWS_FILE, "w") as file:
            json.dump(existing_data, file, indent=4)

        # Return all news related to the domain
        return [news for news in existing_data if news["domain"] == domain]

    else:
        return {"error": data.get("message")}


# Example Usage:
if __name__ == "__main__":
    domain = "technology"
    news = fetch_and_get_news(domain)
    print(json.dumps(news, indent=4))
