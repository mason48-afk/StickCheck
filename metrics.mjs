export function summarize(samples) {
  if (!samples.length) throw new Error('No samples');
  const n=samples.length, mx=samples.reduce((s,p)=>s+p[0],0)/n, my=samples.reduce((s,p)=>s+p[1],0)/n;
  const radii=samples.map(([x,y])=>Math.hypot(x,y)).sort((a,b)=>a-b);
  return {samples:n,meanX:mx,meanY:my,offset:Math.hypot(mx,my),meanRadius:radii.reduce((a,b)=>a+b,0)/n,p95:radii[Math.ceil(.95*n)-1],peak:radii[n-1],jitter:Math.sqrt(samples.reduce((s,[x,y])=>s+(x-mx)**2+(y-my)**2,0)/n)};
}
export function classify(metric,threshold){return metric.p95<=threshold?'Within reference':'Above reference';}
export function compatible(a,b){return a.device===b.device&&a.connection===b.connection&&a.environment===b.environment&&JSON.stringify(a.axes)===JSON.stringify(b.axes)&&a.duration===b.duration&&a.threshold===b.threshold;}
export function validReport(r){return r&&r.schema===1&&typeof r.device==='string'&&r.device.length<500&&typeof r.connection==='string'&&typeof r.environment==='string'&&r.environment.length<700&&Array.isArray(r.axes)&&r.axes.length===4&&r.axes.every(v=>Number.isInteger(v)&&v>=0&&v<64)&&new Set(r.axes).size===4&&Number.isFinite(r.threshold)&&r.threshold>=.01&&r.threshold<=.3&&r.duration===10&&typeof r.date==='string'&&!isNaN(Date.parse(r.date))&&['left','right'].every(k=>r[k]&&['offset','meanRadius','p95','peak','jitter'].every(m=>Number.isFinite(r[k][m])&&r[k][m]>=0&&r[k][m]<=3)&&Number.isInteger(r[k].samples)&&r[k].samples>=30)&&r.demo===false;}
