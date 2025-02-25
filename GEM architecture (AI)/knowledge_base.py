import os
import PyPDF2
import faiss
import numpy as np
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OllamaEmbeddings
import pickle
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

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
    chunk_embeddings = np.array([embeddings.embed_query(chunk) for chunk in text_chunks]).astype("float32")

    # Create FAISS index
    d = chunk_embeddings.shape[1]  # Dimensionality of embeddings
    index = faiss.IndexFlatL2(d)  # L2 (Euclidean distance) index
    index.add(chunk_embeddings)  # Add embeddings to the index

    # Save index and text chunks
    with open(VECTOR_DB_PATH, "wb") as f:
        pickle.dump({"index": index, "chunks": text_chunks}, f)
    print('success')

    return f"Successfully indexed {len(text_chunks)} chunks of text."


def retrieve_relevant_chunks(query, top_k=5):
    """
    Retrieves relevant text chunks from the FAISS vector database based on user query.
    """
    
    print("Checking if vector database exists at:", VECTOR_DB_PATH)
    if not os.path.exists(VECTOR_DB_PATH):
        print("Vector database not found!")
        return "No knowledge base found. Please upload a PDF first."

    # Load FAISS index and text chunks
    try:
        with open(VECTOR_DB_PATH, "rb") as f:
            data = pickle.load(f)
        print("Vector database loaded successfully.")
    except Exception as e:
        print(f"Error loading FAISS database: {e}")
        return "Error loading the knowledge base."

    # Extract index and text chunks
    try:
        index = data["index"]
        text_chunks = data["chunks"]
        print("FAISS index and text chunks extracted successfully.")
    except KeyError as e:
        print(f"Missing key in loaded data: {e}")
        return "Corrupted knowledge base file."

    # Convert query to vector
    try:
        print("Generating query embedding...")
        query_embedding = np.array([embeddings.embed_query(query)]).astype("float32")
        print("Query embedding generated successfully.")
    except Exception as e:
        print(f"Error generating query embedding: {e}")
        return "Error generating query embedding."

    # Search in FAISS index
    try:
        print("Performing FAISS search...")
        _, indices = index.search(query_embedding, top_k)
        print("FAISS search completed:", indices)
    except Exception as e:
        print(f"Error in FAISS search: {e}")
        return "Error searching the knowledge base."

    # Retrieve matching text chunks
    try:
        relevant_chunks = [text_chunks[i] for i in indices[0] if i < len(text_chunks)]
        # print("Relevant chunks retrieved:", relevant_chunks)
    except Exception as e:
        print(f"Error retrieving relevant chunks: {e}")
        return "Error retrieving relevant information."

    return "\n".join(relevant_chunks) if relevant_chunks else "No relevant information found."

