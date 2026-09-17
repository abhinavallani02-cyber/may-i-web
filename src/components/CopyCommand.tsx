import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { INSTALL_COMMAND } from '../lib/site'

export function CopyCommand({
  command = INSTALL_COMMAND,
  id,
}: {
  command?: string
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

  return (
    <div
      id={id}
      className="flex w-full min-w-0 items-center gap-2 rounded-lg bg-[#0c0c0c] p-1.5 pl-4 ring-1 ring-white/10 sm:pl-5"
    >
      <code className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap font-mono text-[11px] leading-none tracking-tight text-white/75 sm:text-[13px]">
        {command}
      </code>
      <button
        type="button"
        onClick={() => void copy()}
        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-acid px-3.5 text-[11px] font-bold tracking-[0.14em] text-black uppercase transition-colors hover:bg-[#edff7a] sm:px-4"
        aria-label="Copy install command"
      >
        {copied ? <Check size={14} strokeWidth={2.4} /> : <Copy size={14} strokeWidth={2.2} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
