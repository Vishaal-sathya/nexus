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
            Please try to answer this question based on general knowledge and give some source for it if not give source not found:

            {user_message}
            """
        else:
            prompt = f"""
            You are an AI assistant with a knowledge base retrieved from a PDF.
            Here are the most relevant excerpts taken from knowledge_base.pdf that is your source:

            {relevant_knowledge}

            The user asked:
            {user_message}

            Provide a concise and accurate response based on the retrieved knowledge and cite the source for your response
            always give  Source: knowledge_base.pdf if this is where you got it from this is a must.
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
        if use_knowledge_base:
            match = re.search(r"(.+)\bSource\b", response_text, re.IGNORECASE)
            
            if match:
                return response_text
            else:
                print("Source not found, re-querying the model...")
                return chat_with_bot(user_message, use_knowledge_base)
        else:
            return response_text
    # response = ollama.chat(model=model_name, messages=[{"role": "user", "content": prompt}])
    # response_text = response.get("message", {}).get("content", "")
    # return response_text

    except Exception as e:
        return f"Error while querying LLaMA: {str(e)}"

