/**
 * Paste-to-Download Image Tool
 * Main application script
 */

function imageApp() {
    return {
        // State variables
        images: [],
        isDragging: false,
        downloadFormat: 'png', // Default format
        
        // Handle pasting from clipboard
        handlePaste(event) {
            const items = (event.clipboardData || event.originalEvent.clipboardData).items;
            
            for (const item of items) {
                if (item.type.indexOf('image') === 0) {
                    const blob = item.getAsFile();
                    this.addImageFromFile(blob);
                }
            }
        },
        
        // Handle file selection from input
        handleFileSelect(event) {
            const files = event.target.files;
            for (const file of files) {
                if (file.type.startsWith('image/')) {
                    this.addImageFromFile(file);
                }
            }
            // Reset file input
            event.target.value = '';
        },
        
        // Handle drag and drop
        handleDrop(event) {
            const files = event.dataTransfer.files;
            for (const file of files) {
                if (file.type.startsWith('image/')) {
                    this.addImageFromFile(file);
                }
            }
        },
        
        // Add image to the collection
        addImageFromFile(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.images.push({
                    src: e.target.result,
                    file: file,
                    name: file.name || `image_${Date.now()}.png`,
                    size: file.size,
                    type: file.type
                });
            };
            reader.readAsDataURL(file);
        },
        
        // Convert and download a single image
        downloadSingleImage(image, index) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                // Convert to the selected format
                const fileName = this.generateFileName(image, index);
                
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    
                    // Clean up
                    setTimeout(() => URL.revokeObjectURL(url), 100);
                }, `image/${this.downloadFormat}`);
            };
            
            img.src = image.src;
        },
        
        // Generate filename for download
        generateFileName(image, index) {
            // Get original name without extension
            let baseName = 'image';
            if (image.name) {
                const nameParts = image.name.split('.');
                if (nameParts.length > 1) {
                    nameParts.pop(); // Remove extension
                }
                baseName = nameParts.join('.');
            } else {
                baseName = `image_${index + 1}`;
            }
            
            return `${baseName}.${this.downloadFormat}`;
        },
        
        // Format file size for display
        formatFileSize(bytes) {
            if (bytes < 1024) return bytes + ' bytes';
            else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
            else return (bytes / 1048576).toFixed(1) + ' MB';
        },
        
        // Clear all images
        clearImages() {
            this.images = [];
        },
        
        // Download all images as ZIP
        downloadAllAsZip() {
            const zip = new JSZip();
            let imageFolder = zip.folder("images");
            
            // Counter to track processed images
            let processedCount = 0;
            
            this.images.forEach((image, index) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    
                    canvas.toBlob((blob) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const fileName = this.generateFileName(image, index);
                            imageFolder.file(fileName, e.target.result, {binary: true});
                            
                            processedCount++;
                            if (processedCount === this.images.length) {
                                // All images processed, generate the ZIP
                                zip.generateAsync({type: "blob"}).then((content) => {
                                    const url = URL.createObjectURL(content);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `images_${new Date().toISOString().slice(0,10)}.zip`;
                                    a.click();
                                    
                                    // Clean up
                                    setTimeout(() => URL.revokeObjectURL(url), 100);
                                });
                            }
                        };
                        reader.readAsArrayBuffer(blob);
                    }, `image/${this.downloadFormat}`);
                };
                
                img.src = image.src;
            });
        }
    };
} 