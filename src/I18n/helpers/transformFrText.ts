import {
  Children,
  cloneElement,
  createElement,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import { fixFrenchPunctuation } from "../../FrenchPunctuation";
import { NON_TEXT_PROPS, SKIPPED_INTRINSICS } from "../data";

type UnknownProps = Record<string, unknown> & { children?: ReactNode };

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && Object.getPrototypeOf(value) === Object.prototype;

/**
 * Walks a prop value looking for copy to fix, returning it untouched when there
 * is none — so React never re-renders over a new-but-identical object.
 *
 * Copy does not only arrive as a scalar prop: a component is just as likely to
 * be handed an array of records (`terms`, `answers`, `characteristics`) or a
 * nested field (`questions: string[]`) holding the prose. Everything is
 * traversed; only the names in `NON_TEXT_PROPS` are left alone.
 */
const transformValue = (value: unknown): unknown => {
  if (typeof value === "string") return fixFrenchPunctuation(value);

  if (isValidElement(value)) return transformFrText(value as ReactNode);

  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((item) => {
      const out = transformValue(item);
      if (out !== item) changed = true;
      return out;
    });
    return changed ? next : value;
  }

  if (isPlainObject(value)) {
    let changed: Record<string, unknown> | null = null;
    for (const key of Object.keys(value)) {
      if (NON_TEXT_PROPS.has(key)) continue;
      const out = transformValue(value[key]);
      if (out !== value[key]) {
        changed ??= { ...value };
        changed[key] = out;
      }
    }
    return changed ?? value;
  }

  return value;
};

/** Rewrites an element's copy-carrying props; `null` when nothing changed. */
const transformTextProps = (props: UnknownProps): UnknownProps | null => {
  let changed: UnknownProps | null = null;

  for (const name of Object.keys(props)) {
    if (name === "children" || NON_TEXT_PROPS.has(name)) continue;

    const value = props[name];
    const next = transformValue(value);
    if (next !== value) {
      changed ??= { ...props };
      changed[name] = next;
    }
  }

  return changed;
};

export const transformFrText = (node: ReactNode): ReactNode => {
  if (typeof node === "string") return fixFrenchPunctuation(node);

  // `Children.map`, not `node.map`: it keys what it returns. A plain map hands
  // React a fresh array of elements with no keys, which is the "unique key
  // prop" warning that filled the console on every chapter, and that both the
  // SSR test and the prerender script had to silence to stay readable.
  if (Array.isArray(node)) return Children.map(node, transformFrText);

  if (!isValidElement(node)) return node;

  const element = node as ReactElement<UnknownProps>;
  const { type, props } = element;

  if (typeof type === "string" && SKIPPED_INTRINSICS.has(type)) return element;

  if (type === Fragment) {
    return createElement(
      Fragment,
      { key: element.key ?? undefined },
      transformFrText(props.children),
    );
  }

  const fixedProps = transformTextProps(props);

  // Copy may sit in props, in children, or in both — an Illustration has a
  // caption and no children, a Callout has both.
  if (props.children === undefined) {
    return fixedProps ? cloneElement(element, fixedProps) : element;
  }

  return cloneElement(element, fixedProps ?? undefined, transformFrText(props.children));
};
