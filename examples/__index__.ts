import { lazy } from "react";

export const ExamplesIndex: Record<
  string,
  {
    component: React.LazyExoticComponent<React.ComponentType>;
    filePath: string;
  }
> = {
  "alert-custom": {
    component: lazy(() => import("./alert-custom")),
    filePath: "examples/alert-custom.tsx",
  },
  "alert-demo": {
    component: lazy(() => import("./alert-demo")),
    filePath: "examples/alert-demo.tsx",
  },
  "alert-error": {
    component: lazy(() => import("./alert-error")),
    filePath: "examples/alert-error.tsx",
  },
  "alert-no-border": {
    component: lazy(() => import("./alert-no-border")),
    filePath: "examples/alert-no-border.tsx",
  },
  "alert-warning": {
    component: lazy(() => import("./alert-warning")),
    filePath: "examples/alert-warning.tsx",
  },
  "app-shell-demo": {
    component: lazy(() => import("./app-shell-demo")),
    filePath: "examples/app-shell-demo.tsx",
  },
  "aspect-ratio-demo": {
    component: lazy(() => import("./aspect-ratio-demo")),
    filePath: "examples/aspect-ratio-demo.tsx",
  },
  "badge-basic": {
    component: lazy(() => import("./badge-basic")),
    filePath: "examples/badge-basic.tsx",
  },
  "badge-bold": {
    component: lazy(() => import("./badge-bold")),
    filePath: "examples/badge-bold.tsx",
  },
  "badge-custom-border": {
    component: lazy(() => import("./badge-custom-border")),
    filePath: "examples/badge-custom-border.tsx",
  },
  "badge-demo": {
    component: lazy(() => import("./badge-demo")),
    filePath: "examples/badge-demo.tsx",
  },
  "banner-demo": {
    component: lazy(() => import("./banner-demo")),
    filePath: "examples/banner-demo.tsx",
  },
  "banner-error": {
    component: lazy(() => import("./banner-error")),
    filePath: "examples/banner-error.tsx",
  },
  "banner-success": {
    component: lazy(() => import("./banner-success")),
    filePath: "examples/banner-success.tsx",
  },
  "bar-chart-demo": {
    component: lazy(() => import("./bar-chart-demo")),
    filePath: "examples/bar-chart-demo.tsx",
  },
  "big-text-demo": {
    component: lazy(() => import("./big-text-demo")),
    filePath: "examples/big-text-demo.tsx",
  },
  "box-demo": {
    component: lazy(() => import("./box-demo")),
    filePath: "examples/box-demo.tsx",
  },
  "breadcrumb-demo": {
    component: lazy(() => import("./breadcrumb-demo")),
    filePath: "examples/breadcrumb-demo.tsx",
  },
  "bullet-list-demo": {
    component: lazy(() => import("./bullet-list-demo")),
    filePath: "examples/bullet-list-demo.tsx",
  },
  "card-demo": {
    component: lazy(() => import("./card-demo")),
    filePath: "examples/card-demo.tsx",
  },
  "center-demo": {
    component: lazy(() => import("./center-demo")),
    filePath: "examples/center-demo.tsx",
  },
  "chat-message-demo": {
    component: lazy(() => import("./chat-message-demo")),
    filePath: "examples/chat-message-demo.tsx",
  },
  "chat-thread-demo": {
    component: lazy(() => import("./chat-thread-demo")),
    filePath: "examples/chat-thread-demo.tsx",
  },
  "checkbox-demo": {
    component: lazy(() => import("./checkbox-demo")),
    filePath: "examples/checkbox-demo.tsx",
  },
  "checkbox-group-demo": {
    component: lazy(() => import("./checkbox-group-demo")),
    filePath: "examples/checkbox-group-demo.tsx",
  },
  "clipboard-demo": {
    component: lazy(() => import("./clipboard-demo")),
    filePath: "examples/clipboard-demo.tsx",
  },
  "clock-demo": {
    component: lazy(() => import("./clock-demo")),
    filePath: "examples/clock-demo.tsx",
  },
  "code-demo": {
    component: lazy(() => import("./code-demo")),
    filePath: "examples/code-demo.tsx",
  },
  "code-multiline": {
    component: lazy(() => import("./code-multiline")),
    filePath: "examples/code-multiline.tsx",
  },
  "color-picker-demo": {
    component: lazy(() => import("./color-picker-demo")),
    filePath: "examples/color-picker-demo.tsx",
  },
  "columns-demo": {
    component: lazy(() => import("./columns-demo")),
    filePath: "examples/columns-demo.tsx",
  },
  "command-palette-demo": {
    component: lazy(() => import("./command-palette-demo")),
    filePath: "examples/command-palette-demo.tsx",
  },
  "confirm-demo": {
    component: lazy(() => import("./confirm-demo")),
    filePath: "examples/confirm-demo.tsx",
  },
  "data-grid-demo": {
    component: lazy(() => import("./data-grid-demo")),
    filePath: "examples/data-grid-demo.tsx",
  },
  "date-picker-demo": {
    component: lazy(() => import("./date-picker-demo")),
    filePath: "examples/date-picker-demo.tsx",
  },
  "definition-demo": {
    component: lazy(() => import("./definition-demo")),
    filePath: "examples/definition-demo.tsx",
  },
  "dialog-demo": {
    component: lazy(() => import("./dialog-demo")),
    filePath: "examples/dialog-demo.tsx",
  },
  "diff-view-demo": {
    component: lazy(() => import("./diff-view-demo")),
    filePath: "examples/diff-view-demo.tsx",
  },
  "digits-demo": {
    component: lazy(() => import("./digits-demo")),
    filePath: "examples/digits-demo.tsx",
  },
  "directory-tree-demo": {
    component: lazy(() => import("./directory-tree-demo")),
    filePath: "examples/directory-tree-demo.tsx",
  },
  "divider-demo": {
    component: lazy(() => import("./divider-demo")),
    filePath: "examples/divider-demo.tsx",
  },
  "drawer-demo": {
    component: lazy(() => import("./drawer-demo")),
    filePath: "examples/drawer-demo.tsx",
  },
  "email-input-demo": {
    component: lazy(() => import("./email-input-demo")),
    filePath: "examples/email-input-demo.tsx",
  },
  "embedded-terminal-demo": {
    component: lazy(() => import("./embedded-terminal-demo")),
    filePath: "examples/embedded-terminal-demo.tsx",
  },
  "error-boundary-demo": {
    component: lazy(() => import("./error-boundary-demo")),
    filePath: "examples/error-boundary-demo.tsx",
  },
  "file-change-demo": {
    component: lazy(() => import("./file-change-demo")),
    filePath: "examples/file-change-demo.tsx",
  },
  "file-picker-demo": {
    component: lazy(() => import("./file-picker-demo")),
    filePath: "examples/file-picker-demo.tsx",
  },
  "form-demo": {
    component: lazy(() => import("./form-demo")),
    filePath: "examples/form-demo.tsx",
  },
  "form-field-demo": {
    component: lazy(() => import("./form-field-demo")),
    filePath: "examples/form-field-demo.tsx",
  },
  "gauge-demo": {
    component: lazy(() => import("./gauge-demo")),
    filePath: "examples/gauge-demo.tsx",
  },
  "git-status-demo": {
    component: lazy(() => import("./git-status-demo")),
    filePath: "examples/git-status-demo.tsx",
  },
  "gradient-demo": {
    component: lazy(() => import("./gradient-demo")),
    filePath: "examples/gradient-demo.tsx",
  },
  "grid-demo": {
    component: lazy(() => import("./grid-demo")),
    filePath: "examples/grid-demo.tsx",
  },
  "heading-demo": {
    component: lazy(() => import("./heading-demo")),
    filePath: "examples/heading-demo.tsx",
  },
  "heat-map-demo": {
    component: lazy(() => import("./heat-map-demo")),
    filePath: "examples/heat-map-demo.tsx",
  },
  "help-demo": {
    component: lazy(() => import("./help-demo")),
    filePath: "examples/help-demo.tsx",
  },
  "help-screen-demo": {
    component: lazy(() => import("./help-screen-demo")),
    filePath: "examples/help-screen-demo.tsx",
  },
  "image-demo": {
    component: lazy(() => import("./image-demo")),
    filePath: "examples/image-demo.tsx",
  },
  "info-box-demo": {
    component: lazy(() => import("./info-box-demo")),
    filePath: "examples/info-box-demo.tsx",
  },
  "json-demo": {
    component: lazy(() => import("./json-demo")),
    filePath: "examples/json-demo.tsx",
  },
  "key-value-demo": {
    component: lazy(() => import("./key-value-demo")),
    filePath: "examples/key-value-demo.tsx",
  },
  "keyboard-shortcuts-demo": {
    component: lazy(() => import("./keyboard-shortcuts-demo")),
    filePath: "examples/keyboard-shortcuts-demo.tsx",
  },
  "line-chart-demo": {
    component: lazy(() => import("./line-chart-demo")),
    filePath: "examples/line-chart-demo.tsx",
  },
  "link-demo": {
    component: lazy(() => import("./link-demo")),
    filePath: "examples/link-demo.tsx",
  },
  "list-demo": {
    component: lazy(() => import("./list-demo")),
    filePath: "examples/list-demo.tsx",
  },
  "log-demo": {
    component: lazy(() => import("./log-demo")),
    filePath: "examples/log-demo.tsx",
  },
  "login-flow-demo": {
    component: lazy(() => import("./login-flow-demo")),
    filePath: "examples/login-flow-demo.tsx",
  },
  "markdown-demo": {
    component: lazy(() => import("./markdown-demo")),
    filePath: "examples/markdown-demo.tsx",
  },
  "masked-input-demo": {
    component: lazy(() => import("./masked-input-demo")),
    filePath: "examples/masked-input-demo.tsx",
  },
  "menu-demo": {
    component: lazy(() => import("./menu-demo")),
    filePath: "examples/menu-demo.tsx",
  },
  "modal-demo": {
    component: lazy(() => import("./modal-demo")),
    filePath: "examples/modal-demo.tsx",
  },
  "model-selector-demo": {
    component: lazy(() => import("./model-selector-demo")),
    filePath: "examples/model-selector-demo.tsx",
  },
  "multi-progress-compact": {
    component: lazy(() => import("./multi-progress-compact")),
    filePath: "examples/multi-progress-compact.tsx",
  },
  "multi-progress-demo": {
    component: lazy(() => import("./multi-progress-demo")),
    filePath: "examples/multi-progress-demo.tsx",
  },
  "multi-select-demo": {
    component: lazy(() => import("./multi-select-demo")),
    filePath: "examples/multi-select-demo.tsx",
  },
  "notification-center-demo": {
    component: lazy(() => import("./notification-center-demo")),
    filePath: "examples/notification-center-demo.tsx",
  },
  "number-input-demo": {
    component: lazy(() => import("./number-input-demo")),
    filePath: "examples/number-input-demo.tsx",
  },
  "pagination-demo": {
    component: lazy(() => import("./pagination-demo")),
    filePath: "examples/pagination-demo.tsx",
  },
  "panel-demo": {
    component: lazy(() => import("./panel-demo")),
    filePath: "examples/panel-demo.tsx",
  },
  "password-input-demo": {
    component: lazy(() => import("./password-input-demo")),
    filePath: "examples/password-input-demo.tsx",
  },
  "path-input-demo": {
    component: lazy(() => import("./path-input-demo")),
    filePath: "examples/path-input-demo.tsx",
  },
  "pie-chart-demo": {
    component: lazy(() => import("./pie-chart-demo")),
    filePath: "examples/pie-chart-demo.tsx",
  },
  "popover-demo": {
    component: lazy(() => import("./popover-demo")),
    filePath: "examples/popover-demo.tsx",
  },
  "progress-bar-custom": {
    component: lazy(() => import("./progress-bar-custom")),
    filePath: "examples/progress-bar-custom.tsx",
  },
  "progress-bar-demo": {
    component: lazy(() => import("./progress-bar-demo")),
    filePath: "examples/progress-bar-demo.tsx",
  },
  "progress-circle-demo": {
    component: lazy(() => import("./progress-circle-demo")),
    filePath: "examples/progress-circle-demo.tsx",
  },
  "progress-circle-sizes": {
    component: lazy(() => import("./progress-circle-sizes")),
    filePath: "examples/progress-circle-sizes.tsx",
  },
  "qr-code-demo": {
    component: lazy(() => import("./qr-code-demo")),
    filePath: "examples/qr-code-demo.tsx",
  },
  "radio-group-demo": {
    component: lazy(() => import("./radio-group-demo")),
    filePath: "examples/radio-group-demo.tsx",
  },
  "scroll-view-demo": {
    component: lazy(() => import("./scroll-view-demo")),
    filePath: "examples/scroll-view-demo.tsx",
  },
  "search-input-demo": {
    component: lazy(() => import("./search-input-demo")),
    filePath: "examples/search-input-demo.tsx",
  },
  "select-demo": {
    component: lazy(() => import("./select-demo")),
    filePath: "examples/select-demo.tsx",
  },
  "setup-flow-demo": {
    component: lazy(() => import("./setup-flow-demo")),
    filePath: "examples/setup-flow-demo.tsx",
  },
  "sidebar-demo": {
    component: lazy(() => import("./sidebar-demo")),
    filePath: "examples/sidebar-demo.tsx",
  },
  "skeleton-demo": {
    component: lazy(() => import("./skeleton-demo")),
    filePath: "examples/skeleton-demo.tsx",
  },
  "skeleton-static": {
    component: lazy(() => import("./skeleton-static")),
    filePath: "examples/skeleton-static.tsx",
  },
  "spacer-demo": {
    component: lazy(() => import("./spacer-demo")),
    filePath: "examples/spacer-demo.tsx",
  },
  "sparkline-demo": {
    component: lazy(() => import("./sparkline-demo")),
    filePath: "examples/sparkline-demo.tsx",
  },
  "spinner-demo": {
    component: lazy(() => import("./spinner-demo")),
    filePath: "examples/spinner-demo.tsx",
  },
  "spinner-label": {
    component: lazy(() => import("./spinner-label")),
    filePath: "examples/spinner-label.tsx",
  },
  "spinner-styles": {
    component: lazy(() => import("./spinner-styles")),
    filePath: "examples/spinner-styles.tsx",
  },
  "splash-screen-demo": {
    component: lazy(() => import("./splash-screen-demo")),
    filePath: "examples/splash-screen-demo.tsx",
  },
  "stack-demo": {
    component: lazy(() => import("./stack-demo")),
    filePath: "examples/stack-demo.tsx",
  },
  "status-message-demo": {
    component: lazy(() => import("./status-message-demo")),
    filePath: "examples/status-message-demo.tsx",
  },
  "status-message-variants": {
    component: lazy(() => import("./status-message-variants")),
    filePath: "examples/status-message-variants.tsx",
  },
  "stopwatch-demo": {
    component: lazy(() => import("./stopwatch-demo")),
    filePath: "examples/stopwatch-demo.tsx",
  },
  "streaming-text-demo": {
    component: lazy(() => import("./streaming-text-demo")),
    filePath: "examples/streaming-text-demo.tsx",
  },
  "tabbed-content-demo": {
    component: lazy(() => import("./tabbed-content-demo")),
    filePath: "examples/tabbed-content-demo.tsx",
  },
  "table-demo": {
    component: lazy(() => import("./table-demo")),
    filePath: "examples/table-demo.tsx",
  },
  "table-sortable": {
    component: lazy(() => import("./table-sortable")),
    filePath: "examples/table-sortable.tsx",
  },
  "tabs-demo": {
    component: lazy(() => import("./tabs-demo")),
    filePath: "examples/tabs-demo.tsx",
  },
  "tag-demo": {
    component: lazy(() => import("./tag-demo")),
    filePath: "examples/tag-demo.tsx",
  },
  "tag-input-demo": {
    component: lazy(() => import("./tag-input-demo")),
    filePath: "examples/tag-input-demo.tsx",
  },
  "text-area-demo": {
    component: lazy(() => import("./text-area-demo")),
    filePath: "examples/text-area-demo.tsx",
  },
  "text-input-demo": {
    component: lazy(() => import("./text-input-demo")),
    filePath: "examples/text-input-demo.tsx",
  },
  "text-input-label": {
    component: lazy(() => import("./text-input-label")),
    filePath: "examples/text-input-label.tsx",
  },
  "text-input-placeholder": {
    component: lazy(() => import("./text-input-placeholder")),
    filePath: "examples/text-input-placeholder.tsx",
  },
  "thinking-block-demo": {
    component: lazy(() => import("./thinking-block-demo")),
    filePath: "examples/thinking-block-demo.tsx",
  },
  "time-picker-demo": {
    component: lazy(() => import("./time-picker-demo")),
    filePath: "examples/time-picker-demo.tsx",
  },
  "timer-demo": {
    component: lazy(() => import("./timer-demo")),
    filePath: "examples/timer-demo.tsx",
  },
  "toast-demo": {
    component: lazy(() => import("./toast-demo")),
    filePath: "examples/toast-demo.tsx",
  },
  "toast-error": {
    component: lazy(() => import("./toast-error")),
    filePath: "examples/toast-error.tsx",
  },
  "toggle-demo": {
    component: lazy(() => import("./toggle-demo")),
    filePath: "examples/toggle-demo.tsx",
  },
  "token-usage-demo": {
    component: lazy(() => import("./token-usage-demo")),
    filePath: "examples/token-usage-demo.tsx",
  },
  "tool-approval-demo": {
    component: lazy(() => import("./tool-approval-demo")),
    filePath: "examples/tool-approval-demo.tsx",
  },
  "tool-call-demo": {
    component: lazy(() => import("./tool-call-demo")),
    filePath: "examples/tool-call-demo.tsx",
  },
  "tooltip-demo": {
    component: lazy(() => import("./tooltip-demo")),
    filePath: "examples/tooltip-demo.tsx",
  },
  "tree-demo": {
    component: lazy(() => import("./tree-demo")),
    filePath: "examples/tree-demo.tsx",
  },
  "tree-select-demo": {
    component: lazy(() => import("./tree-select-demo")),
    filePath: "examples/tree-select-demo.tsx",
  },
  "usage-monitor-demo": {
    component: lazy(() => import("./usage-monitor-demo")),
    filePath: "examples/usage-monitor-demo.tsx",
  },
  "virtual-list-demo": {
    component: lazy(() => import("./virtual-list-demo")),
    filePath: "examples/virtual-list-demo.tsx",
  },
  "welcome-screen-demo": {
    component: lazy(() => import("./welcome-screen-demo")),
    filePath: "examples/welcome-screen-demo.tsx",
  },
  "wizard-demo": {
    component: lazy(() => import("./wizard-demo")),
    filePath: "examples/wizard-demo.tsx",
  },
};
