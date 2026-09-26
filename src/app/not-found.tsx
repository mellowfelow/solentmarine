import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-20 text-center space-y-4 font-sans">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
      <h1 className="font-sans font-bold text-slate-900 text-lg">Page Not Found</h1>
      <p className="text-sm text-slate-550">We could not locate the page you were looking for.</p>
      <Link
        href="/shop/"
        className="inline-block px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
      >
        Return to Stock Center
      </Link>
    </div>
  );
}
