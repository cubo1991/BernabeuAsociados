"use client";

import { useEffect, useState } from "react";
import EmpresasPage from "./empresas/page";

export default function Home() {


  return (
    <div className="p-6 space-y-6">
     

      <EmpresasPage />
    </div>
  );
}
