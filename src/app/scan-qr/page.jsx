"use client";
import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function PublicQRScannerPage() {
  const [data, setData] = useState("No result");
  const [scanResult, setScanResult] = useState(null);

  const handleScanResult = (err, result) => {
    if (result) {
      setData(result.text);
      setScanResult(result.text);
      // You can add additional logic here to process the scanned QR code
      // For example, display product information, verify authenticity, etc.
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🔍 Verify Product Authenticity
          </h1>
          <p className="text-lg text-gray-600">
            Scan the QR code on your herbal product to verify its authenticity and trace its journey
          </p>
        </div>

        {/* Scanner Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">QR Code Scanner</h2>
          
          <div className="flex flex-col items-center">
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden mb-4">
              <BarcodeScannerComponent
                width={300}
                height={300}
                onUpdate={handleScanResult}
              />
            </div>
            
            <p className="text-sm text-gray-500 text-center max-w-md">
              Position the QR code within the scanner frame. Make sure the code is well-lit and clearly visible.
            </p>
          </div>
        </div>

        {/* Results Section */}
        {scanResult && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Scan Results</h2>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">Scanned Data:</p>
              <p className="font-mono text-sm bg-white p-2 rounded border break-all">
                {data}
              </p>
            </div>

            {/* You can add more detailed product information here */}
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-2">Product Information</h3>
              <p className="text-sm text-gray-600">
                Processing scanned data to verify product authenticity and display traceability information...
              </p>
              {/* Add your product verification logic here */}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            How to Use the QR Scanner
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">1.</span>
              <span>Locate the QR code on your herbal product packaging</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">2.</span>
              <span>Allow camera access when prompted by your browser</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">3.</span>
              <span>Hold the QR code steady within the scanner frame</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">4.</span>
              <span>View the product authenticity and traceability information</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}