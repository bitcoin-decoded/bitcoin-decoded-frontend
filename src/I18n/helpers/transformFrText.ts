import {
  cloneElement,
  createElement,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import { SKIPPED_INTRINSICS } from "../data";

import { fixFrenchPunctuation } from "./fixFrenchPunctuation";

/**
 * Recursively walks a React subtree and applies French-typography
 * normalization to every plain-string child. Elements whose tag is in
 * SKIPPED_INTRINSICS are returned as-is (URLs, code blocks, SVG).
 */
export const transformFrText = (node: ReactNode): ReactNode => {
  if (typeof node === "string") return fixFrenchPunctuation(node);

  if (Array.isArray(node)) return node.map(transformFrText);

  if (!isValidElement(node)) return node;

  const element = node as ReactElement<{ children?: ReactNode }>;
  const { type, props } = element;

  if (typeof type === "string" && SKIPPED_INTRINSICS.has(type)) return element;

  if (type === Fragment) {
    return createElement(
      Fragment,
      { key: element.key ?? undefined },
      transformFrText(props.children),
    );
  }

  if (props.children === undefined) return element;

  return cloneElement(element, undefined, transformFrText(props.children));
};
