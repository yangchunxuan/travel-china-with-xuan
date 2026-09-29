import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import test from 'node:test';
import { parseContactReport } from '../functions/_shared/admin-contact-contracts.ts';

test('isolated SQL rollout preserves legacy v3 aggregates and adds exact opt-in Kakao v4 aggregates',t=>{
 // Disposable socket-only PostgreSQL. No project credentials or existing databases.
 const directory=mkdtempSync('/tmp/homeground-contact-compat-');
 const database=join(directory,'data');
 let started=false;
 let initCommand='initdb',controlCommand='pg_ctl';
 const run=(command,args,options={})=>execFileSync(command,args,{encoding:'utf8',stdio:['pipe','pipe','pipe'],maxBuffer:2*1024*1024,...options});
 t.after(()=>{if(started)run(controlCommand,['-D',database,'-m','immediate','-w','stop']);rmSync(directory,{recursive:true,force:true});});
 // Reuse the existing isolated SQL tests' workaround for relocated Homebrew
 // runtimes, modifying only this disposable directory, never the installation.
 const executable=(process.env.PATH??'').split(':').map(path=>join(path,'initdb')).find(existsSync);
 const installRoot=executable?dirname(dirname(realpathSync(executable))):null;
 const relocatedShare=installRoot&&join(installRoot,'share','postgresql');
 const relocatedLibrary=installRoot&&join(installRoot,'lib','postgresql');
 if(relocatedShare&&existsSync(join(relocatedShare,'postgres.bki'))){
  const compiledShare=run('pg_config',['--sharedir']).trim();
  const compiledLibrary=run('pg_config',['--pkglibdir']).trim();
  if(!existsSync(join(compiledShare,'postgres.bki'))){
   const compiledBin=run('pg_config',['--bindir']).trim();
   let commonRoot=dirname(compiledBin);
   while(!compiledShare.startsWith(`${commonRoot}/`)||!compiledLibrary.startsWith(`${commonRoot}/`))commonRoot=dirname(commonRoot);
   const runtime=join(directory,'runtime'),runtimeBin=join(runtime,relative(commonRoot,compiledBin));
   const runtimeShare=join(runtime,relative(commonRoot,compiledShare)),runtimeLibrary=join(runtime,relative(commonRoot,compiledLibrary));
   for(const path of [runtimeBin,dirname(runtimeShare),dirname(runtimeLibrary)])mkdirSync(path,{recursive:true});
   for(const command of ['initdb','pg_ctl','postgres'])copyFileSync(join(installRoot,'bin',command),join(runtimeBin,command));
   symlinkSync(relocatedShare,runtimeShare);symlinkSync(relocatedLibrary,runtimeLibrary);
   initCommand=join(runtimeBin,'initdb');controlCommand=join(runtimeBin,'pg_ctl');
  }
 }
 const relocationArgs=relocatedShare&&existsSync(join(relocatedShare,'postgres.bki'))
  ?['-L',relocatedShare,...(relocatedLibrary&&existsSync(relocatedLibrary)?['-c',`dynamic_library_path=${relocatedLibrary}`]:[])]:[];
 try {run(initCommand,['-D',database,'--no-locale','-E','UTF8','-A','trust','-U','postgres','-c','timezone=GMT0','-c','log_timezone=GMT0',...relocationArgs]);}
 catch(error){if(error.code==='ENOENT'){t.skip('initdb/pg_ctl/psql are needed for isolated database integration tests');return;}throw error;}
 run(controlCommand,['-D',database,'-l',join(directory,'server.log'),'-o',`-h '' -k ${directory} -p 55491`,'-w','start']);
 started=true;
 const sql=input=>run('psql',['-h',directory,'-p','55491','-U','postgres','-d','postgres','-XAt','-v','ON_ERROR_STOP=1'],{input}).trim();
 const source=path=>readFileSync(new URL(path,import.meta.url),'utf8');
 sql(source('./fixtures/contact-analytics.sql'));
 sql('alter table homeground_private.traffic_events add constraint traffic_event_action_check check (true);');
 sql(source('../migrations/202609130001_homeground_contact_analytics.sql'));
 const oldDefinition=sql("select pg_get_functiondef('public.get_homeground_admin_traffic_v3()'::regprocedure);");
 const report=name=>{
  const payload=JSON.parse(sql(`set role service_role; select payload from public.${name}();`).replace(/^SET\n/,''));
  return parseContactReport(payload.contacts,payload.generatedAt);
 };
 const before=report('get_homeground_admin_traffic_v3');
 sql(source('../migrations/202609290001_homeground_kakao_contact_channel.sql'));
 assert.equal(sql("select pg_get_functiondef('public.get_homeground_admin_traffic_v3()'::regprocedure);"),oldDefinition,'migration leaves the existing RPC untouched');
 assert.deepEqual(report('get_homeground_admin_traffic_v3'),before,'rollout itself preserves every old contact count');
 sql(`insert into homeground_private.traffic_sessions values
  ('kakao-only','2026-09-12T10:00:00Z','homeground-traffic-events.v2','2026-09-05.1','/ko/',null);
 insert into homeground_private.traffic_events values
  ('kakao-repeat','repeat','2026-09-12T16:03:00Z','homeground-traffic-events.v2','contact_channel_clicked','kakao','/ko/',null,'contact_options'),
  ('kakao-only','kakao-only','2026-09-12T16:03:00Z','homeground-traffic-events.v2','contact_channel_clicked','kakao','/ko/',null,'contact_options');`);
 const legacy=report('get_homeground_admin_traffic_v3'),modern=report('get_homeground_admin_traffic_v4');
 for(const [index,period] of legacy.periods.entries()){
  assert.equal(period.channels.length,4);
  assert.deepEqual(period.channels,before.periods[index].channels,'Kakao does not contaminate legacy all totals, daily rows, or dimension top-20 rows');
  assert.equal(period.eligibleSessions,before.periods[index].eligibleSessions+1,'eligible anonymous traffic remains the denominator');
 }
 for(const [index,period] of modern.periods.entries()){
  const all=period.channels.find(c=>c.channel==='all'),kakao=period.channels.find(c=>c.channel==='kakao');
  assert.equal(period.channels.length,5);
  assert.deepEqual({clicks:kakao.clicks,sessions:kakao.sessions,unknown:kakao.unknownSourceClicks},{clicks:2,sessions:2,unknown:1});
  assert.equal(all.clicks,[6,7][index]);
  assert.equal(all.sessions,[3,4][index],'cross-channel repeat is deduplicated, Kakao-only session is included');
  assert.equal(all.unknownSourceClicks,[2,3][index]);
  assert.deepEqual(all.daily.find(row=>row.day==='2026-09-13'),{day:'2026-09-13',clicks:4,sessions:2});
  assert.deepEqual(all.dimensions.pages.rows.find(row=>row.key==='/ko/'),{key:'/ko/',clicks:2,sessions:2});
  assert.equal(period.eligibleSessions,legacy.periods[index].eligibleSessions);
 }
 for(const name of ['get_homeground_admin_traffic_v3','get_homeground_admin_traffic_v4']){
  assert.equal(sql(`select has_function_privilege('anon','public.${name}()','execute'),has_function_privilege('authenticated','public.${name}()','execute'),has_function_privilege('service_role','public.${name}()','execute');`),'f|f|t');
 }
});
