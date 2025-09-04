import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
    Upload, 
    FileText, 
    Clock, 
    Trash2,
    Lightbulb,
    BarChart3
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const RESUME_API_END_POINT = "http://localhost:8001/api/v1/resume";

const ResumeAnalysisCard = () => {
    const [loading, setLoading] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);
    const [analysisHistory, setAnalysisHistory] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showUpload, setShowUpload] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [recommendations, setRecommendations] = useState(null);

    useEffect(() => {
        fetchAnalysisHistory();
        fetchRecommendations();
    }, []);

    const fetchAnalysisHistory = async () => {
        try {
            const res = await axios.get(`${RESUME_API_END_POINT}/history`, {
                withCredentials: true
            });
            if (res.data.success) {
                setAnalysisHistory(res.data.data.history);
                setAnalysisData(res.data.data.latestAnalysis);
            }
        } catch (error) {
            console.error('Failed to fetch analysis history:', error);
        }
    };

    const fetchRecommendations = async () => {
        try {
            const res = await axios.get(`${RESUME_API_END_POINT}/recommendations`, {
                withCredentials: true
            });
            if (res.data.success) {
                setRecommendations(res.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        }
    };

    const handleFileSelect = (event) => {
        console.log('File select triggered', event);
        const file = event.target.files[0];
        console.log('Selected file:', file);
        
        if (file) {
            console.log('File details:', {
                name: file.name,
                type: file.type,
                size: file.size
            });
            
            // Validate file type
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(file.type)) {
                toast.error('Please upload a PDF or Word document');
                return;
            }
            
            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                toast.error('File size should be less than 10MB');
                return;
            }
            
            setSelectedFile(file);
            console.log('File set successfully');
        } else {
            console.log('No file selected');
        }
    };

    const analyzeResume = async () => {
        if (!selectedFile) {
            toast.error('Please select a resume file');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const res = await axios.post(`${RESUME_API_END_POINT}/analyse`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success('Resume analyzed successfully!');
                setAnalysisData({
                    score: res.data.analysis.score,
                    level: res.data.analysis.level,
                    analyzedAt: res.data.analysis.analysisDate,
                    fileName: selectedFile.name
                });
                setSelectedFile(null);
                setShowUpload(false);
                fetchAnalysisHistory();
                fetchRecommendations();
            } else {
                toast.error(res.data.message || 'Analysis failed');
            }
        } catch (error) {
            console.error('Resume analysis error:', error);
            toast.error(error.response?.data?.message || 'Failed to analyze resume');
        } finally {
            setLoading(false);
        }
    };

    const deleteAnalysis = async (analysisId) => {
        try {
            const res = await axios.delete(`${RESUME_API_END_POINT}/delete/${analysisId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success('Analysis deleted successfully');
                fetchAnalysisHistory();
            }
        } catch (error) {
            toast.error('Failed to delete analysis');
        }
    };

    const getScoreLevel = (score) => {
        if (score >= 90) return 'Excellent';
        if (score >= 80) return 'Very Good';
        if (score >= 70) return 'Good';
        if (score >= 60) return 'Average';
        return 'Needs Improvement';
    };

    if (showUpload) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Analyze Your Resume
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-lg font-medium mb-2">Upload Your Resume</p>
                        <p className="text-gray-600 mb-4">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
                        
                        <div className="space-y-4">
                            {/* File Input */}
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileSelect}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                id="resume-upload"
                            />
                            
                            {selectedFile && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <p className="font-medium">{selectedFile.name}</p>
                                    <p className="text-sm text-gray-600">
                                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        <Button 
                            onClick={analyzeResume} 
                            disabled={!selectedFile || loading}
                            className="flex-1"
                        >
                            {loading ? 'Analyzing...' : 'Analyze Resume'}
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={() => setShowUpload(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (showHistory) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            Analysis History
                        </CardTitle>
                        <Button 
                            variant="outline" 
                            onClick={() => setShowHistory(false)}
                        >
                            Back
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {analysisHistory.length === 0 ? (
                        <div className="text-center py-8">
                            <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600">No analysis history found</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {analysisHistory.map((analysis) => (
                                <div key={analysis.analysisId} className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h4 className="font-medium">{analysis.fileName}</h4>
                                            <p className="text-sm text-gray-600">
                                                {new Date(analysis.analysisDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary">
                                                Score: {analysis.analysisScore}/100
                                            </Badge>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteAnalysis(analysis.analysisId)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <Progress 
                                        value={analysis.analysisScore} 
                                        className="h-2"
                                    />
                                    <p className="text-sm text-gray-600 mt-2">
                                        {analysis.experienceLevel}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Resume Analysis
                </CardTitle>
            </CardHeader>
            <CardContent>
                {analysisData ? (
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="recommendations">Tips</TabsTrigger>
                            <TabsTrigger value="history">History</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="space-y-4">
                            <div className="text-center py-6">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
                                    <span className="text-2xl font-bold text-blue-600">
                                        {analysisData.score}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {getScoreLevel(analysisData.score)}
                                </h3>
                                <p className="text-gray-600">
                                    Experience Level: {analysisData.level}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Last analyzed: {new Date(analysisData.analyzedAt).toLocaleDateString()}
                                </p>
                            </div>
                            
                            <Progress 
                                value={analysisData.score} 
                                className="h-3"
                            />
                            
                            <div className="flex gap-2 mt-4">
                                <Button 
                                    onClick={() => setShowUpload(true)}
                                    className="flex-1"
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Re-analyze
                                </Button>
                                <Button 
                                    variant="outline"
                                    onClick={() => setShowHistory(true)}
                                >
                                    <Clock className="w-4 h-4 mr-2" />
                                    History
                                </Button>
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="recommendations" className="space-y-4">
                            {recommendations ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                                        <h3 className="font-semibold">Improvement Suggestions</h3>
                                    </div>
                                    
                                    {recommendations.improvementAreas?.map((area, index) => (
                                        <div key={index} className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium">{area.area}</span>
                                                <Badge variant={area.priority === 'High' ? 'destructive' : area.priority === 'Medium' ? 'default' : 'secondary'}>
                                                    {area.priority}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600">{area.description}</p>
                                        </div>
                                    ))}
                                    
                                    {recommendations.skillSuggestions?.length > 0 && (
                                        <div className="mt-6">
                                            <h4 className="font-medium mb-3">Suggested Skills to Add:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {recommendations.skillSuggestions.map((skill, index) => (
                                                    <Badge key={index} variant="outline">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Lightbulb className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                    <p className="text-gray-600">No recommendations available</p>
                                </div>
                            )}
                        </TabsContent>
                        
                        <TabsContent value="history">
                            <div className="text-center py-8">
                                <Button onClick={() => setShowHistory(true)}>
                                    View Full History
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                ) : (
                    <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                            <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Analyze Your Resume</h3>
                        <p className="text-gray-600 mb-6">
                            Get AI-powered insights to improve your resume and increase your chances of getting hired.
                        </p>
                        <div className="space-y-3">
                            <Button 
                                onClick={() => setShowUpload(true)}
                                className="w-full"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Upload & Analyze Resume
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={() => setShowHistory(true)}
                                className="w-full"
                            >
                                <Clock className="w-4 h-4 mr-2" />
                                View History
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ResumeAnalysisCard;
