import {readFile,stat} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {isoTime,validateSampleTime} from '../ops/outbox-monitor/health.mjs';
import {reportHeartbeat} from './report-stability-heartbeat.mjs';

export const MAX_WORKFLOW_SAMPLE_AGE_MS=20*60*1000;
function positiveId(value){return (typeof value==='number' && Number.isSafeInteger(value) && value>0) || (typeof value==='string' && /^[1-9]\d*$/u.test(value));}
export function outboxWorkflowDecision({event,latest,receipt,repository,nowMs=Date.now()}){
  const run=event?.workflow_run;
  const invalid=code=>({report:false,code});
  if(!run || !latest || !positiveId(run.id) || !positiveId(run.workflow_id) || !Number.isSafeInteger(run.run_attempt) || run.run_attempt<1
    || !/^[a-f0-9]{40}$/u.test(run.head_sha??'') || !repository || run.head_repository?.full_name!==repository
    || run.head_branch!=='main' || run.name!=='Inquiry outbox health' || run.path!=='.github/workflows/inquiry-health.yml'
    || run.status!=='completed' || latest.status!=='completed' || String(latest.id)!==String(run.id)
    || latest.run_attempt!==run.run_attempt || latest.workflow_id!==run.workflow_id || latest.head_sha!==run.head_sha
    || latest.head_branch!=='main' || latest.head_repository?.full_name!==repository || latest.path!==run.path
    || latest.name!==run.name || latest.conclusion!==run.conclusion)return invalid('RUN_IDENTITY_INVALID');
  const start=isoTime(run.run_started_at),end=isoTime(run.updated_at);
  if(!Number.isFinite(nowMs) || start===null || end===null || start>end || end>nowMs)return invalid('RUN_TIME_INVALID');
  if(!['success','failure','cancelled','timed_out','action_required','neutral','skipped','stale','startup_failure'].includes(run.conclusion))return invalid('RUN_IDENTITY_INVALID');
  if(run.conclusion!=='success')return {report:true,outcome:'failure',code:'WORKFLOW_FAILED'};
  if(!receipt || Object.keys(receipt).sort().join(',')!=='checkedAt,headSha,runAttempt,runId,schemaVersion'
    || receipt.schemaVersion!==1 || receipt.runId!==String(run.id) || receipt.runAttempt!==run.run_attempt || receipt.headSha!==run.head_sha)return invalid('RECEIPT_IDENTITY_INVALID');
  let sample;
  try{sample=validateSampleTime(receipt.checkedAt,nowMs,MAX_WORKFLOW_SAMPLE_AGE_MS);}
  catch{return invalid('SAMPLE_NOT_FRESH');}
  // GitHub records run times to seconds; permit only that serialization loss,
  // not clock skew or future endpoint dates. Reruns cannot reuse prior receipts.
  if(sample<start || sample>=end+1000)return invalid('SAMPLE_OUTSIDE_RUN');
  return {report:true,outcome:'success',code:'FRESH_SAMPLE'};
}
export async function reportOutboxHeartbeat({mode='',...input},request=fetch){
  if(mode==='cloudflare')return {ok:true,reported:false,code:'CLOUDFLARE_REPORTER'};
  if(!['','github'].includes(mode))throw new Error('REPORTER_MODE_INVALID');
  const decision=outboxWorkflowDecision(input);
  if(!decision.report)return {ok:false,reported:false,code:decision.code};
  await reportHeartbeat({url:input.url,outcome:decision.outcome},request);
  return {ok:true,reported:true,code:decision.code};
}
async function readJson(path,maximum){
  if((await stat(path)).size>maximum)throw new Error('INVALID_INPUT');
  return JSON.parse(await readFile(path,'utf8'));
}
if(import.meta.url===pathToFileURL(process.argv[1]??'').href){
  try{
    const mode=process.env.OUTBOX_HEARTBEAT_REPORTER??'';
    if(mode==='cloudflare')console.log(JSON.stringify({ok:true,reported:false,code:'CLOUDFLARE_REPORTER'}));
    else{
      const event=await readJson(process.env.GITHUB_EVENT_PATH,262144);
      const latest=await readJson('latest-outbox-run.json',65536);
      let receipt;try{receipt=await readJson('outbox-receipt/outbox-sample.json',2048);}catch{receipt=null;}
      const result=await reportOutboxHeartbeat({mode,event,latest,receipt,repository:process.env.GITHUB_REPOSITORY,url:process.env.STABILITY_HEARTBEAT_URL});
      console.log(JSON.stringify(result));if(!result.ok)process.exitCode=1;
    }
  }catch(error){console.error(JSON.stringify({ok:false,reported:false,code:['REPORTER_MODE_INVALID','heartbeat_delivery_failed','heartbeat_not_configured','invalid_heartbeat_destination'].includes(error.message)?error.message:'INVALID_INPUT'}));process.exitCode=1;}
}
