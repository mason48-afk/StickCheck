import assert from 'node:assert/strict';
import {summarize,classify,compatible,validReport} from './dist/metrics.mjs';
const center=summarize(Array.from({length:100},()=>[0,0]));assert.equal(center.p95,0);assert.equal(center.jitter,0);
const fixed=summarize(Array.from({length:100},()=>[.03,.04]));assert.ok(Math.abs(fixed.offset-.05)<1e-12);assert.ok(fixed.jitter<1e-12);assert.equal(classify(fixed,.1),'Within reference');assert.equal(classify(fixed,.01),'Above reference');
const spike=summarize([...Array.from({length:99},()=>[0,0]),[1,0]]);assert.equal(spike.p95,0);assert.equal(spike.peak,1);
const oscillation=summarize(Array.from({length:100},(_,i)=>[i%2?.1:-.1,0]));assert.equal(oscillation.offset,0);assert.ok(Math.abs(oscillation.jitter-.1)<1e-12);assert.equal(oscillation.p95,.1);
const r={schema:1,device:'Test',date:new Date().toISOString(),connection:'USB',environment:'Browser',axes:[0,1,2,3],duration:10,threshold:.1,demo:false,left:center,right:center};assert.ok(validReport(r));assert.ok(!validReport({...r,demo:true}));assert.ok(!validReport({...r,axes:[0,0,2,3]}));assert.ok(!validReport({...r,left:{...center,p95:NaN}}));assert.ok(compatible(r,{...r}));assert.ok(!compatible(r,{...r,connection:'Bluetooth'}));assert.ok(!compatible(r,{...r,environment:'Other'}));assert.throws(()=>summarize([]));
console.log('Passed: centered, fixed-offset, spike, oscillation, import validation, and comparison compatibility cases.');
