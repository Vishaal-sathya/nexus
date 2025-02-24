import os
import json
import PyPDF2
import chromadb
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OllamaEmbeddings
from langchain.vectorstores import Chroma

UPLOAD_FOLDER = "uploads"
PDF_PATH = os.path.join(UPLOAD_FOLDER, "base.pdf")
VECTOR_DB_PATH = "vector_store"

# Initialize the vector database
chroma_client = chromadb.PersistentClient(VECTOR_DB_PATH)
collection = chroma_client.get_or_create_collection(name="pdf_knowledge")

# Initialize embeddings model
embeddings = OllamaEmbeddings(model="llama3.2")


def create_knowledge_base():
    """
    Extracts text from a PDF, splits it into chunks, and stores them in a vector database.
    """
    extracted_text = ""

    try:
        with open(PDF_PATH, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                extracted_text += page.extract_text() + "\n"
    except Exception as e:
        return f"Error extracting text: {str(e)}"

    # Split text into smaller chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    text_chunks = text_splitter.split_text(extracted_text)

    # **Clear existing chunks before adding new ones**
    collection.delete(ids=[str(i) for i in range(len(text_chunks))])

    # Store chunks in vector database with embeddings
    for idx, chunk in enumerate(text_chunks):
        embedding = embeddings.embed(chunk)  # Convert chunk to vector
        collection.add(ids=[str(idx)], documents=[chunk], embeddings=[embedding])

    return f"Successfully indexed {len(text_chunks)} chunks of text."


def retrieve_relevant_chunks(query):
    """
    Retrieves relevant text chunks from the vector database based on user query.
    """
    if not collection.count():
        return "No knowledge base found. Please upload a PDF first."

    results = collection.query(query_texts=[query], n_results=5)

    if not results["documents"] or len(results["documents"][0]) == 0:
        return "No relevant information found."

    relevant_chunks = results["documents"][0]
    return "\n".join(relevant_chunks)
