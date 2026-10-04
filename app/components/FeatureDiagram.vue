<script setup lang="ts">
/**
 * Schematic illustrations for the feature grid.
 *
 * Each one draws the mechanism rather than decorating the claim — buttons
 * routed to actions, a sensitivity scale, a feature table with one entry
 * missing — so a visitor learns something from the picture. Colour comes from
 * tokens only, so every diagram follows the theme.
 */
defineProps<{
  kind: 'remap' | 'dpi' | 'battery' | 'discover' | 'root' | 'bus'
}>()
</script>

<template>
  <svg
    viewBox="0 0 320 168"
    fill="none"
    class="size-full font-mono text-[9px]"
    role="img"
    aria-hidden="true"
  >
    <!-- Buttons routed to actions -->
    <g v-if="kind === 'remap'">
      <g v-for="(row, i) in [
        { l: 'Back', r: 'Prev workspace', y: 30 },
        { l: 'Middle', r: 'Overview', y: 74, on: true },
        { l: 'Forward', r: 'Next workspace', y: 118 },
      ]" :key="row.l">
        <rect x="20" :y="row.y" width="86" height="26" rx="6"
          :class="row.on ? 'fill-accent/10 stroke-accent' : 'fill-canvas stroke-line-strong'" />
        <text x="32" :y="row.y + 16.5" :class="row.on ? 'fill-ink' : 'fill-ink-3'">{{ row.l }}</text>
        <rect x="214" :y="row.y" width="86" height="26" rx="6"
          :class="row.on ? 'fill-accent/10 stroke-accent' : 'fill-canvas stroke-line-strong'" />
        <text x="224" :y="row.y + 16.5" :class="row.on ? 'fill-ink' : 'fill-ink-3'">{{ row.r }}</text>
        <path :d="`M106 ${row.y + 13}H214`"
          :class="row.on ? 'stroke-accent' : 'stroke-line-strong'" stroke-dasharray="3 4" />
        <circle cx="160" :cy="row.y + 13" r="4.5"
          :class="row.on ? 'fill-accent' : 'fill-canvas stroke-line-strong'" />
      </g>
    </g>

    <!-- DPI scale -->
    <g v-else-if="kind === 'dpi'">
      <rect x="24" y="30" width="96" height="40" rx="8" class="fill-accent/10 stroke-accent" />
      <text x="36" y="48" class="fill-ink-3">DPI</text>
      <text x="36" y="63" class="fill-ink text-[13px]! font-medium">1600</text>
      <path d="M120 50h26" class="stroke-accent" />
      <g class="stroke-line-strong">
        <path v-for="n in 21" :key="n" :d="`M${24 + (n - 1) * 14.8} ${n % 5 === 1 ? 104 : 109}V118`" />
      </g>
      <path d="M24 118H320" class="stroke-line-strong" />
      <path d="M24 118H141" class="stroke-accent" stroke-width="2" />
      <path d="M141 70V118" class="stroke-accent" stroke-dasharray="2 3" />
      <circle cx="141" cy="118" r="6" class="fill-canvas stroke-accent" stroke-width="2" />
      <text x="24" y="140" class="fill-ink-4">200</text>
      <text x="276" y="140" class="fill-ink-4">8000</text>
      <rect x="196" y="30" width="100" height="22" rx="11" class="fill-canvas stroke-line-strong" />
      <circle cx="210" cy="41" r="3" class="fill-success" />
      <text x="220" y="44" class="fill-ink-2">stored onboard</text>
    </g>

    <!-- Battery -->
    <g v-else-if="kind === 'battery'">
      <rect x="62" y="48" width="170" height="64" rx="12" class="fill-canvas stroke-line-strong" stroke-width="1.5" />
      <rect x="232" y="68" width="10" height="24" rx="3" class="fill-line-strong" />
      <rect x="70" y="56" width="122" height="48" rx="7" class="fill-success/20 stroke-success" />
      <path d="M137 62 123 82h11l-3 16 15-21h-11l2-15Z" class="fill-success" />
      <text x="62" y="134" class="fill-ink-3">read from the device</text>
      <text x="206" y="134" class="fill-ink-2 font-medium">72% · charging</text>
      <g class="stroke-line-strong">
        <path d="M62 36h180M62 36v6M242 36v6M152 36v6" />
      </g>
      <text x="62" y="28" class="fill-ink-4">0</text>
      <text x="232" y="28" class="fill-ink-4">100</text>
    </g>

    <!-- Feature table with one entry the device does not report -->
    <g v-else-if="kind === 'discover'">
      <g v-for="(row, i) in [
        { id: '0x0005', n: 'device name', ok: true },
        { id: '0x1004', n: 'unified battery', ok: true },
        { id: '0x1B04', n: 'reprogrammable keys', ok: true },
        { id: '0x2201', n: 'adjustable dpi', ok: true },
        { id: '0x2150', n: 'thumb wheel', ok: false },
      ]" :key="row.id">
        <rect x="24" :y="14 + i * 29" width="272" height="23" rx="6"
          :class="row.ok ? 'fill-canvas stroke-line-strong' : 'fill-transparent stroke-line'"
          :stroke-dasharray="row.ok ? undefined : '3 3'" />
        <text x="36" :y="29.5 + i * 29" :class="row.ok ? 'fill-accent' : 'fill-ink-4'">{{ row.id }}</text>
        <text x="86" :y="29.5 + i * 29" :class="row.ok ? 'fill-ink-2' : 'fill-ink-4'">{{ row.n }}</text>
        <path v-if="row.ok" :d="`M274 ${25.5 + i * 29}l3.5 3.5 7-8`" class="stroke-success" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        <text v-else x="248" :y="29.5 + i * 29" class="fill-ink-4">no panel</text>
      </g>
    </g>

    <!-- Privilege: root once, then the session -->
    <g v-else-if="kind === 'root'">
      <g v-for="(row, i) in [
        { t: 'udev rule', s: 'root · once, at install', y: 18, on: false },
        { t: 'uaccess ACL', s: 'follows your login', y: 66, on: true },
        { t: 'OpenLogi', s: 'runs as your user', y: 114, on: false },
      ]" :key="row.t">
        <rect x="40" :y="row.y" width="240" height="36" rx="8"
          :class="row.on ? 'fill-accent/10 stroke-accent' : 'fill-canvas stroke-line-strong'" />
        <text x="54" :y="row.y + 15" :class="row.on ? 'fill-ink' : 'fill-ink-2'" class="font-medium">{{ row.t }}</text>
        <text x="54" :y="row.y + 28" class="fill-ink-3">{{ row.s }}</text>
        <path v-if="i < 2" :d="`M160 ${row.y + 36}V${row.y + 48}`" class="stroke-line-strong" />
        <path v-if="i < 2" :d="`M156 ${row.y + 44}l4 4 4-4`" class="stroke-line-strong" />
      </g>
      <text x="236" y="40" class="fill-ink-4">sudo ✕</text>
    </g>

    <!-- Several clients sharing one device -->
    <g v-else>
      <g v-for="(c, i) in ['OpenLogi', 'Solaar', 'fwupd']" :key="c">
        <rect x="20" :y="22 + i * 44" width="78" height="28" rx="7"
          :class="i === 0 ? 'fill-accent/10 stroke-accent' : 'fill-canvas stroke-line-strong'" />
        <text x="32" :y="40 + i * 44" :class="i === 0 ? 'fill-ink' : 'fill-ink-2'">{{ c }}</text>
        <path :d="`M98 ${36 + i * 44}H150`" :class="i === 0 ? 'stroke-accent' : 'stroke-line-strong'" />
      </g>
      <path d="M150 36V124" class="stroke-line-strong" stroke-width="1.5" />
      <path d="M150 80H206" class="stroke-line-strong" stroke-width="1.5" />
      <rect x="206" y="52" width="94" height="56" rx="10" class="fill-canvas stroke-line-strong" stroke-width="1.5" />
      <circle cx="253" cy="74" r="6" class="fill-surface-3 stroke-line-strong" />
      <text x="224" y="98" class="fill-ink-3">1 device</text>
      <text x="104" y="150" class="fill-ink-4">replies echo the swId</text>
    </g>
  </svg>
</template>
