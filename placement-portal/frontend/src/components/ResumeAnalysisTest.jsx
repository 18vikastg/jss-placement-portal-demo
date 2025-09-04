import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText } from 'lucide-react';

const ResumeAnalysisTest = () => {
    const [testData, setTestData] = useState(null);

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Resume Analysis Test
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center py-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Test Component</h3>
                    <p className="text-gray-600 mb-4">
                        Resume Analysis component is working properly.
                    </p>
                    <Button className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Test Button
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ResumeAnalysisTest;
