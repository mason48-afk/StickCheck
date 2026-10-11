const direction=['D-pad ↑','D-pad ↓','D-pad ←','D-pad →'];
export const layouts={
 xbox:['A','B','X','Y','LB','RB','LT','RT','View','Menu','LS click','RS click',...direction,'Xbox'],
 playstation:['Cross ✕','Circle ○','Square □','Triangle △','L1','R1','L2','R2','Create / Share','Options','L3','R3',...direction,'PS'],
 nintendo:['B','A','Y','X','L','R','ZL','ZR','− Minus','+ Plus','L stick','R stick',...direction,'Home'],
 other:[]
};
export function buttonLabel(family,index,standard=true){return standard?(layouts[family]?.[index]||`Button ${index}`):`Button ${index}`;}
