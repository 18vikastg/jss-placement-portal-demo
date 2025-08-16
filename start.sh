#!/bin/bash

# Set environment variables for Railway
export STREAMLIT_SERVER_PORT=${PORT:-8501}
export STREAMLIT_SERVER_ADDRESS="0.0.0.0"

# Install any missing dependencies
pip install --no-cache-dir -r requirements.txt

# Run the Streamlit app
streamlit run App/App.py \
  --server.port $STREAMLIT_SERVER_PORT \
  --server.address $STREAMLIT_SERVER_ADDRESS \
  --server.headless true \
  --server.enableCORS false \
  --server.enableXsrfProtection false
