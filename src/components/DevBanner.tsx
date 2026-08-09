export function DevBanner() {
  return (
    <div
      className="border-b border-white/10 px-5 py-2 text-center sm:px-8 md:px-12"
      style={{
        background: 'linear-gradient(180deg, rgba(20,20,20,0.98) 0%, rgba(10,10,10,0.95) 100%)',
      }}
    >
      <p className="font-mono text-[11px] tracking-[0.1em] text-white/70 uppercase">
        In active development — expect rough edges.{' '}
        <a
          href="https://github.com/abhinavallani02-cyber/mayI"
          target="_blank"
          rel="noreferrer"
          className="text-white underline underline-offset-2 hover:text-white/80"
        >
          Follow progress on GitHub
        </a>
      </p>
    </div>
  )
}
