export default function Footer() {
  return (
    <footer className="border-t border-warm-200 relative z-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-7 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xs">
          <img src="/maple-wordmark.png" alt="maple" className="h-9 w-auto" />
          <p className="mt-3 text-sm leading-relaxed text-warm-400">
            On-device dictation for people who&apos;d rather talk than type.
          </p>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium text-warm-500">
          <a href="#" className="transition-colors hover:text-warm-900">Download</a>
          <a href="#" className="transition-colors hover:text-warm-900">Twitter</a>
          <a href="#" className="transition-colors hover:text-warm-900">GitHub</a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-warm-200 px-6 py-7">
        <p className="text-sm text-warm-400">&copy; 2026 maple</p>
      </div>
    </footer>
  );
}
