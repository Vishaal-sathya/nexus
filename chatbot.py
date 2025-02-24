import ollama
from knowledge_base import retrieve_relevant_chunks

import ollama
import re
from knowledge_base import retrieve_relevant_chunks

def chat_with_bot(user_message, use_knowledge_base=True):
    """
    Queries LLaMA 3.2 with retrieved knowledge chunks.
    Extracts the source and ensures it is included in the response.
    """
    model_name = "llama3.2"

    if use_knowledge_base:
        print('before')
        relevant_knowledge = retrieve_relevant_chunks(user_message)
        print('after')
        print(relevant_knowledge)

        # If no relevant information is found, fall back to general answering
        if not relevant_knowledge or relevant_knowledge == "No relevant information found.":
            prompt = f"""
            I couldn't find relevant information in the knowledge base.
            Please try to answer this question based on general knowledge:

            {user_message}
            """
        else:
            prompt = f"""
            You are an AI assistant with a knowledge base retrieved from a PDF.
            Here are the most relevant excerpts taken from knowledge_base.pdf:

            {relevant_knowledge}

            The user asked:
            {user_message}

            Provide a concise and accurate response based on the retrieved knowledge and cite the source for your response.
            """
    else:
        prompt = f"""
        Answer this question:
        {user_message}
        """

    try:
        response = ollama.chat(model=model_name, messages=[{"role": "user", "content": prompt}])
        response_text = response.get("message", {}).get("content", "")

        # Extract everything before the last occurrence of "source"
        match = re.search(r"(.+)\bsource\b", response_text, re.IGNORECASE)
        
        if match:
            cleaned_response = match.group(1).strip()
            return cleaned_response
        else:
            print("Source not found, re-querying the model...")
            return chat_with_bot(user_message, use_knowledge_base)

    except Exception as e:
        return f"Error while querying LLaMA: {str(e)}"

