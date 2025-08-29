import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Loader2, Upload, FileText, X, Download } from 'lucide-react';

const DocumentsForm = ({ isOpen, onClose, user, onUpdate, loading }) => {
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [documentType, setDocumentType] = useState('resume');

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        try {
            setUploading(true);
            await onUpdate(selectedFile, documentType);
            setSelectedFile(null);
            onClose();
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = {
                resume: ['application/pdf'],
                profilePicture: ['image/jpeg', 'image/png', 'image/jpg'],
                certificate: ['application/pdf', 'image/jpeg', 'image/png']
            };

            if (allowedTypes[documentType].includes(file.type)) {
                setSelectedFile(file);
            } else {
                alert(`Please select a valid file type for ${documentType}`);
                e.target.value = '';
            }
        }
    };

    const documents = user?.profile?.documents || {};
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Documents & Resume</DialogTitle>
                    <DialogDescription>
                        Upload your resume, certificates, and other important documents.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                    {/* Current Documents */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Current Documents</h3>
                        
                        {/* Resume */}
                        <div className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <FileText className="h-8 w-8 text-blue-500" />
                                    <div>
                                        <p className="font-medium">Resume</p>
                                        {documents.resume?.fileUrl ? (
                                            <p className="text-sm text-gray-500">
                                                {documents.resume.fileName || 'resume.pdf'}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-500">No resume uploaded</p>
                                        )}
                                    </div>
                                </div>
                                {documents.resume?.fileUrl && (
                                    <div className="flex space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => window.open(documents.resume.fileUrl, '_blank')}
                                        >
                                            <Download className="h-4 w-4 mr-1" />
                                            View
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Profile Picture */}
                        <div className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    {documents.profilePicture?.fileUrl ? (
                                        <img 
                                            src={documents.profilePicture.fileUrl} 
                                            alt="Profile" 
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500 text-xs">No Image</span>
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-medium">Profile Picture</p>
                                        <p className="text-sm text-gray-500">
                                            {documents.profilePicture?.fileUrl ? 'Image uploaded' : 'No image uploaded'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Certificates */}
                        <div className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="font-medium">Certificates</p>
                                    <p className="text-sm text-gray-500">
                                        {documents.certificates?.length || 0} certificates uploaded
                                    </p>
                                </div>
                            </div>
                            {documents.certificates?.length > 0 && (
                                <div className="space-y-2">
                                    {documents.certificates.map((cert, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                            <div className="flex items-center space-x-2">
                                                <FileText className="h-4 w-4 text-blue-500" />
                                                <span className="text-sm">{cert.title}</span>
                                                <Badge variant="outline" className="text-xs">
                                                    {cert.type}
                                                </Badge>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => window.open(cert.fileUrl, '_blank')}
                                            >
                                                <Download className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Upload New Document */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4">Upload New Document</h3>
                        <form onSubmit={handleFileUpload} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="documentType">Document Type</Label>
                                <select
                                    id="documentType"
                                    value={documentType}
                                    onChange={(e) => setDocumentType(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="resume">Resume (PDF)</option>
                                    <option value="profilePicture">Profile Picture (JPG/PNG)</option>
                                    <option value="certificate">Certificate (PDF/JPG/PNG)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fileInput">Select File</Label>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        id="fileInput"
                                        type="file"
                                        onChange={handleFileChange}
                                        accept={
                                            documentType === 'resume' ? '.pdf' :
                                            documentType === 'profilePicture' ? '.jpg,.jpeg,.png' :
                                            '.pdf,.jpg,.jpeg,.png'
                                        }
                                        className="flex-1"
                                    />
                                    {selectedFile && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedFile(null);
                                                document.getElementById('fileInput').value = '';
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                {selectedFile && (
                                    <p className="text-sm text-green-600">
                                        Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    disabled={!selectedFile || uploading || loading}
                                >
                                    {(uploading || loading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload {documentType}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DocumentsForm;
