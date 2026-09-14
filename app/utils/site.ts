// Single source of truth for anything that appears in more than one place.
// Copy drifts fast on marketing sites; keeping it here means the version
// number in the nav and the one in the download page can never disagree.

export const site = {
  name: 'OpenLogi',
  tagline: 'Logitech devices, natively on Linux.',
  description:
    'Configure Logitech mice and keyboards natively on Linux. No proprietary software, no sudo, no cloud account.',
  repo: 'https://github.com/mohin7/openlogi',
  version: '0.1.0',
  licence: 'GPL-3.0-or-later',
} as const

export const nav = [
  { label: 'Features', to: '/#features' },
  { label: 'Devices', to: '/devices' },
  { label: 'Docs', to: '/docs' },
  { label: 'Download', to: '/download' },
] as const

/** Headline capabilities — the feature grid on the landing page. */
export const features = [
  {
    icon: 'lucide:mouse-pointer-click',
    title: 'Remap every button',
    body: 'Bind any reprogrammable control to a keystroke, a media key, a shell command, a URL, or a workspace switch. OpenLogi asks the firmware to divert the button, then synthesises whatever you mapped it to.',
  },
  {
    icon: 'lucide:gauge',
    title: 'DPI written onboard',
    body: 'Sensitivity is stored in the device’s own flash, so it survives a reboot and keeps working with OpenLogi closed. Where firmware supports it, onboard always wins over host-side trickery.',
  },
  {
    icon: 'lucide:battery-charging',
    title: 'Real battery state',
    body: 'Charge level, charging status and capability are read straight from the device over HID++ — not estimated from voltage curves or guessed from a lookup table.',
  },
  {
    icon: 'lucide:scan-search',
    title: 'Discovered, not hard-coded',
    body: 'Screens appear because your device reports the matching HID++ feature, never because its name is on a list. Plug in hardware released next year and the right controls show up.',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Never runs as root',
    body: 'The one privileged step is installing a udev rule. After that, access follows your login session through a uaccess ACL and is revoked when you log out.',
  },
  {
    icon: 'lucide:layers',
    title: 'Shares the bus',
    body: 'A software id tag on every request means OpenLogi coexists with Solaar and fwupd instead of fighting them for the device. Run all three at once.',
  },
] as const

/** The connection paths the HID++ layer handles. */
export const transports = [
  { name: 'Bolt', detail: 'Logitech’s current secure receiver' },
  { name: 'Unifying', detail: 'The long-running 2.4 GHz receiver' },
  { name: 'Lightspeed', detail: 'Low-latency gaming receiver' },
  { name: 'Bluetooth LE', detail: 'Direct, no dongle' },
  { name: 'USB cable', detail: 'Wired and charging' },
] as const

/** HID++ features implemented today, shown as the capability matrix. */
export const capabilities = [
  { id: '0x0003', name: 'Device info', note: 'Model, serial, firmware build' },
  { id: '0x0005', name: 'Device name', note: 'Marketing name and kind' },
  { id: '0x1000', name: 'Battery status', note: 'Level and charging state' },
  { id: '0x1001', name: 'Battery voltage', note: 'Millivolts, for older devices' },
  { id: '0x1004', name: 'Unified battery', note: 'Newer unified reporting' },
  { id: '0x1b04', name: 'Reprogrammable controls', note: 'Diversion and remapping' },
  { id: '0x2201', name: 'Adjustable DPI', note: 'Onboard sensitivity' },
] as const

/**
 * Distro install targets on the download page.
 *
 * `file` is the release asset name; it is appended to the /releases/latest/
 * download/ redirect, which GitHub resolves to the newest release. That keeps
 * the link correct across versions without editing this file — the asset names
 * just have to keep matching whatever the release workflow produces.
 *
 * `detect` matches navigator.userAgent so the visitor's distro is preselected.
 * Only Ubuntu and Fedora identify themselves there; everything else falls back
 * to the default tab, which is why no Arch pattern is listed.
 */
export const installTargets = [
  {
    id: 'deb',
    label: 'Debian / Ubuntu',
    icon: 'simple-icons:debian',
    file: 'openlogi_0.1.0_amd64.deb',
    command: 'sudo apt install ./openlogi_0.1.0_amd64.deb',
    detect: /ubuntu|debian/i,
  },
  {
    id: 'rpm',
    label: 'Fedora / RHEL',
    icon: 'simple-icons:fedora',
    file: 'openlogi-0.1.0-1.x86_64.rpm',
    command: 'sudo dnf install ./openlogi-0.1.0-1.x86_64.rpm',
    detect: /fedora|red hat|rhel/i,
  },
  {
    id: 'arch',
    label: 'Arch Linux',
    icon: 'simple-icons:archlinux',
    file: 'openlogi-bin',
    command: 'yay -S openlogi-bin',
    detect: undefined,
  },
  {
    id: 'source',
    label: 'From source',
    icon: 'lucide:terminal',
    file: 'git',
    command:
      'git clone https://github.com/mohin7/openlogi\ncd openlogi\n./scripts/setup.sh',
    detect: undefined,
  },
] as const

/**
 * A direct link to a release asset. GitHub redirects /releases/latest/download/
 * to the newest release, so this never names a version.
 */
export const assetUrl = (file: string) =>
  `${site.repo}/releases/latest/download/${file}`

export const faqs = [
  {
    q: 'Does this replace Logitech Options+?',
    a: 'For Linux, that is the intent — Options+ has never shipped a Linux build. OpenLogi covers button remapping, DPI, battery and device information. Options+ features that depend on Logitech’s cloud services, such as Flow and account sync, are out of scope by design.',
  },
  {
    q: 'Do I need to run it with sudo?',
    a: 'No. Installing a udev rule needs root once, at install time. After that OpenLogi runs entirely as your user. The rule uses uaccess, so the permission is attached to whoever is physically logged in and is dropped at logout.',
  },
  {
    q: 'Does it work on Wayland?',
    a: 'Yes, and it was built for it. Input is synthesised through the kernel’s uinput device rather than injected into a display server, so the same code path works identically on Wayland and X11. Client-side approaches like XTEST do not work on Wayland at all.',
  },
  {
    q: 'Can I run it alongside Solaar?',
    a: 'Yes. Every HID++ 2.0 request carries a 4-bit software id and replies echo it back, so two programs can share one device without stealing each other’s responses. OpenLogi uses a distinct id from Solaar and fwupd.',
  },
  {
    q: 'Which devices are supported?',
    a: 'Any Logitech device speaking HID++, over Bolt, Unifying, Lightspeed, Bluetooth or USB. Rather than matching a model list, OpenLogi asks the device which features it implements and shows only those. Cheaper devices expose fewer features — the app tells you which.',
  },
  {
    q: 'What is the licence?',
    a: 'GPL-3.0-or-later. The protocol work, the desktop app and this website are all open source, and contributions are welcome.',
  },
] as const
