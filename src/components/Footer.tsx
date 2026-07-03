export default function Footer() {
  return (
    <footer className="border-t border-warm-200 relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <img src="/maple-wordmark.png" alt="maple" className="h-8 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-warm-400 max-w-xs">
              On-device dictation for people who'd rather talk than type.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-warm-900">Product</h4>
            <ul className="mt-4 space-y-3 text-sm text-warm-500">
              <li><a href="#how" className="transition-colors hover:text-warm-900">How it works</a></li>
              <li><a href="#pricing" className="transition-colors hover:text-warm-900">Pricing</a></li>
              <li><a href="#download" className="transition-colors hover:text-warm-900">Download</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-warm-900">Connect</h4>
            <ul className="mt-4 space-y-3 text-sm text-warm-500">
              <li><a href="#" className="transition-colors hover:text-warm-900">X</a></li>
              <li><a href="#" className="transition-colors hover:text-warm-900">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-warm-200">
          <p className="text-sm text-warm-400">&copy; 2026 maple. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
