"use client";
import { RoleGuard } from "@/components/RoleGuard";
import { ROLES } from "@/utils/roles";
import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function ConsumerDashboard() {
  const [data, setData] = useState("No result");

  return (
    <RoleGuard allowed={[ROLES.CONSUMER]}>
        <div className="bg-white text-gray-900 min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4 text-black">👩‍👩‍👦 Consumer Dashboard</h2>
            <p className="text-black">Scan QR codes and verify product provenance.</p>
          <div className="mt-6 border-2 border-gray-300 rounded-lg w-[300px] h-[300px] flex items-center justify-center">
            <BarcodeScannerComponent
              width={300}
              height={300}
              onUpdate={(err, result) => {
                if (result) setData(result.text);
              }}
            />
          </div>
          <p className="mt-4">Scanned Result: <span className="font-bold">{data}</span></p>
        </div>
    </RoleGuard>
  );
}
