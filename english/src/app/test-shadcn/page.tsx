'use client';

import { Button } from "@/components/ui/button";

export default function TestShadcnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          🎉 Test shadcn/ui Integration
        </h1>
        
        <div className="bg-slate-800/60 p-8 rounded-xl border border-slate-700/50 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Button Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Button Sizes</h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🚀</Button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Interactive Examples</h2>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => alert('Button clicked!')}>
                Click Me
              </Button>
              <Button variant="outline" onClick={() => console.log('Console logged!')}>
                Log to Console
              </Button>
              <Button disabled>Disabled Button</Button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
            <p className="text-green-300 text-center font-semibold">
              ✅ Tích hợp shadcn/ui thành công! Bạn có thể sử dụng các component từ shadcn/ui trong dự án Next.js của mình.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <a href="/">← Quay về trang chủ</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

