# Chemistry Helper

A beginner-friendly full-stack app: **React (Vite)** frontend + **FastAPI** backend.
Element data comes from a local JSON file. There is no database.

## Folder structure

```
chemistry-helper/
├── backend/
│   ├── main.py               # FastAPI app and the 3 endpoints
│   ├── periodic_table.json   # First 20 elements (data + facts)
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx          # Starts React
        ├── App.jsx           # Loads data, switches pages
        ├── index.css         # All styles
        ├── utils.js          # Category -> CSS class helper
        ├── services/api.js   # Every call to the backend
        ├── pages/
        │   ├── SearchPage.jsx
        │   └── ComparePage.jsx
        └── components/
            ├── SearchBar.jsx
            ├── ElementTile.jsx
            ├── ElementDetails.jsx
            ├── ElementGrid.jsx
            ├── ElectronConfiguration.jsx
            ├── Loading.jsx
            └── ErrorMessage.jsx
```

## 1. Backend setup (FastAPI)

Requires Python 3.9+.

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API now runs at http://localhost:8000. Interactive docs: http://localhost:8000/docs

| Endpoint | Example | Returns |
|---|---|---|
| `GET /elements` | `/elements` | All elements |
| `GET /elements/{name}` | `/elements/carbon` or `/elements/C` | One element (name or symbol) |
| `GET /elements/number/{atomic_number}` | `/elements/number/6` | One element |

Unknown names or numbers return `404` with `{"detail": "..."}`.
A non-numeric atomic number returns `422` (FastAPI's automatic validation).

## 2. Frontend setup (React + Vite)

Requires Node.js 18+. Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. Keep the backend running at the same time.

If your API runs somewhere else, create `frontend/.env`:

```
VITE_API_URL=http://localhost:8000
```

## Features

1. Search by name or symbol (`Carbon`, `Na`)
2. Search by atomic number (`8`)
3. Compare any two elements side by side (rows with different values are shaded)
4. Interesting facts for each element
5. Responsive layout, plus loading and error states

## Adding more elements

Add an object to `backend/periodic_table.json` using the same fields, with the next
`atomic_number`. Restart is automatic with `--reload`. New categories need a color in
`index.css` (a `.cat-your-category-name` rule).
