import va from "@vercel/analytics"

type EventName =
  | "copy_npm_command"
  | "copy_usage_import_code"
  | "copy_usage_code"
  | "copy_primitive_code"
  | "copy_theme_code"
  | "copy_block_code"
  | "copy_chunk_code"
  | "enable_lift_mode"
  | "copy_chart_code"
  | "copy_chart_theme"
  | "copy_chart_data"
  | "copy_color"
  | "set_layout"

export type Event = {
  name: EventName
  properties?: Record<string, string | number | boolean | null>
}

export function trackEvent(input: Event): void {
  va.track(input.name, input.properties)
}
