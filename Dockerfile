FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    software-properties-common \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY App/requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of the application
COPY App/ ./App/
COPY pyresparser/ ./pyresparser/

EXPOSE 8501

HEALTHCHECK CMD curl --fail http://localhost:8501/_stcore/health

ENTRYPOINT ["streamlit", "run", "App/App.py", "--server.port=8501", "--server.address=0.0.0.0"]
