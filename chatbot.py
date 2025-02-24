import ollama
from knowledge_base import retrieve_relevant_chunks

def chat_with_bot(user_message, use_knowledge_base=True):
    """
    Queries LLaMA 3.2 with retrieved knowledge chunks.
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
            Here are the most relevant excerpts:

            {relevant_knowledge}

            The user asked:
            {user_message}

            Provide a concise and accurate response based on the retrieved knowledge.
            """
    else:
        prompt = f"""
        Answer this question:
        {user_message}
        """

    try:
        response = ollama.chat(model=model_name, messages=[{"role": "user", "content": prompt}])
        print(response.get("message").get("content"))
        return response.get("message").get("content")
    
    except Exception as e:
        return f"Error while querying LLaMA: {str(e)}"
