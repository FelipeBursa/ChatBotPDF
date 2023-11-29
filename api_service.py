from fastapi import FastAPI
from pydantic import BaseModel
from llama_index import VectorStoreIndex, SimpleDirectoryReader
import openai
import os
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Actualiza esto según las necesidades de tu aplicación
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
os.environ["OPENAI_API_KEY"] = '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'
openai.api_key = os.environ["OPENAI_API_KEY"]

class Query(BaseModel):
    text: str


# Carga tus documentos y crea el índice aquí
documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

@app.get("/get")
def get():
    return {"BircleAI"}


@app.get("/chat/{query}")
async def read_query(query: str):
    response = query_engine.query(query)
    print(response)  # Agrega esta línea para imprimir la respuesta en la consola
    return {"response": response}

# Endpoint UPDATE
@app.get("/update/{number}")

def update_number(number: int):
    squared_number = number ** 2
    return {"original number ": number,
        "squared number ": squared_number}