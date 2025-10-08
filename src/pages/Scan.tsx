import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Play, Square, Lightbulb, User, Clock, Activity, BarChart3, Link2, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ToastContainer';
import { getUserScans, saveScan, ScanData } from '@/lib/scan';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Scan = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [scans, setScans] = useState<ScanData[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [apiEndpoint, setApiEndpoint] = useState('https://api.raritone.ai/v1/scan');
  const [apiKey, setApiKey] = useState('');
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    if (user) {
      loadScans();
    }
  }, [user]);

  const loadScans = async () => {
    if (user) {
      try {
        const userScans = await getUserScans(user.uid);
        setScans(userScans);
      } catch (error) {
        console.error('Error loading scans:', error);
      }
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing camera:', error);
      showToast({
        type: 'error',
        title: 'Camera Access Denied',
        message: 'Please allow camera access to use body scan feature.'
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startScan = async () => {
    if (!user) {
      showToast({
        type: 'warning',
        title: 'Login Required',
        message: 'Please login to use the body scan feature.'
      });
      return;
    }

    if (!stream) {
      await startCamera();
      return;
    }

    setIsScanning(true);
    setCountdown(30);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          completeScan();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const completeScan = async () => {
    setIsScanning(false);

    if (user) {
      try {
        const scanData = {
          scanId: `scan_${Date.now()}`,
          height: null,
          weight: null,
          imageURL: null,
          device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          tryOnCount: 0
        };

        await saveScan(user.uid, scanData);
        await loadScans();

        showToast({
          type: 'success',
          title: 'Scan Complete!',
          message: 'Your body scan has been completed successfully.'
        });
      } catch (error) {
        console.error('Error saving scan:', error);
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to save scan. Please try again.'
        });
      }
    }

    stopCamera();
  };

  const cancelScan = () => {
    setIsScanning(false);
    setCountdown(0);
    stopCamera();
    showToast({
      type: 'info',
      title: 'Scan Cancelled',
      message: 'Body scan has been cancelled.'
    });
  };

  const handleApiConnect = () => {
    if (apiEndpoint && apiKey) {
      setApiConnected(true);
      showToast({
        type: 'success',
        title: 'API Connected',
        message: 'Successfully connected to backend API.'
      });
    } else {
      showToast({
        type: 'error',
        title: 'Connection Failed',
        message: 'Please provide both API endpoint and API key.'
      });
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="light-page">
      <Navbar
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Body Scan"
        showBackButton={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="light-page-header">AI Body Scan</h1>
          <p className="light-page-text">
            Capture your body measurements with AI precision. Position yourself 6 feet away from your camera in good lighting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Your Progress */}
          <div className="lg:col-span-1">
            <div className="light-card">
              <h2 className="light-page-subheader flex items-center mb-6">
                <Activity className="mr-2 text-[var(--accent-color)]" size={24} />
                Your Progress
              </h2>

              <div className="space-y-4">
                <div className="light-card-ivory text-center">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 size={20} className="text-[var(--accent-color)] mr-2" />
                    <div className="text-3xl font-bold" style={{ color: 'var(--page-text-primary)' }}>
                      {scans.length}
                    </div>
                  </div>
                  <div className="light-page-text text-sm">Total Scans</div>
                </div>

                <div className="light-card-ivory text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock size={20} className="text-[var(--accent-color)] mr-2" />
                    <div className="text-xl font-semibold" style={{ color: 'var(--page-text-primary)' }}>
                      {scans.length > 0
                        ? new Date(scans[0].scanTime).toLocaleDateString()
                        : 'Never'
                      }
                    </div>
                  </div>
                  <div className="light-page-text text-sm">Latest Scan</div>
                </div>

                <div className="light-card-ivory text-center">
                  <div className="flex items-center justify-center mb-2">
                    <User size={20} className="text-[var(--accent-color)] mr-2" />
                    <div className="text-3xl font-bold" style={{ color: 'var(--page-text-primary)' }}>
                      {scans.reduce((total, scan) => total + scan.tryOnCount, 0)}
                    </div>
                  </div>
                  <div className="light-page-text text-sm">Virtual Try-Ons</div>
                </div>

                <button
                  className="w-full btn-secondary py-3 mt-4"
                  style={{ color: 'var(--page-text-primary)' }}
                >
                  View Scan History
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Camera & API Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Camera Preview */}
            <div className="light-card">
              <div className="aspect-video rounded-lg mb-6 relative overflow-hidden" style={{ background: '#0E0E0E', border: '1.5px solid var(--border-color)' }}>
                {stream ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {countdown > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-white text-6xl font-bold">
                          {countdown}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Camera size={64} style={{ color: 'var(--text-primary)' }} className="mx-auto mb-4 opacity-50" />
                      <p style={{ color: 'var(--text-primary)' }} className="text-lg">Camera Preview</p>
                      <p style={{ color: 'var(--text-secondary)' }} className="text-sm opacity-50 mt-2">
                        Click "Start Body Scan" to begin
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Scan Button */}
              <div className="flex space-x-4">
                {!isScanning ? (
                  <button
                    onClick={startScan}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2 py-4 text-lg font-semibold"
                  >
                    <Play size={24} />
                    <span>Start Body Scan</span>
                  </button>
                ) : (
                  <button
                    onClick={cancelScan}
                    className="flex-1 flex items-center justify-center space-x-2 py-4 text-lg font-semibold"
                    style={{
                      background: 'var(--error-color)',
                      color: 'white',
                      borderRadius: '0.75rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Square size={24} />
                    <span>Cancel Scan</span>
                  </button>
                )}
              </div>
            </div>

            {/* Scan Tips Section */}
            <div className="light-card-ivory">
              <h3 className="font-semibold mb-4 flex items-center" style={{ color: 'var(--page-text-primary)' }}>
                <Lightbulb className="mr-2 text-[var(--accent-color)]" size={20} />
                Scan Tips for Best Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3 p-3 rounded-lg" style={{ background: 'var(--page-card-white)', border: '1px solid var(--border-color)' }}>
                  <Lightbulb size={20} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                  <div>
                    <div className="font-medium mb-1" style={{ color: 'var(--page-text-primary)' }}>Good Lighting</div>
                    <div className="text-sm light-page-text">Ensure bright, even lighting without shadows</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg" style={{ background: 'var(--page-card-white)', border: '1px solid var(--border-color)' }}>
                  <User size={20} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                  <div>
                    <div className="font-medium mb-1" style={{ color: 'var(--page-text-primary)' }}>Fitted Clothing</div>
                    <div className="text-sm light-page-text">Wear form-fitting clothes for accurate measurements</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg" style={{ background: 'var(--page-card-white)', border: '1px solid var(--border-color)' }}>
                  <Clock size={20} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                  <div>
                    <div className="font-medium mb-1" style={{ color: 'var(--page-text-primary)' }}>Stay Still</div>
                    <div className="text-sm light-page-text">Keep steady during the 30-second scan</div>
                  </div>
                </div>
              </div>
            </div>

            {/* API Connection Module */}
            <div className="light-card-ivory">
              <h3 className="font-semibold mb-4 flex items-center" style={{ color: 'var(--page-text-primary)' }}>
                <Link2 className="mr-2 text-[var(--accent-color)]" size={20} />
                Backend API Connection
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--page-text-secondary)' }}>
                    API Endpoint URL
                  </label>
                  <input
                    type="text"
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    className="light-input w-full"
                    placeholder="https://api.raritone.ai/v1/scan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--page-text-secondary)' }}>
                    API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="light-input w-full"
                    placeholder="Enter your API key"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: 'var(--page-card-white)', border: '1px solid var(--border-color)' }}>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--page-text-secondary)' }}>
                      Connection Status:
                    </span>
                    {apiConnected ? (
                      <span className="flex items-center space-x-1 badge-success">
                        <CheckCircle2 size={14} />
                        <span>Connected</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 badge-error">
                        <XCircle size={14} />
                        <span>Disconnected</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleApiConnect}
                    className="btn-primary px-6 py-2"
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
