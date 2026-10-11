import {writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {OutboxMonitorError,sampleOutbox} from '../ops/outbox-monitor/health.mjs';

export function receiptIdentity(env) {
  if(!/^[1-9]\d*$/u.test(env.GITHUB_RUN_ID??'') || !/^[1-9]\d*$/u.test(env.GITHUB_RUN_ATTEMPT??'')
    || !Number.isSafeInteger(Number(env.GITHUB_RUN_ATTEMPT)) || !/^[a-f0-9]{40}$/u.test(env.GITHUB_SHA??''))throw new OutboxMonitorError('CONFIG_INVALID');
  return {runId:env.GITHUB_RUN_ID,runAttempt:Number(env.GITHUB_RUN_ATTEMPT),headSha:env.GITHUB_SHA};
}
export async function checkOutboxHealth(env,options={}) {
  const identity=receiptIdentity(env);
  const sample=await sampleOutbox(env,options);
  return {schemaVersion:1,...identity,checkedAt:sample.checkedAt};
}
if(import.meta.url===pathToFileURL(process.argv[1]??'').href){
  try{
    const receipt=await checkOutboxHealth(process.env);
    await writeFile('outbox-sample.json',JSON.stringify(receipt)+'\n',{flag:'wx'});
    console.log(JSON.stringify({ok:true,code:'HEALTHY',checkedAt:receipt.checkedAt}));
  }catch(error){
    console.error(JSON.stringify({ok:false,code:error instanceof OutboxMonitorError?error.code:'INTERNAL_CHECK_FAILED'}));process.exitCode=1;
  }
}
