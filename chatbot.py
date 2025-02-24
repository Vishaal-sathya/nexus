import ollama
from knowledge_base import retrieve_relevant_chunks

def chat_with_bot(user_message,use_knowledge_base):
    """
    Queries LLaMA 3.2 with retrieved knowledge chunks.
    """
    model_name = "llama3.2"

    # Retrieve only relevant chunks from the vector DB
    if use_knowledge_base:
        relevant_knowledge = retrieve_relevant_chunks(user_message)

        prompt = f"""
        You are an AI assistant with a knowledge base retrieved from a PDF.
        Here are the most relevant excerpts:

        {relevant_knowledge}

        The user asked:
        {user_message}

        Provide a concise and accurate response based on the retrieved knowledge.
        """
    else:
        prompt = f"""
        Answer this question
        {user_message}
        """


    try:
        response = ollama.chat(model=model_name, messages=[{"role": "user", "content": prompt}])
        return response.get("message", "I couldn't generate a response.")
    
    except Exception as e:
        return f"Error while querying LLaMA: {str(e)}"
