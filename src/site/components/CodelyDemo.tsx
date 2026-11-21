import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Check,
  ChevronDown,
  ChevronUp,
  CornerUpLeft,
  CornerUpRight,
  Lightbulb,
  Pause,
  Play,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { challenges } from "./codely/challenges";
import {
  MAX_INSTRUCTIONS,
  cellAhead,
  explainOutcome,
  manhattanToTarget,
  runProgram,
  sameCell,
  shortestSolution,
  type Cell,
  type Challenge,
  type Command,
  type Feedback,
} from "./codely/engine";
import Confetti from "./codely/Confetti";
import { BlockSprite, RobotSprite, SparkleSprite, StarSprite } from "./codely/sprites";

type Phase = "idle" | "running" | "paused" | "success" | "failed";
type StepMark = "done" | "error";

interface ProgramItem {
  id: number;
  command: Command;
}

interface RobotView {
  row: number;
  col: number;
  /** Cumulative degrees, so a left turn always rotates left on screen (never the long way). */
  rotation: number;
}

interface Celebration {
  id: number;
  instructions: number;
  stepsRun: number;
  moves: number;
  unused: number;
  best: number;
}

const COMMANDS: Record<
  Command,
  { label: string; Icon: typeof ArrowUp; button: string; chip: string; iconBg: string }
> = {
  forward: {
    label: "Move Forward",
    Icon: ArrowUp,
    button:
      "border-[#E8401C]/25 bg-[#FFF1EC] text-[#B42E12] hover:border-[#E8401C] hover:bg-[#FFE4DA]",
    chip: "border-[#E8401C]/25 bg-[#FFF1EC]",
    iconBg: "bg-[#E8401C] text-white",
  },
  left: {
    label: "Turn Left",
    Icon: CornerUpLeft,
    button: "border-sky-200 bg-sky-50 text-sky-800 hover:border-sky-400 hover:bg-sky-100",
    chip: "border-sky-200 bg-sky-50",
    iconBg: "bg-sky-500 text-white",
  },
  right: {
    label: "Turn Right",
    Icon: CornerUpRight,
    button:
      "border-violet-200 bg-violet-50 text-violet-800 hover:border-violet-400 hover:bg-violet-100",
    chip: "border-violet-200 bg-violet-50",
    iconBg: "bg-violet-500 text-white",
  },
};

const BUMP_OFFSET: Record<number, { x: string; y: string }> = {
  0: { x: "0px", y: "-10px" },
  1: { x: "10px", y: "0px" },
  2: { x: "0px", y: "10px" },
  3: { x: "-10px", y: "0px" },
};

const READY_MESSAGE = "Press Run Program to see what your code does.";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function startView(challenge: Challenge): RobotView {
  return { row: challenge.start.row, col: challenge.start.col, rotation: challenge.start.dir * 90 };
}

