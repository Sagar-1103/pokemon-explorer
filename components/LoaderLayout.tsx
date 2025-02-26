"use client";
import { useState, useEffect } from "react";
import { Provider } from "./ui/provider";
import Sidebar from "./Sidebar";
import Loading from "./Loading";

export default function LoaderLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loading/>
  ) : (
    <Provider>
      <Sidebar />
      <div className="md:ml-20">
      {children}
      </div>
    </Provider>
  );
}
