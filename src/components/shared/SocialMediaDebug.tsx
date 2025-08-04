"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SocialMediaDebug() {
  const [url, setUrl] = useState('https://pleviacity.vn');
  const [debugResults, setDebugResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const debugSocialMedia = async () => {
    setLoading(true);
    try {
      // Facebook Debugger
      const fbUrl = `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}`;
      window.open(fbUrl, '_blank');
      
      // Twitter Card Validator
      const twitterUrl = `https://cards-dev.twitter.com/validator?url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
      
      // LinkedIn Post Inspector
      const linkedinUrl = `https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(url)}`;
      window.open(linkedinUrl, '_blank');
      
      setDebugResults({
        facebook: fbUrl,
        twitter: twitterUrl,
        linkedin: linkedinUrl
      });
    } catch (error) {
      console.error('Debug error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Social Media Debug Tool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">Website URL:</Label>
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://pleviacity.vn"
          />
        </div>
        
        <Button 
          onClick={debugSocialMedia} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Đang mở...' : 'Debug Social Media'}
        </Button>
        
        {debugResults && (
          <div className="space-y-2 text-sm">
            <p className="font-semibold">Debug URLs đã mở:</p>
            <ul className="space-y-1">
              <li>• Facebook: <a href={debugResults.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Open Facebook Debugger</a></li>
              <li>• Twitter: <a href={debugResults.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Open Twitter Card Validator</a></li>
              <li>• LinkedIn: <a href={debugResults.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Open LinkedIn Post Inspector</a></li>
            </ul>
          </div>
        )}
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Hướng dẫn:</h4>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. Nhập URL website cần debug</li>
            <li>2. Click "Debug Social Media"</li>
            <li>3. Các tab debug sẽ mở tự động</li>
            <li>4. Kiểm tra metadata và cache</li>
            <li>5. Clear cache nếu cần thiết</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
} 