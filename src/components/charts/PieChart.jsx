const toRad = deg => (deg - 90) * Math.PI / 180;

const PieChart = ({ data, size = 150, donut = false }) => {
  const pad = 70;
  const total = size + pad * 2;
  const cx = total / 2;
  const cy = total / 2;
  const outerR = size / 2;
  const innerR = donut ? outerR * 0.52 : 0;
  const dataTotal = data.reduce((s, d) => s + d.value, 0);

  const slices = data.reduce((acc, d) => {
    const start = acc.length > 0 ? acc[acc.length - 1].start + acc[acc.length - 1].sweep : 0;
    const sweep = (d.value / dataTotal) * 360;
    return [...acc, { ...d, start, sweep }];
  }, []);

  const arcPath = s => {
    const a1 = toRad(s.start);
    const a2 = toRad(s.start + s.sweep);
    const x1o = cx + outerR * Math.cos(a1), y1o = cy + outerR * Math.sin(a1);
    const x2o = cx + outerR * Math.cos(a2), y2o = cy + outerR * Math.sin(a2);
    const large = s.sweep > 180 ? 1 : 0;
    if (innerR > 0) {
      const x1i = cx + innerR * Math.cos(a2), y1i = cy + innerR * Math.sin(a2);
      const x2i = cx + innerR * Math.cos(a1), y2i = cy + innerR * Math.sin(a1);
      return `M${x1o},${y1o} A${outerR},${outerR} 0 ${large} 1 ${x2o},${y2o} L${x1i},${y1i} A${innerR},${innerR} 0 ${large} 0 ${x2i},${y2i} Z`;
    }
    return `M${cx},${cy} L${x1o},${y1o} A${outerR},${outerR} 0 ${large} 1 ${x2o},${y2o} Z`;
  };

  const labelLine = s => {
    const mid = toRad(s.start + s.sweep / 2);
    const r1 = outerR + 8;
    const r2 = outerR + 28;
    const x1 = cx + r1 * Math.cos(mid), y1 = cy + r1 * Math.sin(mid);
    const x2 = cx + r2 * Math.cos(mid), y2 = cy + r2 * Math.sin(mid);
    const isRight = Math.cos(mid) > 0;
    const x3 = x2 + (isRight ? 12 : -12);
    return { x1, y1, x2, y2, x3, y3: y2, isRight, lx: x3, ly: y2 };
  };

  return (
    <svg
      width={total}
      height={total}
      viewBox={`0 0 ${total} ${total}`}
      style={{ flexShrink: 0, overflow: "visible" }}
    >
      {slices.map((s, i) => (
        <g key={i}>
          <path d={arcPath(s)} fill={s.color} />
          {s.sweep > 10 && (() => {
            const { x1, y1, x2, y2, x3, y3, isRight, lx, ly } = labelLine(s);
            return (
              <g>
                <polyline
                  points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={1}
                />
                <text
                  x={lx + (isRight ? 4 : -4)}
                  y={ly}
                  textAnchor={isRight ? "start" : "end"}
                  dominantBaseline="middle"
                  fontSize={10}
                  fontWeight={600}
                  fontFamily="Inter, sans-serif"
                  fill={s.color}
                >
                  {s.label} {s.value}%
                </text>
              </g>
            );
          })()}
        </g>
      ))}
    </svg>
  );
};

export default PieChart;
