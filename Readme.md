# Employee Exit Risk Analyzer

An AI-powered web application that predicts employee exit risk using a **Random Forest Classifier**, with a **FastAPI** backend and a **React + Vite + Tailwind CSS** frontend.

## 🛠️ Tech Stack

- **Machine Learning:** Python, Scikit-learn, Pandas, NumPy
- **Backend:** FastAPI, Uvicorn
- **Frontend:** React 19, Vite, Tailwind CSS v4
- **Model Storage:** Joblib

## ⚙️ Prerequisites

Install the following before running the project:

- [Python 3.9+](https://www.python.org/downloads/)
- [Node.js and npm](https://nodejs.org/)
- [Git](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Employee-Exit-Risk-Analyzer.git
cd Employee-Exit-Risk-Analyzer
```

### 2. Run the Backend

Open a terminal and execute:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

**Windows:**
```bash
venv\Scripts\activate
```

**macOS / Linux:**
```bash
source venv/bin/activate
```

Install dependencies and train the model:

```bash
pip install -r requirements.txt
python train_model.py
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload --port 8000
```

Backend: http://localhost:8000

API Documentation: http://localhost:8000/docs

### 3. Run the Frontend

Open a **new terminal** from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the URL displayed in the terminal, typically:

http://localhost:5173

## 🧪 Usage

1. Ensure both the backend and frontend servers are running.
2. Open the frontend in your browser.
3. Enter the employee details.
4. Click **Analyze Exit Risk**.
5. View the predicted exit probability and risk category.

