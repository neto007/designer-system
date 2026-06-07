import { useState } from 'react'
import { Save, Key, Trash2, Plus, Eye, EyeOff, Bell, Shield, User } from 'lucide-react'
import {
  Button, Badge, Input, Textarea, Toggle,
  FormField, Tabs, TabsList, TabsTrigger, TabsContent,
  Avatar, Select,
} from '@shieldai/ds'
import { ExampleShell } from './ExampleShell'

const API_KEYS = [
  { id: 'k1', name: 'Production LLM',  prefix: 'sk-prod-••••••••', created: '2024-11-01', last: '2 min ago',  active: true  },
  { id: 'k2', name: 'Staging Scanner', prefix: 'sk-stg-••••••••',  created: '2024-10-15', last: '1h ago',     active: true  },
  { id: 'k3', name: 'Legacy Pipeline', prefix: 'sk-leg-••••••••',  created: '2024-08-01', last: '3 days ago', active: false },
]

const ROLE_ITEMS = [
  { value: 'analyst',  label: 'SOC Analyst'       },
  { value: 'engineer', label: 'Security Engineer'  },
  { value: 'manager',  label: 'Security Manager'   },
  { value: 'admin',    label: 'Administrator'       },
]

export default function SettingsExamplePage() {
  const [tab, setTab]           = useState('profile')
  const [name, setName]         = useState('João Dilioli')
  const [email, setEmail]       = useState('joao@shieldai.com')
  const [bio, setBio]           = useState('Senior SOC Analyst at ShieldAI. Focused on threat intelligence and automated response pipelines.')
  const [role, setRole]         = useState('analyst')
  const [notifEmail, setNotifEmail]       = useState(true)
  const [notifSlack, setNotifSlack]       = useState(true)
  const [notifCritical, setNotifCritical] = useState(true)
  const [notifHigh, setNotifHigh]         = useState(true)
  const [notifMedium, setNotifMedium]     = useState(false)
  const [showKey, setShowKey]   = useState<string | null>(null)
  const [saved, setSaved]       = useState(false)

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <ExampleShell
      title="Settings"
      actions={
        <Button size="sm" variant={saved ? 'neu-green' : 'neu-purple'}
          leftIcon={<Save className="h-3.5 w-3.5" />} onClick={handleSave}>
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      }
    >
      <div className="max-w-3xl">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="profile"><User className="h-3.5 w-3.5 mr-1.5" />Profile</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="h-3.5 w-3.5 mr-1.5" />Notifications</TabsTrigger>
            <TabsTrigger value="api"><Key className="h-3.5 w-3.5 mr-1.5" />API Keys</TabsTrigger>
            <TabsTrigger value="security"><Shield className="h-3.5 w-3.5 mr-1.5" />Security</TabsTrigger>
          </TabsList>

          {/* ── Profile ── */}
          <TabsContent value="profile" className="mt-6 space-y-6">
            <div className="bg-ds-panel border border-ds-current rounded-ds-xl p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar size="lg" initials="JD" />
                <div>
                  <Button size="sm" variant="ghost">Change avatar</Button>
                  <p className="text-[11px] font-mono text-ds-comment mt-1">JPG, PNG or GIF · max 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField id="name" label="Full name" required>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
                </FormField>
                <FormField id="email" label="Email address" required>
                  <Input value={email} onChange={e => setEmail(e.target.value)} type="email" />
                </FormField>
              </div>

              <FormField id="bio" label="Bio" description="Brief description for your profile.">
                <Textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} />
              </FormField>

              <FormField id="role" label="Role">
                <Select value={role} onValueChange={setRole} items={ROLE_ITEMS} />
              </FormField>
            </div>

            <div className="bg-ds-panel border border-ds-red/30 rounded-ds-xl p-5">
              <h3 className="text-sm font-semibold text-ds-red mb-1">Danger Zone</h3>
              <p className="text-[12px] text-ds-comment mb-4">These actions are irreversible.</p>
              <div className="flex items-center justify-between py-3 border-t border-ds-current">
                <div>
                  <div className="text-[13px] font-medium text-ds-fg">Delete account</div>
                  <div className="text-[11px] text-ds-comment">Permanently delete your account and all data.</div>
                </div>
                <Button size="sm" variant="ghost" leftIcon={<Trash2 className="h-3.5 w-3.5" />}
                  className="text-ds-red border-ds-red/30 hover:bg-ds-red/10">Delete</Button>
              </div>
            </div>
          </TabsContent>

          {/* ── Notifications ── */}
          <TabsContent value="notifications" className="mt-6">
            <div className="bg-ds-panel border border-ds-current rounded-ds-xl divide-y divide-ds-current">
              <div className="p-5">
                <h3 className="text-sm font-semibold text-ds-fg mb-4">Channels</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Email notifications', desc: 'Receive alerts at joao@shieldai.com', val: notifEmail, set: setNotifEmail },
                    { label: 'Slack notifications', desc: 'Post to #security-alerts channel',    val: notifSlack, set: setNotifSlack },
                  ].map(({ label, desc, val, set }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div>
                        <div className="text-[13px] font-medium text-ds-fg">{label}</div>
                        <div className="text-[11px] text-ds-comment">{desc}</div>
                      </div>
                      <Toggle checked={val} onCheckedChange={set} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-sm font-semibold text-ds-fg mb-4">Alert severity</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Critical', badge: 'red'    as const, val: notifCritical, set: setNotifCritical },
                    { label: 'High',     badge: 'orange' as const, val: notifHigh,     set: setNotifHigh     },
                    { label: 'Medium',   badge: 'yellow' as const, val: notifMedium,   set: setNotifMedium   },
                  ].map(({ label, badge, val, set }) => (
                    <div key={label} className="flex items-center justify-between">
                      <Badge variant={badge}>{label}</Badge>
                      <Toggle checked={val} onCheckedChange={set} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── API Keys ── */}
          <TabsContent value="api" className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[12px] text-ds-comment">Keys are shown once. Store them securely.</p>
              <Button size="sm" variant="neu-purple" leftIcon={<Plus className="h-3.5 w-3.5" />}>New Key</Button>
            </div>

            <div className="bg-ds-panel border border-ds-current rounded-ds-xl divide-y divide-ds-current">
              {API_KEYS.map(k => (
                <div key={k.id} className="flex items-center gap-4 p-4">
                  <Key className="h-4 w-4 text-ds-comment flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-medium text-ds-fg">{k.name}</span>
                      {k.active
                        ? <Badge variant="green">active</Badge>
                        : <Badge variant="muted">inactive</Badge>}
                    </div>
                    <div className="text-[11px] font-mono text-ds-comment mt-0.5">
                      {showKey === k.id ? 'sk-real-key-shown-here-once' : k.prefix}
                      {' '}· Created {k.created} · Last used {k.last}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setShowKey(v => v === k.id ? null : k.id)}
                      className="p-1.5 text-ds-comment hover:text-ds-fg transition-colors">
                      {showKey === k.id ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                    <button className="p-1.5 text-ds-comment hover:text-ds-red transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── Security ── */}
          <TabsContent value="security" className="mt-6">
            <div className="bg-ds-panel border border-ds-current rounded-ds-xl divide-y divide-ds-current">
              {[
                { label: 'Two-factor authentication', desc: 'Add an extra layer of security.', action: 'Enable 2FA',  done: false },
                { label: 'Active sessions',            desc: '2 active sessions on different devices.', action: 'Manage', done: false },
                { label: 'Audit log',                  desc: 'View all security events.',       action: 'View log',  done: true  },
              ].map(({ label, desc, action, done }) => (
                <div key={label} className="flex items-center justify-between p-4">
                  <div>
                    <div className="text-[13px] font-medium text-ds-fg">{label}</div>
                    <div className="text-[11px] text-ds-comment">{desc}</div>
                  </div>
                  <Button size="sm" variant={done ? 'ghost' : 'neu-purple'}>{action}</Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ExampleShell>
  )
}
