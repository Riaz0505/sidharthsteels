import React, { Component, ErrorInfo, ReactNode } from "react";
import { RefreshCcw, AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
          <div className="max-w-md w-full bg-red-50 border border-red-100 rounded-[32px] p-12 text-center shadow-xl">
             <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <AlertTriangle className="text-red-600" size={40} />
             </div>
             <h1 className="text-2xl font-bold text-red-950 mb-4">Something went wrong</h1>
             <p className="text-red-700/70 font-medium mb-10 leading-relaxed text-sm">
                The application encountered an unexpected runtime error. We have been notified and are working on it.
             </p>
             <button 
               onClick={() => window.location.reload()}
               className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
             >
               <RefreshCcw size={18} /> Reload Application
             </button>
             <p className="mt-8 text-[10px] font-mono text-red-300 uppercase tracking-widest truncate max-w-full">
                {this.state.error?.message}
             </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
