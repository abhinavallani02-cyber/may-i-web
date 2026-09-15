import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { INSTALL_COMMAND } from '../lib/site'

type Variant = 'sky' | 'light' | 'dark'

export function CopyCommand({
  command = INSTALL_COMMAND,
  variant = 'sky',
  id,
}: {
  command?: string
  variant?: Variant
  id?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
    } catch {
      const el = document.createElement('textarea')
      el.value = command
      el.setAttribute('readonly', '')
      el.style.position = 'fixed'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const wrap =
    variant === 'sky'
      ? 'bg-white text-ink shadow-[0_12px_40px_rgba(0,40,80,0.18)]'
      : variant === 'light'
        ? 'bg-ink text-white'
        : 'bg-white/8 text-white ring-1 ring-white/12'

  const btn =
    variant === 'sky'
      ? 'bg-black text-white hover:bg-neutral-800'
      : variant === 'light'
        ? 'bg-white text-ink hover:bg-white/90'
        : 'bg-white text-ink hover:bg-white/90'

  return (
    <div
      id={id}
      className={`flex w-full max-w-3xl items-center gap-2 rounded-full p-1.5 pl-4 sm:pl-5 ${wrap}`}
    >
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[11px] leading-none tracking-tight sm:text-[13px]">
        {command}
      </code>
      <button
        type="button"
        onClick={() => void copy()}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold tracking-tight transition-colors sm:px-4 ${btn}`}
        aria-label="Copy install command"
      >
        {copied ? <Check size={14} strokeWidth={2.4} /> : <Copy size={14} strokeWidth={2.2} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
