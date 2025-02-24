import os
import PyPDF2
import faiss
import numpy as np
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OllamaEmbeddings
import pickle

UPLOAD_FOLDER = "uploads"
PDF_PATH = os.path.join(UPLOAD_FOLDER, "base.pdf")
VECTOR_DB_PATH = "vector_store/faiss_index.pkl"

# Initialize embeddings model
embeddings = OllamaEmbeddings(model="llama3.2")


def create_knowledge_base():
    """
    Extracts text from a PDF, splits it into chunks, and stores them in a FAISS vector database.
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

    # Convert chunks to embeddings
    chunk_embeddings = np.array([embeddings.embed(chunk) for chunk in text_chunks]).astype("float32")

    # Create FAISS index
    d = chunk_embeddings.shape[1]  # Dimensionality of embeddings
    index = faiss.IndexFlatL2(d)  # L2 (Euclidean distance) index
    index.add(chunk_embeddings)  # Add embeddings to the index

    # Save index and text chunks
    with open(VECTOR_DB_PATH, "wb") as f:
        pickle.dump({"index": index, "chunks": text_chunks}, f)

    return f"Successfully indexed {len(text_chunks)} chunks of text."


def retrieve_relevant_chunks(query, top_k=5):
    """
    Retrieves relevant text chunks from the FAISS vector database based on user query.
    """
    if not os.path.exists(VECTOR_DB_PATH):
        return "No knowledge base found. Please upload a PDF first."

    # Load FAISS index and text chunks
    with open(VECTOR_DB_PATH, "rb") as f:
        data = pickle.load(f)
        index = data["index"]
        text_chunks = data["chunks"]

    # Convert query to vector
    query_embedding = np.array([embeddings.embed(query)]).astype("float32")

    # Search in FAISS index
    _, indices = index.search(query_embedding, top_k)

    # Retrieve matching text chunks
    relevant_chunks = [text_chunks[i] for i in indices[0] if i < len(text_chunks)]
    
    return "\n".join(relevant_chunks) if relevant_chunks else "No relevant information found."
