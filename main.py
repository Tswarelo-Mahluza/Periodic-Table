"""
Chemistry Helper - FastAPI backend.

Element data lives in periodic_table.json (no database).
The file is read once when the server starts and kept in memory.

Run with:  uvicorn main:app --reload
Docs at:   http://localhost:8000/docs
"""
import json
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

DATA_FILE = Path(__file__).parent / "periodic_table.json"


def load_elements() -> list[dict]:
    """Read the JSON file. Stop with a clear message if it is missing or broken."""
    try:
        with open(DATA_FILE, encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError as error:
        raise RuntimeError(f"Data file not found: {DATA_FILE}") from error
    except json.JSONDecodeError as error:
        raise RuntimeError(f"Data file is not valid JSON: {error}") from error


ELEMENTS = load_elements()

app = FastAPI(title="Chemistry Helper API")

# CORS lets the React dev server (a different port) call this API from the browser.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """Simple health check."""
    return {"message": "Chemistry Helper API is running", "elements": len(ELEMENTS)}


@app.get("/elements")
def list_elements():
    """Return every element."""
    return ELEMENTS


# NOTE: this route is declared before /elements/{name} so the word "number"
# is never mistaken for an element name.
@app.get("/elements/number/{atomic_number}")
def get_element_by_number(atomic_number: int):
    """Return one element by atomic number, e.g. /elements/number/6."""
    for element in ELEMENTS:
        if element["atomic_number"] == atomic_number:
            return element
    raise HTTPException(
        status_code=404,
        detail=f"No element with atomic number {atomic_number}. Try 1 to {len(ELEMENTS)}.",
    )


@app.get("/elements/{name}")
def get_element_by_name(name: str):
    """Return one element by name or symbol (not case-sensitive), e.g. /elements/carbon or /elements/C."""
    wanted = name.strip().lower()
    for element in ELEMENTS:
        if wanted in (element["name"].lower(), element["symbol"].lower()):
            return element
    raise HTTPException(status_code=404, detail=f"No element found called '{name}'.")
