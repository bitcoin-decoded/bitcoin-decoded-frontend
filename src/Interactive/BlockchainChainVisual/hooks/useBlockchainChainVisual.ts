import { useCallback, useEffect, useRef, useState } from "react";

import { MAX_BLOCKS } from "../data";
import { buildInitialChain, buildNextSeed, computeBlock, recomputeBlock } from "../helpers";
import type { AddPhase, BlockData } from "../types";

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

type UseBlockchainChainVisual = {
  blocks: BlockData[];
  addPhase: AddPhase;
  canAddBlock: boolean;
  canEdit: boolean;
  editTx: (index: number, tx: string) => Promise<void>;
  addBlock: () => Promise<void>;
  reset: () => Promise<void>;
};

export const useBlockchainChainVisual = (onComplete?: () => void): UseBlockchainChainVisual => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [addPhase, setAddPhase] = useState<AddPhase>("idle");
  const blocksRef = useRef<BlockData[]>([]);

  useEffect(() => {
    blocksRef.current = blocks;
  }, [blocks]);

  useEffect(() => {
    buildInitialChain().then(setBlocks);
  }, []);

  // Fires once the reader has added a block (the action this block is built
  // around): the add cycle ends on the "done" phase. One-shot — resetting and
  // adding again never re-fires.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && addPhase === "done") {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [addPhase]);

  const editTx = useCallback(async (index: number, tx: string) => {
    const target = blocksRef.current[index];
    if (!target || target.tx === tx) return;
    const updated = await recomputeBlock(target, tx);
    setBlocks((latest) => latest.map((b, i) => (i === index ? updated : b)));
  }, []);

  const addBlock = useCallback(async () => {
    const current = blocksRef.current;
    if (current.length === 0 || current.length >= MAX_BLOCKS) return;
    const last = current[current.length - 1];

    setAddPhase("scrolling");
    await wait(750);

    setAddPhase("skeleton");
    const seed = buildNextSeed(last.number, current.length - 1);
    const block = await computeBlock(seed, last.headerHash);
    setBlocks((latest) => [...latest, block]);
    await wait(700);

    setAddPhase("revealing");
    await wait(1700);

    setAddPhase("done");
  }, []);

  const reset = useCallback(async () => {
    setAddPhase("idle");
    const chain = await buildInitialChain();
    setBlocks(chain);
  }, []);

  const canAddBlock = blocks.length < MAX_BLOCKS && (addPhase === "idle" || addPhase === "done");
  const canEdit = addPhase === "done";

  return { blocks, addPhase, canAddBlock, canEdit, editTx, addBlock, reset };
};
