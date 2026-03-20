import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { loadBoardYears, loadContactSettings } from "@/utils/content-loader";

type Member = {
  name: string;
  position: string;
  photo?: string;
};

type Board = {
  year: number;
  current?: boolean;
  members: Member[];
};

type DragState = {
  pointerId: number;
  cellIndex: number;
  axis: "x" | "y";
  sign: 1 | -1;
  max: number;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
  phase: "dragging" | "settling";
};

function getGridCols(width: number) {
  return width >= 768 ? 3 : 2;
}

function getMoveMeta(tileIndex: number, emptyIndex: number, cols: number): { axis: "x" | "y"; sign: 1 | -1 } | null {
  const tileRow = Math.floor(tileIndex / cols);
  const tileCol = tileIndex % cols;
  const emptyRow = Math.floor(emptyIndex / cols);
  const emptyCol = emptyIndex % cols;

  if (tileRow === emptyRow && Math.abs(tileCol - emptyCol) === 1) {
    return { axis: "x", sign: emptyCol > tileCol ? 1 : -1 };
  }

  if (tileCol === emptyCol && Math.abs(tileRow - emptyRow) === 1) {
    return { axis: "y", sign: emptyRow > tileRow ? 1 : -1 };
  }

  return null;
}

export default function BoardMembers() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [animPhase, setAnimPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const [animKey, setAnimKey] = useState(0);
  const [memberColors, setMemberColors] = useState<Record<string, string>>(/* name: gradient */{});
  const [puzzleOrders, setPuzzleOrders] = useState<Record<number, number[]>>({});
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [contactEmail, setContactEmail] = useState("psu.igsa@gmail.com");
  const [gridCols, setGridCols] = useState(() => {
    if (typeof window === "undefined") return 3;
    return getGridCols(window.innerWidth);
  });

  useEffect(() => {
    function onResize() {
      setGridCols(getGridCols(window.innerWidth));
    }

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const [loadedBoards, contactSettings] = await Promise.all([
          loadBoardYears(),
          loadContactSettings(),
        ]);
        const sorted: Board[] = [...loadedBoards].sort((a: Board, b: Board) => b.year - a.year);
        setBoards(sorted);
        if (contactSettings?.email) {
          setContactEmail(contactSettings.email);
        }
        const initialOrders: Record<number, number[]> = {};
        sorted.forEach((board) => {
          initialOrders[board.year] = [...board.members.map((_, memberIndex) => memberIndex), -1];
        });
        setPuzzleOrders(initialOrders);
        // Default to current board or latest
        const idx = sorted.findIndex((b) => b.current) !== -1 ? sorted.findIndex((b) => b.current) : 0;
        setActiveIdx(idx);
        // Extract background colors by sampling image corners
        function sampleCornerColor(
          ctx: CanvasRenderingContext2D,
          x: number,
          y: number,
          size: number
        ): [number, number, number] {
          let r = 0, g = 0, b = 0, count = 0;
          const data = ctx.getImageData(x, y, size, size).data;
          for (let i = 0; i < data.length; i += 4) {
            r += data[i]; g += data[i + 1]; b += data[i + 2]; count++;
          }
          return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
        }

        sorted.forEach(board => {
          board.members.forEach((m) => {
            if (m.photo) {
              const key = `${board.year}::${m.name}`;
              const img = new window.Image();
              img.crossOrigin = "anonymous";
              // Bypass any non-CORS cached copy by appending a query param
              img.src = m.photo + (m.photo.includes("?") ? "&" : "?") + "_cors=1";
              img.onload = () => {
                try {
                  const canvas = document.createElement("canvas");
                  const W = img.naturalWidth || img.width;
                  const H = img.naturalHeight || img.height;
                  canvas.width = W;
                  canvas.height = H;
                  const ctx = canvas.getContext("2d");
                  if (!ctx) return;
                  ctx.drawImage(img, 0, 0, W, H);

                  const patch = Math.max(4, Math.round(Math.min(W, H) * 0.08));
                  const tl = sampleCornerColor(ctx, 0, 0, patch);
                  const tr = sampleCornerColor(ctx, W - patch, 0, patch);
                  const bl = sampleCornerColor(ctx, 0, H - patch, patch);
                  const br = sampleCornerColor(ctx, W - patch, H - patch, patch);

                  // Average top corners → color1, bottom corners → color2
                  const c1: [number, number, number] = [
                    Math.round((tl[0] + tr[0]) / 2),
                    Math.round((tl[1] + tr[1]) / 2),
                    Math.round((tl[2] + tr[2]) / 2),
                  ];
                  const c2: [number, number, number] = [
                    Math.round((bl[0] + br[0]) / 2),
                    Math.round((bl[1] + br[1]) / 2),
                    Math.round((bl[2] + br[2]) / 2),
                  ];

                  const gradient = `radial-gradient(ellipse 90% 75% at 50% 25%, rgb(${c1.join(",")}), rgb(${c2.join(",")}))`;
                  setMemberColors(prev => ({ ...prev, [key]: gradient }));
                } catch (e) {
                  setMemberColors(prev => ({ ...prev, [key]: null }));
                }
              };
              img.onerror = () => {
                setMemberColors(prev => ({ ...prev, [key]: null }));
              };
            }
          });
        });
      } catch (e) {
        console.warn('Could not load board data', e);
      }
    }
    load();
  }, []);

  if (!boards.length) return null;

  const colors = [
    "from-igsa-saffron to-igsa-orange",
    "from-igsa-blue to-igsa-green",
    "from-igsa-green to-igsa-blue",
    "from-igsa-orange to-igsa-saffron",
    "from-igsa-saffron to-igsa-green",
    "from-igsa-blue to-igsa-orange"
  ];

  function handleYearClick(targetIdx: number) {
    if (targetIdx === activeIdx || animPhase !== 'idle') return;
    setDragState(null);
    setAnimPhase('out');
    setTimeout(() => {
      setActiveIdx(targetIdx);
      setAnimKey(k => k + 1);
      setAnimPhase('idle');
    }, 200);
  }

  const activeBoard = boards[activeIdx];
  const fallbackOrder = [...activeBoard.members.map((_, index) => index), -1];
  const order = puzzleOrders[activeBoard.year] || fallbackOrder;
  const emptyIndex = order.indexOf(-1);

  function moveTile(boardYear: number, tileCellIndex: number) {
    setPuzzleOrders((prev) => {
      const currentOrder = [...(prev[boardYear] || fallbackOrder)];
      const currentEmpty = currentOrder.indexOf(-1);
      const canMove = getMoveMeta(tileCellIndex, currentEmpty, gridCols);
      if (!canMove) return prev;

      [currentOrder[tileCellIndex], currentOrder[currentEmpty]] = [currentOrder[currentEmpty], currentOrder[tileCellIndex]];
      return { ...prev, [boardYear]: currentOrder };
    });
  }

  function handlePointerDown(
    event: React.PointerEvent<HTMLDivElement>,
    tileCellIndex: number,
    emptyCellIndex: number,
  ) {
    const moveMeta = getMoveMeta(tileCellIndex, emptyCellIndex, gridCols);
    if (!moveMeta) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const maxDistance = moveMeta.axis === "x" ? rect.width : rect.height;

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragState({
      pointerId: event.pointerId,
      cellIndex: tileCellIndex,
      axis: moveMeta.axis,
      sign: moveMeta.sign,
      max: maxDistance,
      startX: event.clientX,
      startY: event.clientY,
      dx: 0,
      dy: 0,
      phase: "dragging",
    });
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    setDragState((prev) => {
      if (!prev || prev.pointerId !== event.pointerId) return prev;
      if (prev.phase !== "dragging") return prev;

      const rawDeltaX = event.clientX - prev.startX;
      const rawDeltaY = event.clientY - prev.startY;
      const projected = prev.axis === "x" ? rawDeltaX * prev.sign : rawDeltaY * prev.sign;
      const clamped = Math.max(0, Math.min(prev.max, projected));

      return {
        ...prev,
        dx: prev.axis === "x" ? clamped * prev.sign : 0,
        dy: prev.axis === "y" ? clamped * prev.sign : 0,
      };
    });
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    setDragState((prev) => {
      if (!prev || prev.pointerId !== event.pointerId) return prev;

      const projected = prev.axis === "x"
        ? (event.clientX - prev.startX) * prev.sign
        : (event.clientY - prev.startY) * prev.sign;

      if (projected > prev.max * 0.35) {
        const settleDx = prev.axis === "x" ? prev.max * prev.sign : 0;
        const settleDy = prev.axis === "y" ? prev.max * prev.sign : 0;

        setTimeout(() => {
          moveTile(activeBoard.year, prev.cellIndex);
          setDragState((latest) => (latest?.pointerId === prev.pointerId ? null : latest));
        }, 140);

        return {
          ...prev,
          dx: settleDx,
          dy: settleDy,
          phase: "settling",
        };
      }

      return null;
    });
  }

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          key={animKey}
          className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-8 transition-opacity duration-200 ${animPhase === 'out' ? 'opacity-0' : 'opacity-100'}`}
        >
          {order.map((memberIndex, cellIndex) => {
            if (memberIndex === -1) {
              return (
                <div
                  key={`empty-${activeBoard.year}`}
                  className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/70 min-h-[220px] max-w-[320px] mx-auto"
                />
              );
            }

            const m = activeBoard.members[memberIndex];
            const gradient = memberColors[`${activeBoard.year}::${m.name}`];
            const moveMeta = getMoveMeta(cellIndex, emptyIndex, gridCols);
            const isMovable = !!moveMeta;
            const isDragging = dragState?.cellIndex === cellIndex;

            return (
              <div
                key={`${activeBoard.year}-${memberIndex}`}
                className={`relative group bg-white rounded-xl p-3 shadow-lg border transition-transform duration-200 overflow-hidden flex flex-col items-center justify-center min-h-[220px] max-w-[320px] mx-auto ${isMovable ? "cursor-default" : "cursor-not-allowed opacity-95"} ${isDragging ? "z-20" : ""}`}
                style={{
                  transform: isDragging ? `translate(${dragState.dx}px, ${dragState.dy}px)` : undefined,
                  transition: isDragging
                    ? (dragState.phase === "settling" ? "transform 140ms ease-out" : "none")
                    : undefined,
                }}
              >
                {/* Full-card glow radiating from behind the photo */}
                {gradient ? (
                  <div
                    className="absolute inset-0 z-0 opacity-25 transition-opacity duration-500 group-hover:opacity-40"
                    style={{ background: gradient }}
                  />
                ) : (
                  <div className={`absolute inset-0 z-0 opacity-20 bg-gradient-to-b ${colors[memberIndex % colors.length]}`} />
                )}
                <div className="relative z-10 flex flex-col items-center justify-center w-full">
                  <div
                    role="button"
                    aria-label={`Slide ${m.name} tile`}
                    className={`mb-2 rounded-2xl ${isMovable ? "cursor-grab active:cursor-grabbing touch-none" : "cursor-not-allowed"}`}
                    onPointerDown={(event) => handlePointerDown(event, cellIndex, emptyIndex)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onClick={() => {
                      if (!dragState && isMovable) {
                        moveTile(activeBoard.year, cellIndex);
                      }
                    }}
                  >
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        crossOrigin="anonymous"
                        draggable={false}
                        onDragStart={(event) => event.preventDefault()}
                        className="h-36 w-36 rounded-2xl object-cover border-4 border-white shadow-lg transition-transform duration-200 pointer-events-none select-none"
                      />
                    ) : (
                      <div className={`h-36 w-36 rounded-2xl bg-gradient-to-br ${colors[memberIndex % colors.length]} flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-white transition-transform duration-200 pointer-events-none select-none`}>
                        {m.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
                      </div>
                    )}
                  </div>
                  <div className="text-base font-semibold text-gray-900 text-center group-hover:text-igsa-blue transition-colors duration-200 mt-1">{m.name}</div>
                  <div className="text-xs text-gray-500 text-center group-hover:text-igsa-orange transition-colors duration-200">{m.position}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max justify-center">
            {boards.map((board, idx) => (
              <button
                key={board.year}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-igsa-blue whitespace-nowrap ${activeIdx === idx ? "bg-gradient-to-r from-igsa-saffron to-igsa-orange text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-igsa-blue hover:to-igsa-green hover:text-white"}`}
                onClick={() => handleYearClick(idx)}
              >
                {board.year} {board.current ? "(Current)" : ""}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 text-center text-xs text-gray-500">
          <span>Help us complete our history.</span>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label="More information about sharing previous board member details"
                className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-igsa-blue/20 bg-white text-igsa-blue shadow-sm transition-colors hover:border-igsa-blue hover:bg-igsa-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-igsa-blue/40"
              >
                <Info className="h-3.5 w-3.5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 border-igsa-blue/20 bg-white text-sm text-gray-700">
              <p>
                If you have information about previous board members, please share it with us at{" "}
                <a href={`mailto:${contactEmail}`} className="font-medium text-igsa-blue underline underline-offset-2 hover:text-igsa-orange">
                  {contactEmail}
                </a>
                .
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </section>
  );
}
