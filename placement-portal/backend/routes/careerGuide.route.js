import express from 'express';
import axios from 'axios';

const router = express.Router();

// Career Guide AI Service URL - defaulting to localhost:3001
const CAREER_GUIDE_SERVICE_URL = process.env.CAREER_GUIDE_SERVICE_URL || 'http://localhost:3001';

// Generate career guide
router.post('/generate', async (req, res) => {
    try {
        const { careerRole } = req.body;
        
        if (!careerRole) {
            return res.status(400).json({
                success: false,
                message: 'Career role is required'
            });
        }

        console.log('Forwarding career guide request for role:', careerRole);
        
        // Forward request to career guide service
        const response = await axios.post(`${CAREER_GUIDE_SERVICE_URL}/api/career-guide`, {
            careerRole
        }, {
            timeout: 60000 // 60 second timeout for AI generation
        });

        return res.status(200).json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error('Career guide generation error:', error.message);
        
        // If service is not available, return fallback response
        if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
            return res.status(503).json({
                success: false,
                message: 'Career Guide service is currently unavailable. Please try again later.',
                error: 'Service unavailable'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Failed to generate career guide',
            error: error.message
        });
    }
});

// Health check for career guide service
router.get('/health', async (req, res) => {
    try {
        const response = await axios.get(`${CAREER_GUIDE_SERVICE_URL}/api/health`, {
            timeout: 5000
        });
        
        return res.status(200).json({
            success: true,
            status: 'available',
            service: response.data
        });
    } catch (error) {
        return res.status(503).json({
            success: false,
            status: 'unavailable',
            message: 'Career Guide service is not running'
        });
    }
});

export default router;
