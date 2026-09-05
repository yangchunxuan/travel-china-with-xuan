"use client";

import { useEffect, useState } from "react";
import {
  isInternalTrafficExcluded,
  setInternalTrafficExcluded,
  subscribeInternalTrafficExcluded,
} from "../../lib/analyticsRuntime";
import styles from "./AdminInsightsPage.module.css";

export function InternalTrafficControl() {
  const [ready, setReady] = useState(false);
  const [excluded, setExcluded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setExcluded(isInternalTrafficExcluded());
    setReady(true);
    return subscribeInternalTrafficExcluded(setExcluded);
  }, []);

  return (
    <section className={styles.internalTrafficControl} aria-labelledby="internal-traffic-title">
      <div>
        <h2 id="internal-traffic-title">本机内部检查</h2>
        <p id="internal-traffic-description">
          开启后，此浏览器访问正式网站时会暂停发送访问统计，适合你和协助人员检查页面。
          每个浏览器需要分别设置，咨询功能仍可使用。
        </p>
      </div>
      <div>
        <label className={styles.internalTrafficToggle}>
          <input
            type="checkbox"
            checked={excluded}
            disabled={!ready}
            aria-describedby="internal-traffic-description"
            onChange={(event) => {
              const next = event.target.checked;
              setInternalTrafficExcluded(next);
              const actual = isInternalTrafficExcluded();
              setExcluded(actual);
              setError(actual === next ? null : "设置未能保存，请检查浏览器的存储权限。");
            }}
          />
          <span>{excluded ? "已开启：不计本机访问" : "开启内部检查"}</span>
        </label>
        {error ? <p role="alert">{error}</p> : null}
      </div>
    </section>
  );
}
