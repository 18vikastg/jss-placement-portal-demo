import express from 'express';
import axios from 'axios';
import FormData from 'form-data';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// AI Resume Analyzer Service URL - defaulting to localhost:5001
const AI_RESUME_SERVICE_URL = process.env.AI_RESUME_SERVICE_URL || 'http://localhost:5001';

// Check if AI Resume Analyzer service is available
router.get('/status', async (req, res) => {
    try {
        const response = await axios.get(`${AI_RESUME_SERVICE_URL}/health`, {
            timeout: 5000
        });
        
        return res.status(200).json({
            success: true,
            status: 'available',
            message: 'AI Resume Analyzer service is running'
        });
    } catch (error) {
        return res.status(503).json({
            success: false,
            status: 'unavailable',
            message: 'AI Resume Analyzer service is not running. Please start it first.'
        });
    }
});

// Forward resume analysis request to Python service
router.post('/analyze', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No resume file uploaded'
            });
        }

        console.log('Forwarding resume to AI analyzer...');

        // Create form data to send to Python service
        const formData = new FormData();
        formData.append('resume', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        // Forward to Python Streamlit service
        const response = await axios.post(`${AI_RESUME_SERVICE_URL}/api/analyze`, formData, {
            headers: {
                ...formData.getHeaders()
            },
            timeout: 60000, // 60 seconds
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });

        return res.status(200).json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error('AI Resume analysis error:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({
                success: false,
                message: 'AI Resume Analyzer service is not running. Please start it on port 5001.'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Failed to analyze resume',
            error: error.message
        });
    }
});

// Get service URL for frontend
router.get('/service-url', (req, res) => {
    return res.status(200).json({
        success: true,
        url: AI_RESUME_SERVICE_URL
    });
});

export default router;
