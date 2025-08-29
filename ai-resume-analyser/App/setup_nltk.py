import nltk
import ssl
import os

def download_nltk_data():
    """Download required NLTK data for the application"""
    try:
        # Handle SSL issues on some systems
        try:
            _create_unverified_https_context = ssl._create_unverified_context
        except AttributeError:
            pass
        else:
            ssl._create_default_https_context = _create_unverified_https_context
        
        # Download required NLTK data
        nltk_downloads = [
            'punkt',
            'stopwords', 
            'averaged_perceptron_tagger',
            'wordnet',
            'omw-1.4'
        ]
        
        for item in nltk_downloads:
            try:
                # Check if already downloaded
                nltk.data.find(f'tokenizers/{item}')
                print(f"✅ {item} already available")
            except LookupError:
                try:
                    nltk.data.find(f'corpora/{item}')
                    print(f"✅ {item} already available")
                except LookupError:
                    try:
                        nltk.data.find(f'taggers/{item}')
                        print(f"✅ {item} already available")
                    except LookupError:
                        print(f"📥 Downloading {item}...")
                        nltk.download(item, quiet=True)
                        print(f"✅ {item} downloaded successfully")
                        
    except Exception as e:
        print(f"❌ Error downloading NLTK data: {e}")

if __name__ == "__main__":
    download_nltk_data()