export default function CodelyDemo() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const challenge = challenges[challengeIndex]!;
  const nextId = useRef(0);
  const toItems = (commands: readonly Command[]) =>
    commands.map((command) => ({ id: nextId.current++, command }));

  const [program, setProgram] = useState<ProgramItem[]>(() => toItems(challenge.starter));
  const [robot, setRobot] = useState<RobotView>(() => startView(challenge));
  const [phase, setPhase] = useState<Phase>("idle");
  const [status, setStatus] = useState(READY_MESSAGE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [marks, setMarks] = useState<Record<number, StepMark>>({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [bump, setBump] = useState<{ id: number; dir: number } | null>(null);
  const [blocked, setBlocked] = useState<{ id: number; cell: Cell | null } | null>(null);
  const [celebration, setCelebration] = useState<Celebration | null>(null);
  const [confettiId, setConfettiId] = useState<number | null>(null);

  // Execution control lives in refs so the async runner always sees current values.
  const runningRef = useRef(false);
  const runIdRef = useRef(0);
  const pausedRef = useRef(false);
  const timersRef = useRef(new Set<number>());
  const boardRef = useRef<HTMLDivElement>(null);
  const playAgainRef = useRef<HTMLButtonElement>(null);

  const clearTimers = useCallback(() => {
    for (const timer of timersRef.current) window.clearTimeout(timer);
    timersRef.current.clear();
  }, []);

  const later = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      const timer = window.setTimeout(() => {
        timersRef.current.delete(timer);
        resolve();
      }, ms);
      timersRef.current.add(timer);
    });
  }, []);

  /** Wait, honour pause, and report whether this run is still the current one. */
  const pace = useCallback(
    async (runId: number, ms: number) => {
      await later(ms);
      while (pausedRef.current && runIdRef.current === runId) await later(120);
      return runIdRef.current === runId;
    },
    [later],
  );

  useEffect(
    () => () => {
      runIdRef.current += 1; // stop any run still in progress
      clearTimers();
    },
    [clearTimers],
  );

  useEffect(() => {
    if (celebration) playAgainRef.current?.focus();
  }, [celebration]);

  /** Stop any run and put the robot back at the start of `target`. */
  const resetBoard = useCallback(
    (target: Challenge, message = READY_MESSAGE) => {
      runIdRef.current += 1;
      runningRef.current = false;
      pausedRef.current = false;
      clearTimers();
      setRobot(startView(target));
      setPhase("idle");
      setStatus(message);
      setActiveIndex(null);
      setMarks({});
      setFeedback(null);
      setBump(null);
      setBlocked(null);
      setCelebration(null);
      setConfettiId(null);
    },
    [clearTimers],
  );

  const busy = phase === "running" || phase === "paused";

  const editProgram = (update: (items: ProgramItem[]) => ProgramItem[]) => {
    if (runningRef.current) return;
    setProgram(update);
    resetBoard(challenge, "Program changed. Run it to see what happens!");
  };

  const addCommand = (command: Command) =>
    editProgram((items) =>
      items.length >= MAX_INSTRUCTIONS ? items : [...items, { id: nextId.current++, command }],
    );
  const removeCommand = (index: number) =>
    editProgram((items) => items.filter((_, itemIndex) => itemIndex !== index));
  const moveCommand = (index: number, offset: -1 | 1) =>
    editProgram((items) => {
      const target = index + offset;
      if (target < 0 || target >= items.length) return items;
      const next = [...items];
      [next[index], next[target]] = [next[target]!, next[index]!];
      return next;
    });
  const clearProgram = () => editProgram(() => []);

  const openChallenge = (index: number) => {
    const next = challenges[index]!;
    setChallengeIndex(index);
    setProgram(toItems(next.starter));
    resetBoard(next);
  };

  const run = async () => {
    if (runningRef.current) return; // one program at a time, even on fast double clicks
    const commands = program.map((item) => item.command);
    const result = runProgram(challenge, commands);
    if (result.outcome.kind === "empty") {
      resetBoard(challenge);
      setPhase("failed");
      setStatus("Add some instructions first!");
      setFeedback(explainOutcome(challenge, commands, result));
      return;
    }

    resetBoard(challenge, "Getting ready…");
    const runId = runIdRef.current;
    runningRef.current = true;
    setPhase("running");

    const board = boardRef.current?.getBoundingClientRect();
    if (board && (board.top < 0 || board.bottom > window.innerHeight)) {
      boardRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "center",
      });
    }

    const quick = prefersReducedMotion();
    const timing = quick
      ? { ready: 250, move: 300, turn: 300, blocked: 400 }
      : { ready: 600, move: 650, turn: 550, blocked: 800 };
    if (!(await pace(runId, timing.ready))) return;

    let rotation = challenge.start.dir * 90;
    for (const frame of result.frames) {
      setActiveIndex(frame.index);
      const { event } = frame;
      if (event.kind === "turn") {
        rotation += event.side === "right" ? 90 : -90;
        setRobot({ row: frame.after.row, col: frame.after.col, rotation });
        setStatus(event.side === "right" ? "Turning right…" : "Turning left…");
      } else if (event.kind === "move") {
        setRobot({ row: frame.after.row, col: frame.after.col, rotation });
        const remaining = manhattanToTarget(challenge, frame.after);
        setStatus(remaining === 1 ? "Moving forward… almost there!" : "Moving forward…");
      } else {
        const id = runId * 100 + frame.index;
        setBump({ id, dir: frame.before.dir });
        setBlocked({ id, cell: event.reason === "obstacle" ? cellAhead(frame.before) : null });
        setStatus(event.reason === "obstacle" ? "Obstacle ahead!" : "Wall ahead!");
      }
      const wait =
        event.kind === "blocked"
          ? timing.blocked
          : event.kind === "turn"
            ? timing.turn
            : timing.move;
      if (!(await pace(runId, wait))) return;
      setMarks((current) => ({
        ...current,
        [frame.index]: event.kind === "blocked" ? "error" : "done",
      }));
    }

    runningRef.current = false;
    setActiveIndex(null);
    const { outcome } = result;
    if (outcome.kind === "success") {
      setPhase("success");
      setStatus("You did it! The robot reached the star!");
      if (!quick) setConfettiId(runId);
      if (!(await pace(runId, quick ? 200 : 900))) return;
      setCelebration({
        id: runId,
        instructions: commands.length,
        stepsRun: outcome.stepsRun,
        moves: outcome.moves,
        unused: outcome.unused,
        best: shortestSolution(challenge)?.length ?? commands.length,
      });
      if (!(await pace(runId, 2600))) return;
      setConfettiId(null);
    } else {
      setPhase("failed");
      setStatus("Not quite! Let's fix the program.");
      setFeedback(explainOutcome(challenge, commands, result));
    }
  };

  const togglePause = () => {
    if (!runningRef.current) return;
    pausedRef.current = !pausedRef.current;
    setPhase(pausedRef.current ? "paused" : "running");
  };

  const cellSize = 100 / challenge.size;
  const bumpOffset = bump ? BUMP_OFFSET[bump.dir]! : null;
  const hasNextChallenge = challenges.length > 1;

  return (
    <section
      className="pt-12 pb-10 sm:pt-20 sm:pb-12 bg-[#FFF5F2]"
      aria-labelledby="codely-heading"
    >
      {confettiId !== null && <Confetti burstId={confettiId} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-8 lg:gap-x-14 lg:gap-y-8">
          {/* Intro */}
          <div className="order-1">
            <div className="section-label mb-3">TRY CODELY</div>
            <h2 id="codely-heading" className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
              Code it. Run it. <span className="text-[#E8401C]">Fix it.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-lg">
              Build a program from simple instructions, run it, and watch the robot follow your
              code. If it goes wrong, change the instructions and try again. That&apos;s real
              programming!
            </p>
          </div>

          {/* Playground */}
          <div className="order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div
              className={`rounded-3xl border bg-white shadow-sm transition-shadow ${
                phase === "success"
                  ? "border-amber-300 shadow-[0_0_0_4px_rgba(251,191,36,0.25)]"
                  : "border-red-100"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#E8401C]">
                    Challenge {challengeIndex + 1} of {challenges.length}: {challenge.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{challenge.goal}</p>
                </div>
                <div className="flex gap-1.5" role="group" aria-label="Choose a challenge">
                  {challenges.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openChallenge(index)}
                      disabled={busy}
                      aria-pressed={index === challengeIndex}
                      aria-label={`Challenge ${index + 1}: ${item.title}`}
                      className={`h-8 w-8 rounded-full text-xs font-bold transition-colors disabled:opacity-40 max-lg:h-11 max-lg:w-11 ${
                        index === challengeIndex
                          ? "bg-[#E8401C] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div ref={boardRef} className="relative mx-auto w-full max-w-[22rem]">
                  <div
                    key={blocked && !blocked.cell ? blocked.id : "board"}
                    className={`relative aspect-square rounded-2xl bg-[#FFF5F2] p-1.5 ${
                      blocked && !blocked.cell ? "codely-blocked-flash" : ""
                    }`}
                  >
                    <div
                      className="relative grid h-full w-full"
                      style={{
                        gridTemplateColumns: `repeat(${challenge.size}, minmax(0, 1fr))`,
                        gridTemplateRows: `repeat(${challenge.size}, minmax(0, 1fr))`,
                      }}
                      role="img"
                      aria-label={`Playground, ${challenge.size} by ${challenge.size} squares. Robot at row ${robot.row + 1}, column ${robot.col + 1}. Star at row ${challenge.target.row + 1}, column ${challenge.target.col + 1}. ${challenge.obstacles.length} blocks.`}
                    >
                      {Array.from({ length: challenge.size * challenge.size }, (_, cellIndex) => {
                        const cell = {
                          row: Math.floor(cellIndex / challenge.size),
                          col: cellIndex % challenge.size,
                        };
                        const obstacleIndex = challenge.obstacles.findIndex((obstacle) =>
                          sameCell(obstacle, cell),
                        );
                        const isTarget = sameCell(cell, challenge.target);
                        const isBlockedCell = Boolean(
                          blocked?.cell && sameCell(blocked.cell, cell),
                        );
                        return (
                          <div key={cellIndex} className="p-1">
                            <div
                              key={isBlockedCell ? blocked!.id : "cell"}
                              className={`relative flex h-full w-full items-center justify-center rounded-xl border ${
                                isTarget
                                  ? "border-amber-200 bg-amber-50"
                                  : "border-red-100/80 bg-white"
                              } ${isBlockedCell ? "codely-blocked-flash" : ""}`}
                            >
                              {obstacleIndex >= 0 && (
                                <BlockSprite variant={obstacleIndex} className="h-[78%] w-[78%]" />
                              )}
                              {isTarget && (
                                <>
                                  <StarSprite className="codely-star-glow h-[70%] w-[70%]" />
                                  {phase === "success" &&
                                    Array.from({ length: 8 }, (_, sparkle) => (
                                      <span
                                        key={sparkle}
                                        className="codely-sparkle absolute left-1/2 top-1/2 h-3 w-3"
                                        style={
                                          {
                                            "--codely-angle": `${sparkle * 45}deg`,
                                            "--codely-distance": "42px",
                                          } as React.CSSProperties
                                        }
                                      >
                                        <SparkleSprite className="h-full w-full" />
                                      </span>
                                    ))}
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {/* Robot layer: slides between cells and rotates to face its direction. */}
                      <div
                        data-testid="codely-robot"
                        data-row={robot.row}
                        data-col={robot.col}
                        data-rotation={robot.rotation}
                        className="codely-motion pointer-events-none absolute p-1 transition-[left,top] duration-500 ease-in-out"
                        style={{
                          left: `${robot.col * cellSize}%`,
                          top: `${robot.row * cellSize}%`,
                          width: `${cellSize}%`,
                          height: `${cellSize}%`,
                        }}
                      >
                        <div
                          key={bump?.id ?? "still"}
                          className={`flex h-full w-full items-center justify-center ${bump ? "codely-bump" : ""}`}
                          style={
                            bumpOffset
                              ? ({
                                  "--codely-bump-x": bumpOffset.x,
                                  "--codely-bump-y": bumpOffset.y,
                                } as React.CSSProperties)
                              : undefined
                          }
                        >
                          <div
                            className={`h-[82%] w-[82%] ${phase === "success" ? "codely-cheer" : ""}`}
                          >
                            <div
                              className="codely-motion h-full w-full transition-transform duration-500 ease-in-out"
                              style={{ transform: `rotate(${robot.rotation}deg)` }}
                            >
                              <RobotSprite className="h-full w-full drop-shadow" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Success celebration */}
                  {celebration && (
                    <div
                      className="codely-pop-in absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/90 p-4 backdrop-blur-sm"
                      role="dialog"
                      aria-labelledby="codely-success-title"
                      onKeyDown={(event) => {
                        if (event.key === "Escape") setCelebration(null);
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setCelebration(null)}
                        className="absolute right-3 top-3 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Close and look at the playground"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <div className="w-full max-w-xs text-center">
                        <StarSprite className="codely-star-glow mx-auto mb-2 h-12 w-12" />
                        <h3
                          id="codely-success-title"
                          className="text-2xl font-black tracking-tight text-[#E8401C]"
                        >
                          AMAZING! YOU DID IT!
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-gray-700">
                          You successfully programmed the robot!
                        </p>
                        <dl className="mt-4 grid grid-cols-3 gap-2">
                          {(
                            [
                              ["Instructions", celebration.instructions],
                              ["Steps run", celebration.stepsRun],
                              ["Squares moved", celebration.moves],
                            ] as const
                          ).map(([label, value]) => (
                            <div key={label} className="rounded-xl bg-[#FFF5F2] px-2 py-2">
                              <dt className="text-[11px] lg:text-[10px] font-bold uppercase tracking-wide text-gray-500">
                                {label}
                              </dt>
                              <dd className="text-xl font-black text-gray-900">{value}</dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-3 text-xs text-gray-600">
                          {celebration.stepsRun <= celebration.best
                            ? "That's the shortest possible program. Brilliant!"
                            : `Bonus challenge: can you do it in just ${celebration.best} instructions?`}
                          {celebration.unused > 0 &&
                            ` The robot reached the star early, so ${celebration.unused} instruction${
                              celebration.unused === 1 ? " wasn't" : "s weren't"
                            } needed.`}
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          <button
                            ref={playAgainRef}
                            type="button"
                            onClick={() => openChallenge(challengeIndex)}
                            className="rounded-full bg-[#E8401C] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#C73516] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8401C] focus-visible:ring-offset-2"
                          >
                            Play Again
                          </button>
                          {hasNextChallenge && (
                            <button
                              type="button"
                              onClick={() =>
                                openChallenge((challengeIndex + 1) % challenges.length)
                              }
                              className="rounded-full border-2 border-[#E8401C] px-5 py-2 text-sm font-bold text-[#E8401C] hover:bg-[#FFF1EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8401C] focus-visible:ring-offset-2"
                            >
                              {challengeIndex + 1 < challenges.length
                                ? "Try Another Challenge"
                                : "Back to Challenge 1"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Legend */}
                <ul className="mx-auto mt-4 flex max-w-[22rem] flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-gray-600">
                  <li className="flex items-center gap-1.5">
                    <RobotSprite className="h-6 w-6" /> Robot = you
                  </li>
                  <li className="flex items-center gap-1.5">
                    <StarSprite className="h-6 w-6" /> Star = goal
                  </li>
                  <li className="flex items-center gap-1.5">
                    <BlockSprite className="h-6 w-6" /> Block = can&apos;t pass
                  </li>
                </ul>

                {/* Status and learning feedback */}
                <div className="mt-4 rounded-2xl bg-gray-950 px-4 py-3.5">
                  <p
                    className={`text-sm font-semibold ${
                      phase === "success"
                        ? "text-green-400"
                        : phase === "failed"
                          ? "text-orange-300"
                          : "text-gray-200"
                    }`}
                    aria-live="polite"
                  >
                    {phase === "paused" ? "Paused. Press Resume to continue." : status}
                  </p>
                  {busy && activeIndex !== null && program[activeIndex] && (
                    <p className="mt-1 text-xs font-bold text-[#FF8A6B]">
                      Step {activeIndex + 1} of {program.length}:{" "}
                      {COMMANDS[program[activeIndex]!.command].label}
                    </p>
                  )}
                </div>
                {feedback && (
                  <div
                    className="codely-pop-in mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5"
                    role="status"
                  >
                    <p className="text-sm font-black text-gray-900">{feedback.title}</p>
                    <p className="mt-1 text-sm text-gray-700">{feedback.message}</p>
                    <p className="mt-2 flex items-start gap-2 text-sm font-semibold text-amber-800">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {feedback.hint}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Instruction builder */}
          <div className="order-3 lg:col-start-1 lg:row-start-2">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
              1. Add instructions
            </p>
            {/* One row of three on every screen; on phones the labels are smaller and may wrap. */}
            <div className="mb-6 grid grid-cols-3 gap-2">
              {(Object.keys(COMMANDS) as Command[]).map((command) => {
                const { label, Icon, button, iconBg } = COMMANDS[command];
                return (
                  <button
                    key={command}
                    type="button"
                    onClick={() => addCommand(command)}
                    disabled={busy || program.length >= MAX_INSTRUCTIONS}
                    className={`flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-xl border-2 px-1.5 py-2.5 text-center text-xs leading-tight font-bold transition-all sm:whitespace-nowrap sm:px-3 sm:py-3 sm:text-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8401C] focus-visible:ring-offset-2 ${button}`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                2. Your program{" "}
                <span className="font-semibold normal-case tracking-normal text-gray-400">
                  ({program.length}/{MAX_INSTRUCTIONS})
                </span>
              </p>
              <button
                type="button"
                onClick={clearProgram}
                disabled={busy || program.length === 0}
                className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold text-gray-500 hover:bg-white hover:text-gray-900 disabled:opacity-40 max-lg:min-h-11 max-lg:px-3"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Clear all
              </button>
            </div>

            <ol className="mb-5 space-y-2" aria-label="Your program">
              {program.length === 0 ? (
                <li className="rounded-xl border-2 border-dashed border-red-200 px-4 py-4 text-center text-sm text-gray-500">
                  Your program is empty. Add an instruction above to begin.
                </li>
              ) : (
                program.map((item, index) => {
                  const { label, Icon, chip, iconBg } = COMMANDS[item.command];
                  const isActive = activeIndex === index;
                  const mark = marks[index];
                  return (
                    <li
                      key={item.id}
                      className={`flex items-center gap-2 rounded-xl border-2 px-2.5 py-2 transition-all ${chip} ${
                        isActive
                          ? "scale-[1.02] border-[#E8401C] shadow-md ring-2 ring-[#E8401C]/20"
                          : ""
                      } ${mark === "error" ? "border-red-500 bg-red-50" : ""} ${
                        busy && !isActive && mark !== "done" ? "opacity-70" : ""
                      }`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                          mark === "done"
                            ? "bg-green-500 text-white"
                            : mark === "error"
                              ? "bg-red-500 text-white"
                              : "bg-white text-gray-500"
                        }`}
                      >
                        {mark === "done" ? (
                          <Check className="h-3.5 w-3.5" aria-label="done" />
                        ) : (
                          index + 1
                        )}
                      </span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="flex-1 text-sm font-bold text-gray-800">{label}</span>
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => moveCommand(index, -1)}
                          disabled={busy || index === 0}
                          aria-label={`Move instruction ${index + 1} (${label}) up`}
                          className="rounded-lg p-1.5 text-gray-500 hover:bg-white hover:text-gray-900 disabled:opacity-25 max-lg:flex max-lg:h-11 max-lg:w-11 max-lg:items-center max-lg:justify-center"
                        >
                          <ChevronUp className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveCommand(index, 1)}
                          disabled={busy || index === program.length - 1}
                          aria-label={`Move instruction ${index + 1} (${label}) down`}
                          className="rounded-lg p-1.5 text-gray-500 hover:bg-white hover:text-gray-900 disabled:opacity-25 max-lg:flex max-lg:h-11 max-lg:w-11 max-lg:items-center max-lg:justify-center"
                        >
                          <ChevronDown className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeCommand(index)}
                          disabled={busy}
                          aria-label={`Delete instruction ${index + 1} (${label})`}
                          className="rounded-lg p-1.5 text-gray-500 hover:bg-red-100 hover:text-red-600 disabled:opacity-25 max-lg:flex max-lg:h-11 max-lg:w-11 max-lg:items-center max-lg:justify-center"
                        >
                          <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ol>

            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">
              3. Run it
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={run}
                disabled={busy}
                className="flex items-center gap-2 rounded-full bg-[#E8401C] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#C73516] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8401C] focus-visible:ring-offset-2"
              >
                <Play className="h-4 w-4" aria-hidden="true" />
                {phase === "success" || phase === "failed" ? "Run Again" : "Run Program"}
              </button>
              {busy && (
                <button
                  type="button"
                  onClick={togglePause}
                  className="flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-800 hover:border-gray-500"
                >
                  {phase === "paused" ? (
                    <Play className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Pause className="h-4 w-4" aria-hidden="true" />
                  )}
                  {phase === "paused" ? "Resume" : "Pause"}
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  resetBoard(
                    challenge,
                    busy ? "Stopped. The robot is back at the start." : READY_MESSAGE,
                  )
                }
                className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-gray-500 hover:bg-white hover:text-gray-900 max-lg:min-h-11"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {busy ? "Stop" : "Reset"}
              </button>
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-gray-400">
              Think <span className="text-[#E8401C]">→</span> Code{" "}
              <span className="text-[#E8401C]">→</span> Run{" "}
              <span className="text-[#E8401C]">→</span> Fix
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
