export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 sm:px-8 md:px-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-1 text-sm text-white/50">
        <p>Built by Abhinav Allani.</p>
        <p>
          MIT licensed.{' '}
          <a
            href="https://github.com/abhinavallani02-cyber/mayI"
            target="_blank"
            rel="noreferrer"
            className="text-white/70 underline underline-offset-2 hover:text-white"
          >
            github.com/abhinavallani02-cyber/mayI
          </a>
        </p>
      </div>
    </footer>
  )
}
